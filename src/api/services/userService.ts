import bcrypt from 'bcrypt';
import User from '../models/userModel';
import { connectToDB } from '../database/db';

export const createUser = async (userData: any) => {

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    const user = new User({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
    });

    return await user.save();
};

export const getAllUsers = async () => {
    await connectToDB();
    return await User.find();
};

export const getUserById = async (id: string) => {
    return await User.findById(id);
};

export const updateUser = async (id: string, updateData: any) => {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteUser = async (id: string) => {
    return await User.findByIdAndDelete(id);
};
