import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useremailImg from '../assets/useremail.png';
import { forgotPassword } from '../services/authService';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 70vh;
  justify-content: space-between;
  padding: 2rem;
  margin: 2rem auto;
  max-width: 1200px;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
  }
`;


const IllustrationContainer = styled.div`
  flex: 1;
  display: flex;
  margin-left: -0.5rem;
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
  flex: 1;
  background-color: #e1e5ee;
  border-radius: 16px;
  padding: 4.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 1.7rem;
  margin-bottom: 0.5rem;
  color: #223A70;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-top: 0.3rem;
  color: #666;
`;

const EmailInputContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  position: relative;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 12px 15px 12px 22px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  background-color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`;

const EmailIcon = styled.span`
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      // Call the forgotPassword service
      const response = await forgotPassword(email);
      console.log('Reset password requested for:', email);
      console.log('Response:', response);
      
      // Show success message
      setSuccess('Verification code has been sent to your email.');
      
      // Short delay before navigating to code verification page
      setTimeout(() => {
        // Navigate to verification code page
        navigate('/reset-password', { 
          state: { 
            email: email,
            isPasswordReset: true
          } 
        });
      }, 2000);
    } catch (err) {
      console.error('Error requesting password reset:', err);
      
      // Improved error handling
      if (err) {
        if (typeof err === 'string') {
          setError(err);
        } else if (err.message) {
          setError(err.message);
        } else {
          setError('Unable to process your request. Please try again later.');
        }
      } else {
        setError('Unable to process your request. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <IllustrationContainer>
        <Illustration src={useremailImg} alt="Email verification illustration" />
      </IllustrationContainer>

      <FormContainer>
        <Title>Please Enter Your E-mail Address</Title>
        <Subtitle>We will send you an email with a verification code to reset your password.</Subtitle>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <EmailInputContainer>
            <EmailInput
              type="email"
              placeholder="e-mail address"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </EmailInputContainer>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Send Verification Code'}
          </SubmitButton>
        </form>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </FormContainer>
    </Container>
  );
};

export default ForgotPassword; 