const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const asyncCatch = require('../utils/catchAsync');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Please Enter your name'],
    unique: [true, 'The email exists'],
    lowercase: true,
    validate: {
      validator: function (email) {
        console.log(this.name);
        console.log(validator.isEmail(email));
        return validator.isEmail(email);
      },
      message: 'Please provide a valid email id',
    },
  },
  mobile: {
    type: Number,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Please set a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirmation: {
    type: String,
    required: [true, 'Please confirm your password'],
    select: false,
    validate: {
      validator: function () {
        return this.password === this.passwordConfirmation;
      },
    },
  },
  budgetStart: {
    type: Number,
    // required: [true, 'Please enter your starting budget'],
  },
  budgetEnd: {
    type: Number,
    // required: [true, 'Please enter your ending budget'],
  },
  passwordCreatedAt: Date,
  passwordResetToken: String,
  passwordResetExpiresIn: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirmation = undefined;
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isNew) return next();
  this.passwordCreatedAt = new Date().getTime();
  next();
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') && this.isNew) return next();
  this.passwordCreatedAt = new Date().getTime() - 1000;
  next();
});

userSchema.pre(/^find/g, function (next) {
  this.find({ valid: { $ne: true } });
});

userSchema.methods.correctPassword = asyncCatch(
  async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
);

userSchema.methods.isPasswordChanged = (passwordTime, timestamp) => {
  console.log(Date.parse(passwordTime) / 1000);
  console.log(timestamp);
  return passwordTime < timestamp;
};

userSchema.methods.generateForgotPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  console.log(resetToken);

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpiresIn = new Date().getTime() + 10 * 60 * 1000;

  console.log({
    resetToken: resetToken,
    passwordResetToken: this.passwordResetToken,
  });

  return resetToken;
};

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
