import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import newpasswordImg from '../assets/newpassword.png';
import { resetPassword, verifyResetCode } from '../services/authService';

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
  margin-bottom: 1rem;
  color: #223A70;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 2rem;
  color: #666;
`;

const PasswordInputContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 1rem;
  position: relative;
  margin-left: auto;
  margin-right: auto;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px 15px;
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

// Kod doğrulama için bileşenler
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

const PasswordRequirements = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  text-align: left;
  padding-left: 1rem;
`;

const RequirementItem = styled.li`
  margin-bottom: 0.3rem;
  color: ${props => props.fulfilled ? '#27ae60' : '#666'};
`;

const ResetPassword = () => {
  const [step, setStep] = useState(1); // 1: Kod doğrulama, 2: Şifre sıfırlama
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState('');
  const [verifiedCode, setVerifiedCode] = useState('');
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Password requirements check
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasMinLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword && password !== '';

  useEffect(() => {
    // Email bilgisini kontrol et
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // Email bilgisi yoksa forgot-password sayfasına yönlendir
      navigate('/forgot-password');
      return;
    }
    
    // İlk input'a odaklan
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [location, navigate]);

  // Kod girildiğinde bir sonraki input'a geçiş
  const handleCodeChange = (index, value) => {
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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Kod doğrulama işlemi
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!isCodeComplete() || isLoading) return;

    setIsLoading(true);
    setError('');

    try {
      const code = verificationCode.join('');
      console.log('Verifying reset code:', code);
      
      // API isteği
      const response = await verifyResetCode(code);
      console.log('Code verification successful:', response);
      
      // Doğrulanmış kodu sakla ve şifre sıfırlama adımına geç
      setVerifiedCode(code);
      setSuccess('Verification successful! You can now reset your password.');
      setTimeout(() => {
        setSuccess('');
        setStep(2);
      }, 1500);
    } catch (err) {
      console.error('Code verification error:', err);
      if (err.message) {
        setError(err.message);
      } else if (typeof err === 'string') {
        setError(err);
      } else {
        setError('Invalid verification code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Şifre sıfırlama işlemi
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    // Validate passwords
    if (!passwordsMatch) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasDigit) {
      setError('Password does not meet the requirements');
      setIsLoading(false);
      return;
    }

    try {
      // Call resetPassword service with the verified code
      const response = await resetPassword(verifiedCode, password);
      console.log('Password reset successful:', response);
      
      setSuccess('Password has been reset successfully');
      
      // Redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login', { state: { passwordReset: true } });
      }, 2000);
    } catch (err) {
      console.error('Error resetting password:', err);
      
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <IllustrationContainer>
        <Illustration src={newpasswordImg} alt="Create new password illustration" />
      </IllustrationContainer>

      <FormContainer>
        {step === 1 ? (
          <>
            <Title>Verify Your Code</Title>
            <Subtitle>Enter the verification code sent to {email}</Subtitle>

            <form onSubmit={handleVerifyCode} style={{ width: '100%' }}>
              <CodeInputContainer>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <CodeInput
                    key={index}
                    type="text"
                    maxLength="1"
                    value={verificationCode[index]}
                    onChange={(e) => handleCodeChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    required
                  />
                ))}
              </CodeInputContainer>

              <SubmitButton type="submit" disabled={isLoading || !isCodeComplete()}>
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </SubmitButton>
            </form>
          </>
        ) : (
          <>
            <Title>Create a new password</Title>
            <Subtitle>Enter your new password</Subtitle>

            <form onSubmit={handleResetPassword} style={{ width: '100%' }}>
              <PasswordInputContainer>
                <PasswordInput
                  type="password"
                  placeholder="New password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </PasswordInputContainer>

              <PasswordInputContainer>
                <PasswordInput
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </PasswordInputContainer>

              <SubmitButton 
                type="submit" 
                disabled={isLoading || !hasMinLength || !hasUpperCase || !hasLowerCase || !hasDigit || !passwordsMatch}
              >
                {isLoading ? 'Processing...' : 'Reset Password'}
              </SubmitButton>
            </form>
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
      </FormContainer>
    </Container>
  );
};

export default ResetPassword; 