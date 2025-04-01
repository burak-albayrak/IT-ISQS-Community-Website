import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as S from '../styles/AuthStyles';
import logo from '../logo.svg'; // Şimdilik React logosu kullanıyoruz
import styled from 'styled-components';

// Formda yan yana koyacağımız girdi alanları için stil ekleyelim
const FormRow = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`;

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });
    const [registerData, setRegisterData] = useState({
        name: '',
        surname: '',
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
            // API isteği burada yapılacak
            console.log('Login attempt with:', loginData);
            // Başarılı giriş sonrası yönlendirme işlemi
        } catch (err) {
            setError('Login failed. Please check your credentials.');
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

        try {
            // API isteği burada yapılacak
            console.log('Registration attempt with:', registerData);
            // Başarılı kayıt sonrası giriş sayfasına yönlendirme
            setIsLogin(true);
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page login-page">
            <S.Container>
                <S.SignUpContainer isLogin={isLogin}>
                    <S.Form onSubmit={handleRegisterSubmit}>
                        <S.Title2>Sign Up</S.Title2>
                        
                        <FormRow>
                            <S.Input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={registerData.name}
                                onChange={handleRegisterChange}
                                required
                            />
                            
                            <S.Input
                                type="text"
                                name="surname"
                                placeholder="Surname"
                                value={registerData.surname}
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
                                <option value="" disabled selected>Country</option>
                                <option value="turkey">Turkey</option>
                                <option value="germany">Germany</option>
                                <option value="italy">Italy</option>
                                <option value="spain">Spain</option>
                                <option value="france">France</option>
                                <option value="uk">United Kingdom</option>
                            </S.Select>
                            
                            <S.Select 
                                name="role"
                                value={registerData.role}
                                onChange={handleRegisterChange}
                                required
                            >
                                <option value="" disabled selected>Role</option>
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                                <option value="researcher">Researcher</option>
                                <option value="other">Other</option>
                            </S.Select>
                        </FormRow>
                        
                        <S.Input
                            type="text"
                            name="institution"
                            placeholder="Institution"
                            value={registerData.institution}
                            onChange={handleRegisterChange}
                        />
                        
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
                        
                        <S.Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={loginData.email}
                            onChange={handleLoginChange}
                            required
                        />
                        
                        <S.Input
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
                        
                        <S.GoogleButton type="button">
                            <img src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" alt="Google logo" width="20" />
                            Sign in with your Google Account
                        </S.GoogleButton>
                    </S.Form>
                </S.SignInContainer>
                
                <S.OverlayContainer isLogin={isLogin}>
                    <S.Overlay isLogin={isLogin}>
                        <S.LeftOverlayPanel isLogin={isLogin}>
                            <S.Title>Welcome!</S.Title>
                            <S.Text>
                                You already have an account?
                            </S.Text>
                            <S.GhostButton onClick={() => setIsLogin(true)}>
                                Sign In
                            </S.GhostButton>
                        </S.LeftOverlayPanel>

                        <S.RightOverlayPanel isLogin={isLogin}>
                            <S.Title>Hello!</S.Title>
                            <S.Text>
                                Don't you have an account?<br />
                                Join us to use all of site features.
                            </S.Text>
                            <S.GhostButton onClick={() => setIsLogin(false)}>
                                Sign Up
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