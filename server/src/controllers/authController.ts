import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail'; // Import SendGrid
import crypto from 'crypto';

// --- SendGrid Setup ---
// Ensure the API key is not undefined before setting it.
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  console.error('SENDGRID_API_KEY is not defined in .env file');
}

const generateToken = (id: string) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) throw new Error('JWT_SECRET not defined');
    return jwt.sign({ id }, jwtSecret, { expiresIn: '30d' });
};

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists && userExists.password) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await User.updateOne({ email }, { $set: { email, otp, otpExpires } }, { upsert: true });

    const msg = {
      to: email,
      from: process.env.SENDER_EMAIL!, // Your verified sender email
      subject: 'Your OTP Code for Note-App',
      text: `Your One-Time Password (OTP) is ${otp}. It will expire in 10 minutes.`,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'OTP sent successfully' });

  } catch (error: any) {
    console.error('SENDGRID ERROR:', error.response?.body || error);
    res.status(500).json({ message: 'Error sending OTP' });
  }
};

// The registerUser and loginUser functions remain exactly the same as before
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, dateOfBirth, otp } = req.body;
    try {
        if (!name || !email || !password || !otp) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        const user = await User.findOne({ email, otp, otpExpires: { $gt: new Date() } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid OTP or OTP has expired' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.name = name;
        user.password = hashedPassword;
        user.dateOfBirth = dateOfBirth;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && user.password && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};