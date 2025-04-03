import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from '../styles/AuthStyles';
import styled from 'styled-components';
import mailIcon from '../assets/mail.png'; // Mail ikonunu import ediyoruz
import tikIcon from '../assets/tik.png'; // Tik ikonunu import ediyoruz
import personIcon from '../assets/person.png'; // Person ikonunu import ediyoruz
import lockIcon from '../assets/lock.png'; // Lock ikonunu import ediyoruz
import { login, register } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

// Formda yan yana koyacağımız girdi alanları için stil ekleyelim
const FormRow = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`;

// Login form input'ları için özel stil
const LoginInput = styled(S.Input)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
`;

// Google butonları için özel stil
const LoginGoogleButton = styled(S.GoogleButton)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;
`;

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        institution: '',
        role: '',
        termsAccepted: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    // Add useEffect to scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 85);
    }, []);

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setRegisterData({
            ...registerData,
            [e.target.name]: value
        });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Login API isteği
            const response = await login(loginData);
            console.log('Login successful:', response);
            
            // AuthContext'i güncelleme
            authLogin(response.user);
            
            // Başarılı giriş sonrası yönlendirme
            navigate('/');
        } catch (err) {
            console.error('Login error:', err);
            if (err.message) {
                setError(err.message);
            } else if (typeof err === 'string') {
                setError(err);
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match.');
            setLoading(false);
            return;
        }

        // Backend'e gönderilecek verileri hazırla
        const userData = {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
            email: registerData.email,
            password: registerData.password,
            country: registerData.country,
            institution: registerData.institution,
            role: registerData.role
        };

        try {
            // Register API isteği
            const response = await register(userData);
            console.log('Registration successful:', response);
            
            // Başarılı kayıt sonrası email doğrulama sayfasına yönlendir
            navigate('/verify-email', { state: { email: registerData.email } });
        } catch (err) {
            console.error('Registration error:', err);
            if (err.validationErrors) {
                // Validasyon hataları varsa bunları göster
                const errorMessages = Object.values(err.validationErrors).join('\n');
                setError(errorMessages || 'Registration failed. Please check your information.');
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Registration failed. Please try again.');
            }
            setLoading(false);
        }
    };

    return (
        <div className="page login-page" style={{ 
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '40px 20px'
        }}>
            <S.TopLeftImage src={mailIcon} />
            <S.BottomRightImage src={tikIcon} />
            <S.BottomLeftImage src={personIcon} />
            <S.TopRightImage src={lockIcon} />
            <S.Container>
                <S.SignUpContainer isLogin={isLogin}>
                    <S.Form onSubmit={handleRegisterSubmit}>
                        <S.Title2>Sign Up</S.Title2>
                        
                        <FormRow>
                            <S.Input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={registerData.firstName}
                                onChange={handleRegisterChange}
                                required
                            />
                            
                            <S.Input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={registerData.lastName}
                                onChange={handleRegisterChange}
                                required
                            />
                        </FormRow>
                        
                        <S.Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={registerData.email}
                            onChange={handleRegisterChange}
                            required
                        />
                        
                        <FormRow>
                            <S.Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                            />
                            
                            <S.Input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                                required
                            />
                        </FormRow>
                        
                        <FormRow>
                            <S.Select 
                                name="country"
                                value={registerData.country}
                                onChange={handleRegisterChange}
                                required
                            >
                                <option value="" disabled selected style={{color: '#666', fontWeight: 'normal'}}>Country</option>
                                <option value="turkey">Turkey</option>
                                <option value="germany">Germany</option>
                                <option value="italy">Italy</option>
                                <option value="spain">Spain</option>
                                <option value="france">France</option>
                                <option value="uk">United Kingdom</option>
                            </S.Select>
                        </FormRow>
                        
                        <S.Input
                            type="text"
                            name="institution"
                            placeholder="Institution"
                            value={registerData.institution}
                            onChange={handleRegisterChange}
                        />
                        
                        <S.Select 
                            name="role"
                            value={registerData.role}
                            onChange={handleRegisterChange}
                            required
                        >
                            <option value="" disabled selected style={{color: '#666', fontWeight: 'normal'}}>Role</option>
                            <option value="STUDENT">Student</option>
                            <option value="TEACHER">Teacher</option>
                            <option value="RESEARCHER">Researcher</option>
                            <option value="OTHER">Other</option>
                        </S.Select>
                        
                        <S.CheckboxContainer>
                            <S.Checkbox
                                type="checkbox"
                                name="termsAccepted"
                                checked={registerData.termsAccepted}
                                onChange={handleRegisterChange}
                                required
                            />
                            <S.CheckboxLabel>
                                I have read and accepted the terms and conditions
                            </S.CheckboxLabel>
                        </S.CheckboxContainer>
                        
                        <S.Button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Sign Up'}
                        </S.Button>
                        
                        <S.Divider>or</S.Divider>
                        
                        <S.GoogleButton type="button">
                            <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google logo" width="20" />
                            Sign up with your Google Account
                        </S.GoogleButton>
                    </S.Form>
                </S.SignUpContainer>

                <S.SignInContainer isLogin={isLogin}>
                    <S.Form onSubmit={handleLoginSubmit}>
                        <S.Title2>Log In</S.Title2>
                        
                        <LoginInput
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                        />
                        
                        <LoginInput
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            required
                        />
                        
                        <S.LinkText as={Link} to="/forgot-password">
                            Forgot your password?
                        </S.LinkText>
                        
                        <S.Button type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Sign In'}
                        </S.Button>
                        
                        <S.Divider>or</S.Divider>
                        
                        <LoginGoogleButton type="button">
                            <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google logo" width="20" />
                            Sign in with your Google Account
                        </LoginGoogleButton>
                    </S.Form>
                </S.SignInContainer>
                
                <S.OverlayContainer isLogin={isLogin}>
                    <S.Overlay isLogin={isLogin}>
                        <S.LeftOverlayPanel isLogin={isLogin}>
                            <S.Title>Hello!</S.Title>
                            <S.Text>
                                Don't you have an account?<br />
                                Join us to use all of site features.
                            </S.Text>
                            <S.GhostButton onClick={() => setIsLogin(false)}>
                                Sign Up
                            </S.GhostButton>
                        </S.LeftOverlayPanel>

                        <S.RightOverlayPanel isLogin={isLogin}>
                            <S.Title>Welcome!</S.Title>
                            <S.Text>
                                You already have an account?<br />
                                Sign In!
                            </S.Text>
                            <S.GhostButton onClick={() => setIsLogin(true)}>
                                Sign In
                            </S.GhostButton>
                        </S.RightOverlayPanel>
                    </S.Overlay>
                </S.OverlayContainer>

                {error && <S.ErrorText>{error}</S.ErrorText>}
            </S.Container>
        </div>
    );
};

export default Login; 