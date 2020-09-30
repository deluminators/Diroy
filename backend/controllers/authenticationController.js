const jwt = require('jsonwebtoken');
const util = require('util');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios');

const User = require('../models/userModel');
const asyncCatch = require('../utils/catchAsync');
const AppError = require('../utils/appError');
// const sendMail = require("../utils/email");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

const app_token = async (access_token) => {
  let token = await axios.get(
    `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_ID}&client_secret=${process.env.FACEBOOK_SECRET}&grant_type=client_credentials`
  );
  token = token.data.access_token;
  const data = await axios.get(
    `https://graph.facebook.com/debug_token?input_token=${access_token}&access_token=${token}`
  );

  return data;
};

const verify = async (token) => {
  const CLIENT_ID = process.env.GOOGLE_CLIENT;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const userId = payload['sub'];

  const user = {
    email: payload.email,
    name: payload.name,
    userId,
    photo: payload.picture,
  };
  return user;
};

const googleLogin = async (idToken) => {
  const user = await verify(idToken);
  return user;
};

const facebookLogin = async (accessToken) => {
  const resp = await app_token(accessToken);
  const data = await axios.get(
    `https://graph.facebook.com/me?fields=name,email,id,picture.width(250)&access_token=${accessToken}`
  );
  const input = {
    name: data.data.name,
    email: data.data.email,
    userId: data.data.id,
    photo: data.data.picture.data.url,
  };
  return input;
};

const createUser = async (data) => {
  return await User.create({
    name: data.name,
    email: data.email,
    password: data.password,
    passwordConfirmation: data.passwordConfirmation,
    mobile: data.mobile * 1,
    budgetStart: data.budgetStart,
    budgetEnd: data.budgetEnd,
  });
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.updateUser = asyncCatch(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name;
  user.mobile = req.body.mobile;
  user.budgetStart = req.body.budgetStart;
  user.budgetEnd = req.body.budgetEnd;
  await user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    user: {
      id: user.id,
      name: user.name,
      mobile: user.mobile,
      email: user.email,
      budgetStart: user.budgetStart,
      budgetEnd: user.budgetEnd,
      photo: user.photo,
    },
  });
});

exports.signupUser = asyncCatch(async (req, res, next) => {
  const user = await createUser(req.body);
  const token = createToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    expiresIn: 86400 * 1000,
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      name: user.name,
      budgetStart: user.budgetStart,
      budgetEnd: user.budgetEnd,
    },
  });
});

exports.loginUser = asyncCatch(async (req, res, next) => {
  let user;
  if (req.body.method === 'facebook') {
    const tempUser = await facebookLogin(req.body.accessToken);
    user = await User.findOne({ email: tempUser.email });
    if (!user) {
      user = new User({
        facebookId: tempUser.userId,
        email: tempUser.email,
        name: tempUser.name,
        photo: tempUser.photo,
      });
      await user.save({ validateBeforeSave: false });
    }
  } else if (req.body.method === 'google') {
    const tempUser = await googleLogin(req.body.idToken);
    user = await User.findOne({ email: tempUser.email });
    if (!user) {
      user = new User({
        googleId: tempUser.userId,
        email: tempUser.email,
        name: tempUser.name,
        photo: tempUser.photo,
      });
      await user.save({ validateBeforeSave: false });
    } else if (!user.googleId) {
      user.googleId = tempUser.userId;
      user.photo = tempUser.photo;
      await user.save({ validateBeforeSave: false });
    }
    user = await User.findOne({ googleId: tempUser.userId });
  } else {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError('provide valid email or password', 400));
    }
    user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('incorrect email or password', 404));
    }
  }
  const token = createToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
    expiresIn: 86400 * 1000,
    user: {
      id: user._id,
      email: user.email,
      mobile: user.mobile,
      name: user.name,
      photo: user.photo,
      budgetStart: user.budgetStart,
      budgetEnd: user.budgetEnd,
    },
  });
});

exports.sendProtect = asyncCatch(async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError('user is not logged in!'));
  }

  const decoded = await util.promisify(jwt.verify)(
    req.headers.authorization.split(' ')[1],
    process.env.JWT_PRIVATE_KEY
  );
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(new AppError('User does not exist!'));
  }
  if (freshUser.isPasswordChanged(freshUser.passwordCreatedAt, decoded.iat)) {
    return next(new AppError('User has changed the password!'));
  }
  req.user = freshUser;
  next();
});
