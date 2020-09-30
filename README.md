<img src="https://github.com/deluminators/Diroy/blob/master/pictures/Diroy.jpeg">

## A Feature aimed mobile and web-based application for smart tracking of people and vehicles using the conceptual framework of Swarm Intelligence.

<img align="right" src="https://github.com/deluminators/Diroy/blob/master/pictures/Swarm.gif" />
<br /> 

### Problem Statement: 
*Smart movement tracking solution of people/vehicles from point A to point B*

<br />
<br />
<br />

***Team***: *Deluminators*
<br />
***Institute:*** *International Institution of Information Technology, Bhubaneswar*
 <br /> <br /> <br />
 
 ### Our Approach
 <br />
 
 On brainstorming towards developing solutions for the smart tracking of people/vehicles, for tracking any kind of deviation, finding time-taken in traveling, tracking for overspeeding, we first looked at the points of application, where our idea could be applied and what problems are faced in those situations, so that we can train our application so as to cater tracking solutions along with addressing these issues. 

On researching over the problem statement, we find that apart from applying the project in the green corridors of Kaziranga National Park, we can also implement our idea in the cases when floods are creating devastating effects, where it is uncertain about where and when the vehicles carrying the relief materials or rescue people are approaching and, to also track people who are stuck in their homes or unsafe places in those floods or even any kind of calamity. Furthermore, we believe we can even apply our project in *creating a rapid notification based service for any kind of emergency situation such as women safety*, where our solution not only helps in becoming a *tracking tool* but also a *quick communication channel*.
 <br /> <br /> <br />
 
 ### Our Solution
<br />
<img align="left" src="https://github.com/deluminators/Diroy/blob/master/pictures/Swarm02.gif" />
On digging more into the problem statement, some points came into the highlights, first one being, the current tracking services are facing are firstly lack of proper and stable internet connection and secondly, lack of a proper communication channel so as to transmit and receive information and finally, unstable GPS and GPRS data sources from which location information can be fetched. 
<br /> 

In devising the solution for the above-said problems we considered applying the **conceptual framework of Swarm Intelligence** into our product thus making a solution which can track and communicate without the usage of GPS/GPRS/Internet technologies thus making a sustainable solution for varied usage and applications, so as to simplify the whole tracking process.
<br />

*For a note*, basically Swarm ***Intelligence conceptualizes the making of a decentralized system where information of individual nodes is localized to them, and with mutual understanding, they transmit the information or relations as and when required***.
<br /> <br /> <br />

### Stages of operation
<br />

#### 1. First level of operation
<br />

*Primarily to be used by the people having our application installed in their cellular devices.*
<br />

*A dashboard displaying the current status and location of the user, simultaneously running the Swarm Intelligence module in the background and calculating the relative position with respect to the other fixed and movable devices detected.*
<br />

*A button to calibrate the skeleton metrics onto the map of that particular area, using cellular data and GPS features, thereby providing a piece of detailed two-dimensional location information.*
<br />

*The dashboard also encapsulating tracking features to show live movement details en route a journey, along with displaying the live/ average speed, status, and coordinates of the availing user.*
<br />

*A Networking module providing some exclusive features like smart broadcast and smart location share i.e., the broadcast feature would transmit the location information of the availing user to all the connected devices within the network circumscribed by a particular range, while the smart location share is a feature built solely for the purpose of sharing the location data to specific known users of the concerned user, embedding the concept of hash keys for identification purposes.*
<br />

*The networking module implemented therefore would provide emergency aids to concerned users in the event of any mishap occurring.*
<br />

*All the data transmission methods hereby being availed are being done through the concept of p2p mesh network transmission, where every individual cellular device works simultaneously as a receiver and a transmitter, thus selecting automatically the best network protocol available for the successful transmission.*
<br />

*Lastly, we have a fleet management system provided onboard, wherein, every individual vehicle moving under a particular fleet of vehicles has access to the unique identifier keys of every other vehicle moving under that particular fleet.*
<br />

*Live tracking information of all the vehicles moving under a particular fleet, such as the speed details of every individual vehicle and likewise, would be visible to each member of that fleet, and in the event of any fleet disruption, the remaining vehicles under the fleet would automatically adjust themselves based on the current situation.*
<br />

