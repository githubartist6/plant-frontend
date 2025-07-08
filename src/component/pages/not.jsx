// src/components/BrowserPushNotification.jsx
import React from "react";

const logo = "https://media.istockphoto.com/id/1045368942/vector/abstract-green-leaf-logo-icon-vector-design-ecology-icon-set-eco-icon.jpg?s=612x612&w=0&k=20&c=XIfHMI8r1G73blCpCBFmLIxCtOLx8qX0O3mZC9csRLs=";

const BrowserPushNotification = () => {
  const showNotification = () => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notifications.");
    } else if (Notification.permission === "granted") {
      new Notification("Vriksh Mantra", {
        body: "Login successfully",
        icon: logo,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Vriksh Mantra", {
            body: "Login successfully",
            icon: logo,
          });
        } else {
          alert("You blocked notification permission.");
        }
      });
    } else {
      alert("You have blocked notifications.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "300px" }}>
      <button
        onClick={showNotification}
        style={{
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Click to Notify (Native)
      </button>
    </div>
  );
};

export default BrowserPushNotification;
 