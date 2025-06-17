import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import './LoginPage.css';

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    const { username, password } = data;
    if (username === 'test' && password === 'password') {
      localStorage.setItem('authToken', 'fake-token');
      navigate('/');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input {...register('username')} />
          <p className="error">{errors.username?.message}</p>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register('password')} />
          <p className="error">{errors.password?.message}</p>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;