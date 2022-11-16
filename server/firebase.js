//import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';

//process.env.GOOGLE_APPLICATION_CREDENTIALS;
//figure out how to use my env for this import!!!
//import serviceAccount from './subscriber-app-ab338-firebase-adminsdk-eb9pa-11dfb1470c.json' assert { type: "json" };
admin.initializeApp({
  credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTIALS),
  databaseURL: process.env.MONGO_URI_CLOUD_ATLAS

});

export const messaging = admin.messaging();

