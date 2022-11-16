importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js');

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// handles notifications that reach the app when its not in the foreground
// In this file because it does not have access to the WINDOW OBJECT
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '../icon1058x1058.png',
  };
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

// self.addEventListener('notificationclick', event => {
//   console.log(event)
//   return event;
// });

//TRYING TO GET SCHEDULED PUSH TO WORK//
// self.addEventListener('push', (event) => {
//   const payload = event.data?.text() ?? 'no payload';
//   const notificationTitle = payload.title;
//   const notificationOptions = {
//     body: payload.body,
//     icon: '../icon1058x1058.png',
//   };
//   console.log('got message from listener in SW!!!', payload);
//   event.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
// });


/////REST OF SW NOT A PART OF FIREBASE/////
workbox.core.setCacheNameDetails({
  prefix: 'subscriber-cache',
})

  // Caching Images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'subscriber-images-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// Cache CSS and JavaScript Files
workbox.routing.registerRoute(
  /\.(?:js|css)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'subscriber-static-resources-cache',
  })
);

// Caching Content from Multiple Origins
workbox.routing.registerRoute(
  /.*(?:googleapis|gstatic)\.com/,
  new workbox.strategies.StaleWhileRevalidate(),
);

// if any pre-cache rules are defined in workbox config this is where they are injected.
//workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);