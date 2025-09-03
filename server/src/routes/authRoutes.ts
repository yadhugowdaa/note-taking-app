import express from 'express';
// Import sendOtp and rename registerUser to avoid conflicts if needed
import { registerUser, loginUser, sendOtp } from '../controllers/authController';

const router = express.Router();

router.post('/send-otp', sendOtp); // New route for sending OTP
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;