#### 2. Second level of operation
<br />

*Primarily focused on the vehicles traveling through routes wherein proper monitoring is a dire necessity.*
<br />

*Users having/ not having our application, both, can be tracked and monitored.*
<br />

*The registration number of the vehicles entering this bounded route would be captured at the point where the monitored road starts, using tools such as OpenCV, etc.*
<br />

*As a second layer of monitoring, the IEMI number of the cellular device detected with the user, from the network source connected to, is collected and stored alongside the registration plate details of the vehicle captured.*
<br />

*The concerned path is to be divided into sections, with each section having a node manager to track that portion of the path is to be set up.*
<br />

 *Each node is associated with a particular length of the strip and as and when a vehicle enters and leaves a specific segment, the node of the segment turns active, constantly measuring the time the vehicle stays in, while crossing the segment, through emitted radiofrequency waves, and thereby provides an average speed measure of the vehicle from the distance and the time recorded, in that particular segment of the strip.*
 <br />
 
*A small and light and magnetic hardware device, encompassing accelerometric and gyroscopic sensors, is to be provided and can be availed in case the user does not have a cellular device along with him/her.* 
<br />

#### 3. Third level of operation
<br />

*This stage is for providing the most accurate tracking information and details of the vehicles traveling through the roads it is being used at.*
<br />

*The concerned strip to be laid out with smart reflectors, embodying cameras for detecting the approaching vehicles, also containing micro cellular modules for data transfer.*
<br />

*Each reflector to have its own range for tracking.*
<br />

*As a vehicle approaches, the camera present onboard the reflector starts analyzing the vehicle, and the speed thereby gets calculated by the rate at which the size of the captured vehicles increases.*
<br />

*At a certain instant, when the vehicle is not too close, neither too far off, the registration plate of the vehicle gets captured and stored and updates onto the system of our application.*
<br />

<br /> <br /> <br />



## Prerequisties

*For backend and web app*
* node and npm installed

*For android app* 
* node, npm and react native cli installed 

## Installation & Setup 

A step by step series of examples that tell you how to get a development env running

*To start the server*
Go to root of the project, change directory to backend


cd backend



npm install



npm start


Server will be running on localhost

*To start the web app*
Go to root of the project, run


cd webapp

Open index.html file

*To start the android app*
On your android device enable usb debugging connect usb to you PC.

Go to root of the project, run


cd mobileapp



npm install



react-native run-android

A metro server will run and then,
An android app will be running on your android device.

##  🏁 Technology Stack
<br />
<br />
As stated in the ideal solution, we will be making an integrated mobile application, for which we plan to use the React Native framework in the frontend, NodeJS, and ExpressJS framework in the backend, MongoDB and Mongoose in building the database system. For initial or normal usages, we can also fetch the required location data for which we plan to use the Here Maps API, but for making special usages, we plan to integrate the sensor information from Accelerometers, Odometers, Gyroscopes, and E-Compass, for gaining the necessary information about distance  moved and direction used for finding the relative location in the localized swarms. For building the communication channels, we plan to integrate the Bluetooth technology, Wi-fi, and Radio Frequency technology currently available in almost all smartphones and partially in vehicles for building the localized tower-based peer-to-peer decentralized channel-based communication channel. For building any required ML/DL models, frameworks like Scikit-Learn and Tensorflow are to be used, and if required cloud deployment can also opt for the smooth functioning of the application.
<br />
<br />
<br />

**Frontend**
* [HTML](https://www.w3schools.com/html/)
* [CSS](https://www.w3schools.com/css/)
* [JavaScript](https://www.javascript.com/learn/strings)

**Android**
* [ReactNative](https://reactnative.dev/)

**Backend**
* [Nodejs](https://nodejs.org/en/)
* [mongoDB](https://www.mongodb.com/)
* [express](https://expressjs.com/)

**Other**

* [Mapquest](https://www.mapquest.com/)
* [Here API](https://developer.here.com/)
* [Google-Map-API](https://developers.google.com/maps/documentation)
* [PWA](https://web.dev/progressive-web-apps/)
* [Helmet](https://helmetjs.github.io/)
