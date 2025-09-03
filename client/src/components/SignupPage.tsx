import React, { useState, useEffect, useRef } from 'react';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import styles from './SignupPage.module.css';
import animatedBgStyles from '../styles/AnimatedBackground.module.css'; // Import new background styles
import { registerUser, sendOtp } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const bgRef = useRef<HTMLDivElement>(null); // Ref for the animated background div

  // Effect to handle mouse movement for background interaction
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (bgRef.current) {
        const x = (event.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const y = (event.clientY / window.innerHeight - 0.5) * 20; // -10 to 10
        bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleGetOtp = async () => {
    if (!name || !email || !dateOfBirth) {
      return setError('Name, Email, and Date of Birth are required.');
    }
    setError('');
    try {
      await sendOtp(email);
      setOtpSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    }
  };

  const handleSignup = async () => {
    if (!otp || !password) {
      return setError('OTP and Password are required.');
    }
    setError('');
    try {
      const userData = { name, email, dateOfBirth, otp, password };
      const data = await registerUser(userData);
      login(data);
      navigate('/welcome');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your OTP.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpSent) {
      handleSignup();
    } else {
      handleGetOtp();
    }
  };

  return (
    <div className={styles.container}>
      {/* The animated background element */}
      <div ref={bgRef} className={animatedBgStyles.animatedBackground}></div>

      <div className={styles.signupBox}>
        <h2 className={styles.title}>Sign up</h2>
        <p style={{ marginTop: '-15px', marginBottom: '20px', color: '#888888' }}>
          Sign up to enjoy the feature of HD
        </p>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <CustomInput
            label="Your Name"
            type="text"
            placeholder="Jonas Kharwald"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={otpSent}
          />
          <CustomInput
            label="Date of Birth"
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
            disabled={otpSent}
          />
          <CustomInput
            label="Email"
            type="email"
            placeholder="jonas_kahnwald@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={otpSent}
          />
          {otpSent && (
            <>
              <CustomInput
                label="OTP"
                type="text"
                placeholder="Enter your OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <CustomInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
          <CustomButton onClick={() => {}} variant="primary">
            {otpSent ? 'Sign up' : 'Get OTP'}
          </CustomButton>
        </form>
        <p className={styles.loginLink}>
          Already have an account?? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;