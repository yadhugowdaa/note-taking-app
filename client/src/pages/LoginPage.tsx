import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import styles from './SignupPage.module.css';
import animatedBgStyles from '../styles/AnimatedBackground.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser({ email, password });
      login(data);
      navigate('/welcome');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={animatedBgStyles.animatedBackground}></div>
      <div className={styles.signupBox}>
        <h1 className={styles.appName}>Note It</h1>
        <h2 className={styles.title}>Sign in</h2>
        {error && <p className={styles.errorText}>{error}</p>}
        <form onSubmit={handleLogin}>
          <CustomInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton onClick={() => {}} variant="primary">
            Sign In
          </CustomButton>
        </form>
        <p className={styles.loginLink}>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;