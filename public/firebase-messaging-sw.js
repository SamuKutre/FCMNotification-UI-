// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
// importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);


// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyCeIY5HBbPF4aKCLeTBzJWBC7pQuTNFqm8",
  authDomain: "xenon-timer-393911.firebaseapp.com",
  projectId: "xenon-timer-393911",
  storageBucket: "xenon-timer-393911.appspot.com",
  messagingSenderId: "164993453767",
  appId: "1:164993453767:web:574f2a5d1ca8b76eb378e2",
  measurementId: "G-3J9M7KSE8J"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message: ', payload);
  // const notificationTitle = payload.notification.title;
  // const notificationOptions = {
  //   body: payload.notification.body,
  //   icon: '/firebase-logo.png'
  // };
  // Make sure the payload contains the expected notification object
  const notificationTitle = payload.notification ? payload.notification.title : 'Default Title';
  const notificationOptions = {
    body: payload.notification ? payload.notification.body : 'No body content',
    icon: '/firebase-logo.png', // Adjust the icon path if necessary
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
