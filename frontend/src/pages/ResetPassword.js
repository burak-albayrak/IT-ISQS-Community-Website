import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import newpasswordImg from '../assets/newpassword.png';
import { resetPassword } from '../services/authService';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 1000px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const IllustrationContainer = styled.div`
  flex: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Illustration = styled.img`
  max-width: 100%;
  height: auto;
`;

const FormContainer = styled.div`
  flex: 1.15;
  background-color: #e1e5ee;
  border-radius: 16px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #223A70;
  font-weight: bold;
`;

const PasswordInputContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
  margin-left: 3.5rem;
  position: relative;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px 15px 12px 40px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  background-color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }

  &::placeholder {
    color: #999;
  }
`;

const PasswordIcon = styled.span`
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: white;
  color: #333;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1.5rem;

  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const SuccessMessage = styled.p`
  color: #27ae60;
  margin-top: 1rem;
  font-size: 0.9rem;
`;

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have a valid token from the verification process
    if (location.state && location.state.token) {
      setToken(location.state.token);
    } else {
      // No token found, redirect to forgot password
      navigate('/forgot-password');
    }
  }, [location, navigate]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      // Call resetPassword service
      const response = await resetPassword(token, password);
      console.log('Password reset successful:', response);
      
      setSuccess('Password has been reset successfully');
      setIsLoading(false);
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login', { state: { passwordReset: true } });
      }, 2000);
    } catch (err) {
      console.error('Error resetting password:', err);
      
      // Improved error handling
      if (err) {
        if (typeof err === 'string') {
          setError(err);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Unable to reset your password. Please try again later.');
        }
      } else {
        setError('Unable to reset your password. Please try again later.');
      }
      
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <IllustrationContainer>
        <Illustration src={newpasswordImg} alt="Create new password illustration" />
      </IllustrationContainer>

      <FormContainer>
        <Title>Create a new password</Title>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <PasswordInputContainer>
            <PasswordInput
              type="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </PasswordInputContainer>

          <PasswordInputContainer>
            <PasswordInput
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </PasswordInputContainer>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Done'}
          </SubmitButton>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </FormContainer>
    </Container>
  );
};

export default ResetPassword; 