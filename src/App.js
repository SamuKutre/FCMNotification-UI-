import React, { Component } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebase-config";
import './NotificationUI.css';

class App extends Component {
  componentDidMount() {
    // No need to request permission on mount, handle it on button click
  }

  requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: 'BKwN7g80MEbC4Dq7h_uqe54316AFZKj6GOKZwI8jOxMPkdc9GpOslXrB0hae5GHcjJZksW9SaKVLUgEVG2G2v_c' // Your VAPID key here
        });
        console.log("FCM Token:", token);
        this.sendTokenToServer(token);
        this.listenForForegroundMessages(); // Listen for foreground messages
      } else {
        console.error("Notification permission not granted");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };

  listenForForegroundMessages = () => {
    onMessage(messaging, (payload) => {
      console.log('Message received in the foreground: ', payload);
      const { title, body } = payload.notification;
      new Notification(title, { body });
    });
  };

  sendTokenToServer = async (token) => {
    try {
      const response = await fetch("https://fcmnotificationbackend.onrender.com/api/send-notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          title: "Test Notification",
          body: "This is a test notification from the React app!",
        }),
      });
      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error sending token to server:", error);
    }
  };

  render() {
    return (
      <div className="notification-container">
        <div className="notification-card">
          <div className="bell-icon">
            <img src="https://img.icons8.com/ios-filled/50/000000/appointment-reminders--v2.png" alt="notification bell" />
            <span className="notification-count">1</span>
          </div>
          <h2>Notification</h2>
          <p>You have 1 new notification</p>
          <button 
            onClick={this.requestNotificationPermission} 
            className="notification-btn">
            Click to get Notification.
          </button>
        </div>
      </div>
    );
  }
}

export default App;
