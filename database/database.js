import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27037/admin');

mongoose.Promise = global.Promise;

export default mongoose;