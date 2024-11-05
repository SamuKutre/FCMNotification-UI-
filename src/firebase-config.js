// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging";

// // Your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCeIY5HBbPF4aKCLeTBzJWBC7pQuTNFqm8",
//   authDomain: "xenon-timer-393911.firebaseapp.com",
//   projectId: "xenon-timer-393911",
//   storageBucket: "xenon-timer-393911.appspot.com",
//   messagingSenderId: "164993453767",
//   appId: "1:164993453767:web:574f2a5d1ca8b76eb378e2",
//   measurementId: "G-3J9M7KSE8J"
// };

// // Initialize Firebase app
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Messaging
// const messaging = getMessaging(app);

// export { messaging };

import { initializeApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCeIY5HBbPF4aKCLeTBzJWBC7pQuTNFqm8",
  authDomain: "xenon-timer-393911.firebaseapp.com",
  projectId: "xenon-timer-393911",
  storageBucket: "xenon-timer-393911.appspot.com",
  messagingSenderId: "164993453767",
  appId: "1:164993453767:web:574f2a5d1ca8b76eb378e2",
  measurementId: "G-3J9M7KSE8J"
};

const app = initializeApp(firebaseConfig);

let messaging;

isSupported().then((supported) => {
  if (supported) {
    messaging = getMessaging(app);
    console.log("Messaging is supported and initialized.");
  } else {
    console.warn("This browser does not support Firebase Messaging.");
  }
});
export { messaging };
