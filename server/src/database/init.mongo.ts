import mongoose, { ConnectOptions } from 'mongoose';

export const connect = async () => {
    if (process.env.NODE_ENV === 'Development') {
        mongoose.set('debug', true);
        mongoose.set('debug', { color: true });
    }

    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            useNewUrlParser: true,
        } as ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log('Error connecting to MongoDB');
        console.log(err);
    }
};
