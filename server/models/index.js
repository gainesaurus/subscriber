import * as dotenv from 'dotenv';
dotenv.config()

import mongoose, { connect } from 'mongoose';

const uri = process.env.MONGO_URI_CLOUD_ATLAS;

connect(uri)
console.log('mongoose is connected!');

export default mongoose;