import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import mailman from '../assets/mailman.png';
import { verifyEmail, resendVerificationCode, verifyResetCode } from '../services/authService';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
  justify-content: center;npm 
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const Illustration = styled.img`
  max-width: 100%;
  height: auto;
`;

const VerificationContainer = styled.div`
  flex: 1;
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
  margin-bottom: 0.5rem;
  color: #223A70;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
`;

const CodeInputContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  width: 100%;
`;

const CodeInput = styled.input`
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #223A70;
    box-shadow: 0 0 0 2px rgba(34, 58, 112, 0.2);
  }
`;

const VerifyButton = styled.button`
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

const ResendText = styled.p`
  margin-top: 2.5rem;
  font-size: 0.95rem;
  color: #555;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
`;

const ResendLink = styled.button`
  background-color: rgba(34, 58, 112, 0.1);
  border: none;
  color: #223A70;
  font-weight: 600;
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: rgba(34, 58, 112, 0.2);
    color: #192C54;
    transform: translateY(-2px);
    box-shadow: 0 3px 8px rgba(34, 58, 112, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #999;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// SVG ikon için stil
const RefreshIcon = styled.svg`
  width: 16px;
  height: 16px;
  fill: currentColor;
  transition: transform 0.5s ease-in-out;

  ${ResendLink}:hover & {
    transform: rotate(180deg);
  }
`;

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [isForgotPasswordFlow, setIsForgotPasswordFlow] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Eğer bir state ile email bilgisi geldiyse kullanabiliriz
    if (location.state && location.state.email) {
      setEmail(location.state.email);
      
      // Check if we're coming from forgot password flow
      if (location.state.fromForgotPassword) {
        setIsForgotPasswordFlow(true);
      }
    } else {
      // Email olmadan doğrudan bu sayfaya gelinirse login'e yönlendir
      navigate('/login');
    }
    // İlk input'a odaklanma
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [location, navigate]);

  // Kod girildiğinde bir sonraki input'a geçiş
  const handleChange = (index, value) => {
    if (value.length > 1) {
      value = value[0]; // Sadece tek karakter
    }

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Sonraki input'a geçiş
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Silme tuşu kontrolü ve önceki input'a geçiş
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && verificationCode[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Tüm kodun girilip girilmediğini kontrol et
  const isCodeComplete = () => {
    return verificationCode.every(digit => digit !== '');
  };

  // Kod doğrulama işlemi
  const handleVerify = async () => {
    if (!isCodeComplete() || isLoading || isResending) return;

    setIsLoading(true);
    setError('');

    try {
      // Backend entegrasyonu
      const code = verificationCode.join('');
      console.log('Verifying code:', code);
      
      let response;
      
      // Check if this is for password reset or normal email verification
      if (isForgotPasswordFlow) {
        // For password reset, use verifyResetCode
        response = await verifyResetCode(code);
        console.log('Reset code verification successful:', response);
        
        // Başarılı doğrulama sonrası
        setIsLoading(false);
        
        // Navigate to reset password page
        navigate('/reset-password', { 
          state: { 
            token: response.token || code, // Use token from response or fallback to code
            email: email
          } 
        });
      } else {
        // For normal email verification, use verifyEmail
        response = await verifyEmail(code);
        console.log('Verification successful:', response);
        
        // Başarılı doğrulama sonrası
        setIsLoading(false);
        
        // Navigate to login page
        navigate('/login', { state: { verificationSuccess: true } });
      }
    } catch (err) {
      console.error('Verification error:', err);
      
      // Improved error handling
      if (err) {
        if (err.message) {
          setError(err.message);
        } else if (typeof err === 'string') {
          setError(err);
        } else {
          setError('Invalid verification code. Please try again.');
        }
      } else {
        setError('Invalid verification code. Please try again.');
      }
      
      setIsLoading(false);
    }
  };

  // Kodu yeniden gönderme
  const handleResendCode = async () => {
    if (!email || isResending || isLoading) return;

    setIsResending(true);
    setError('');
    
    try {
      // API isteği
      const response = await resendVerificationCode(email);
      console.log('Resend code successful:', response);
      
      setIsResending(false);
      // Kullanıcıya bildirim göster
      alert('A new verification code has been sent to your email.');
    } catch (err) {
      console.error('Resend code error:', err);
      if (err.message) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Failed to resend verification code. Please try again.');
      }
      setIsResending(false);
    }
  };

  return (
    <Container>
      <IllustrationContainer>
        <Illustration src={mailman} alt="Email verification" />
      </IllustrationContainer>
      
      <VerificationContainer>
        <Title>We Send You an E-mail.</Title>
        <Subtitle>Please check your e-mail.</Subtitle>
        
        <CodeInputContainer>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <CodeInput
              key={index}
              type="text"
              maxLength="1"
              value={verificationCode[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </CodeInputContainer>
        
        <VerifyButton 
          onClick={handleVerify} 
          disabled={!isCodeComplete() || isLoading || isResending}
        >
          {isLoading ? 'Verifying...' : 'Done'}
        </VerifyButton>
        
        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
        
        <ResendText>
          Didn't receive a code?
          <ResendLink onClick={handleResendCode} disabled={isResending || isLoading}>
            <RefreshIcon viewBox="0 0 24 24">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 9h7V2l-2.35 4.35z"/>
            </RefreshIcon>
            {isResending ? 'Sending...' : 'Resend code'}
          </ResendLink>
        </ResendText>
      </VerificationContainer>
    </Container>
  );
};

export default EmailVerification; 