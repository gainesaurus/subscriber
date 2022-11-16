// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const messaging = getMessaging(firebase);


export const getMessageToken = async () => {
  if ('serviceWorker' in navigator) {
    let registration = await navigator.serviceWorker.register('./sw.js');
    //registration = await registration.pushManager.getSubscription();

    const token = await getToken(messaging, {
      serviceWorkerRegistration: registration,
      vapidKey: process.env.REACT_APP_FIREBASE_PUBLIC_VAPID_KEY,
    })
    if (token) {
      console.log('current token for client:', token);
    } else {
      console.log('No registration token available. Request permission to generate one.');
    }
    return token;
  }
};

//listen for messages when app is in foreground.
//In this file because it NEEDS access to the WINDOW OBJECT
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});

export default firebase;