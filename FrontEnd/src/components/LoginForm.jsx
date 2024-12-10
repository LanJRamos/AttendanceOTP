'use client'

import { useState } from "react";
import { TextInput, Label, Button, Alert, Modal } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../yupSchema';
import client from '../axiosURL';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [alertModal, setAlertModal] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const requestLogin = async (user) => {
    try {
      const response = await client.post('/user/login', user, { withCredentials: true });

      if (response.status === 200) {
        setUserEmail(user.email); // Store email for later OTP verification
        setShowOtpModal(true); // Open OTP modal
      } else {
        setAlertModal(true);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const sendOtp = async () => {
    try {
      await client.post('/user/send-otp', { email: userEmail });
      console.log('OTP sent successfully');
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await client.post('/user/verify-otp', { email: userEmail, otp }, { withCredentials: true });

      if (response.status === 200) {
        navigate('/dashboard'); // Navigate to dashboard on successful OTP verification
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  // Trigger send OTP when the OTP modal is shown
  const handleOtpModalOpen = () => {
    setShowOtpModal(true);
    sendOtp();
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {alertModal && 
          <Alert color="failure" className="h-min" onDismiss={() => setAlertModal(false)}>
            <span className="font-medium">Incorrect Email/Password.</span> Please try again.
          </Alert>
        }
        <form 
          className="flex container w-64 p-5 flex-wrap rounded-md flex-col gap-4 border-accent/20 border-b-2 bg-secondary/30"
          onSubmit={handleSubmit(requestLogin)}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email1" value="Your email" />
            </div>
            <TextInput
              id="email1"
              placeholder="name@domain.com"
              {...register('email')}
              color={errors.email ? 'failure' : ''}
              helperText={errors.email ? errors.email.message : ''}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="password1" value="Your password" />
            </div>
            <TextInput
              id="password1"
              type="password"
              {...register('password')}
              helperText={errors.password ? errors.password.message : ''}
            />
          </div>
          <Button type="submit" className="text-text border-b-2 border-accent/20 rounded-md bg-primary">Submit</Button>
        </form>
      </div>

      <Modal show={showOtpModal} onClose={() => setShowOtpModal(false)}>
        <Modal.Header>Enter OTP</Modal.Header>
        <Modal.Body>
          <TextInput 
            type="text" 
            placeholder="Enter OTP" 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
          />
          <Button onClick={verifyOtp}>Verify OTP</Button>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginForm;
