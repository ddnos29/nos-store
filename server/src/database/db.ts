import mongoose, { ConnectOptions } from 'mongoose';

export const connect = async () => {
	try {
		await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`, {
			useNewUrlParser: true,
		} as ConnectOptions);
		console.log('Connected to MongoDB');
	} catch (err) {
		console.log('Error connecting to MongoDB');
		console.log(err);
	}
};
