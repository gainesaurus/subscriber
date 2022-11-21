import * as dotenv from 'dotenv';
dotenv.config()

import mongoose, { connect } from 'mongoose';

// eslint-disable-next-line no-undef
const uri = process.env.MONGO_URI;

connect(uri)

export default mongoose;