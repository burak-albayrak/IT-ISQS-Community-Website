import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import * as S from '../styles/AuthStyles';
import logo from '../logo.svg'; // Şimdilik React logosu kullanıyoruz
import styled from 'styled-components';
import mailIcon from '../assets/mail.png'; // Mail ikonunu import ediyoruz
import tikIcon from '../assets/tik.png'; // Tik ikonunu import ediyoruz
import personIcon from '../assets/person.png'; // Person ikonunu import ediyoruz
import lockIcon from '../assets/lock.png'; // Lock ikonunu import ediyoruz
import { login, register, getUserByEmail } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

// Formda yan yana koyacağımız girdi alanları için stil ekleyelim
const FormRow = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;

// Login form input'ları için özel stil
const LoginInput = styled(S.Input)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin: 0;
        font-size: 15px;
        padding: 12px 15px;
    }
`;

// Google butonları için özel stil
const LoginGoogleButton = styled(S.GoogleButton)`
    width: 80%;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 768px) {
        width: 100%;
        margin: 0;
        font-size: 14px;
        padding: 10px;
    }
`;

const MobileContainer = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: block;
        width: 100%;
        min-height: 100vh;
        padding: 20px;
        background-color: #fff;
    }
`;

const MobileForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const MobileTitle = styled.h2`
    font-size: 24px;
    color: #223A70;
    text-align: center;
    margin-bottom: 20px;
    font-weight: bold;
`;

const MobileInput = styled.input`
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    
    &:focus {
        outline: none;
        border-color: #223A70;
    }
`;

const MobileSelect = styled.select`
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 15px;
    background-color: white;
    
    &:focus {
        outline: none;
        border-color: #223A70;
    }
`;

const MobileButton = styled.button`
    width: 100%;
    padding: 14px;
    background-color: #223A70;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
    
    &:disabled {
        background-color: #cccccc;
    }
`;

const MobileToggleButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: transparent;
    color: #223A70;
    border: 1px solid #223A70;
    border-radius: 8px;
    font-size: 15px;
    margin-top: 10px;
`;

const MobileError = styled.div`
    color: #e74c3c;
    font-size: 14px;
    margin-top: 5px;
`;

const MobileForgotPassword = styled(Link)`
    color: #223A70;
    text-align: center;
    font-size: 14px;
    text-decoration: none;
    margin-top: 10px;
    
    &:hover {
        text-decoration: underline;
    }
`;

const DesktopContainer = styled(S.Container)`
    @media (max-width: 768px) {
        display: none;
    }
`;

const MobileImageContainer = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const DesktopImages = styled.div`
    @media (max-width: 768px) {
        display: none;
    }
`;

const Login = () => {
    const location = useLocation();
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
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    // Add countries array before the component logic
    const countries = [
        "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
        "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
        "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
        "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
        "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", 
        "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "England", "Equatorial Guinea", "Eritrea", "Estonia", 
        "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", 
        "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", 
        "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", 
        "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
        "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", 
        "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
        "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
        "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", 
        "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", 
        "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", 
        "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", 
        "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", 
        "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
        "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
        "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ];
    
    // URL'de signup parametresini kontrol et
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const signupParam = queryParams.get('signup');
        
        if (signupParam === 'true') {
            setIsLogin(false); // Kayıt formunu göster
        } else {
            setIsLogin(true); // Giriş formunu göster
        }
    }, [location.search]);

    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
        
        // Clear field-specific error when user starts typing
        if (fieldErrors[e.target.name]) {
            setFieldErrors({
                ...fieldErrors,
                [e.target.name]: ''
            });
        }
    };

    const handleRegisterChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setRegisterData({
            ...registerData,
            [e.target.name]: value
        });
        
        // Clear field-specific error when user starts typing
        if (fieldErrors[e.target.name]) {
            setFieldErrors({
                ...fieldErrors,
                [e.target.name]: ''
            });
        }
    };

    const validateLoginForm = () => {
        const errors = {};
        let isValid = true;

        // Email validation
        if (!loginData.email) {
            errors.loginEmail = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            errors.loginEmail = 'Email address is invalid';
            isValid = false;
        }

        // Password validation
        if (!loginData.password) {
            errors.loginPassword = 'Password is required';
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setFieldErrors({});

        // Validate form
        if (!validateLoginForm()) {
            setLoading(false);
            return;
        }

        try {
            // Login API isteği
            const response = await login(loginData);
            console.log('Login successful:', response);
            
            if (response.user) {
                // Kullanıcı bilgilerini AuthContext'e aktar
                authLogin(response.user);
                
                // Başarılı giriş sonrası yönlendirme
                navigate('/');
            } else {
                throw new Error('Login response did not contain user data');
            }
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

    const validateForm = () => {
        const errors = {};
        let isValid = true;

        // First Name validation
        if (!registerData.firstName.trim()) {
            errors.firstName = 'First name is required';
            isValid = false;
        } else if (registerData.firstName.length < 2) {
            errors.firstName = 'First name must be at least 2 characters';
            isValid = false;
        }

        // Last Name validation
        if (!registerData.lastName.trim()) {
            errors.lastName = 'Last name is required';
            isValid = false;
        } else if (registerData.lastName.length < 2) {
            errors.lastName = 'Last name must be at least 2 characters';
            isValid = false;
        }

        // Email validation
        if (!registerData.email) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            errors.email = 'Email address is invalid';
            isValid = false;
        }

        // Password validation
        if (!registerData.password) {
            errors.password = 'Password is required';
            isValid = false;
        } else if (registerData.password.length < 8) {
            errors.password = 'Password must be at least 8 characters';
            isValid = false;
        } else if (!/(?=.*[0-9])/.test(registerData.password)) {
            errors.password = 'Password must contain at least one number';
            isValid = false;
        } else if (!/(?=.*[A-Z])/.test(registerData.password)) {
            errors.password = 'Password must contain at least one uppercase letter';
            isValid = false;
        }

        // Confirm Password validation
        if (!registerData.confirmPassword) {
            errors.confirmPassword = 'Please confirm your password';
            isValid = false;
        } else if (registerData.password !== registerData.confirmPassword) {
            errors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        // Country validation
        if (!registerData.country) {
            errors.country = 'Please select your country';
            isValid = false;
        }

        // Role validation
        if (!registerData.role) {
            errors.role = 'Please select your role';
            isValid = false;
        }

        setFieldErrors(errors);
        return isValid;
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted, current data:', registerData);
        setLoading(true);
        setError('');
        setFieldErrors({});
        
        // Validate form
        if (!validateForm()) {
            console.log('Form validation failed, errors:', fieldErrors);
            setLoading(false);
            return;
        }
        
        try {
            // Get the properly capitalized country name from the countries array
            const properCountryName = countries.find(country => 
                country.toLowerCase() === registerData.country.toLowerCase()
            ) || registerData.country;
            
            // Backend'e gönderilecek verileri hazırla
            const userData = {
                firstName: registerData.firstName,
                lastName: registerData.lastName,
                email: registerData.email,
                password: registerData.password,
                country: properCountryName,
                institution: registerData.institution || '',
                role: registerData.role,
                isActive: false,
                isBlocked: false
            };
            
            console.log('Sending registration data to backend:', userData);
            
            // Register API isteği
            const response = await register(userData);
            console.log('Registration successful:', response);
            
            // Başarılı kayıt sonrası email doğrulama sayfasına yönlendir
            navigate('/verify-email', { state: { email: registerData.email } });
        } catch (err) {
            console.error('Registration error:', err);
            if (err.response && err.response.data) {
                // API'den gelen hata mesajını göster
                setError(err.response.data.message || 'Registration failed. Please try again.');
                if (err.response.data.validationErrors) {
                    setFieldErrors(err.response.data.validationErrors);
                }
            } else {
                setError('An error occurred during registration. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Helper function to determine if an input field has an error
    const hasError = (fieldName) => Boolean(fieldErrors[fieldName]);

    return (
        <div className="page login-page" style={{ position: 'relative' }}>
            {/* Desktop Images */}
            <DesktopImages>
            <S.TopLeftImage src={mailIcon} />
            <S.BottomRightImage src={tikIcon} />
            <S.BottomLeftImage src={personIcon} />
            <S.TopRightImage src={lockIcon} />
            </DesktopImages>

            {/* Mobile Version */}
            <MobileContainer>
                <MobileTitle>{isLogin ? 'Sign In' : 'Create Account'}</MobileTitle>
                
                {isLogin ? (
                    <MobileForm onSubmit={handleLoginSubmit}>
                        <div>
                            <MobileInput
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                                style={hasError('loginEmail') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.loginEmail && <MobileError>{fieldErrors.loginEmail}</MobileError>}
                        </div>

                        <div>
                            <MobileInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                                style={hasError('loginPassword') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.loginPassword && <MobileError>{fieldErrors.loginPassword}</MobileError>}
                        </div>

                        <MobileForgotPassword to="/forgot-password">
                            Forgot your password?
                        </MobileForgotPassword>

                        <MobileButton type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Sign In'}
                        </MobileButton>

                        <MobileToggleButton type="button" onClick={() => navigate('/login?signup=true')}>
                            Don't have an account? Sign Up
                        </MobileToggleButton>
                    </MobileForm>
                ) : (
                    <MobileForm onSubmit={handleRegisterSubmit}>
                        <div>
                            <MobileInput
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={registerData.firstName}
                                onChange={handleRegisterChange}
                                required
                                style={hasError('firstName') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.firstName && <MobileError>{fieldErrors.firstName}</MobileError>}
                        </div>

                        <div>
                            <MobileInput
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={registerData.lastName}
                                onChange={handleRegisterChange}
                                required
                                style={hasError('lastName') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.lastName && <MobileError>{fieldErrors.lastName}</MobileError>}
                        </div>

                        <div>
                            <MobileInput
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                                style={hasError('email') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.email && <MobileError>{fieldErrors.email}</MobileError>}
                        </div>

                        <div>
                            <MobileInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                                required
                                style={hasError('password') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.password && <MobileError>{fieldErrors.password}</MobileError>}
                        </div>

                        <div>
                            <MobileInput
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                                required
                                style={hasError('confirmPassword') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.confirmPassword && <MobileError>{fieldErrors.confirmPassword}</MobileError>}
                        </div>

                        <div>
                            <MobileSelect
                                name="country"
                                value={registerData.country}
                                onChange={handleRegisterChange}
                                required
                                style={hasError('country') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            >
                                <option value="">Select Country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.toLowerCase()}>
                                        {country}
                                    </option>
                                ))}
                            </MobileSelect>
                            {fieldErrors.country && <MobileError>{fieldErrors.country}</MobileError>}
                        </div>

                        <div>
                            <MobileInput
                                type="text"
                                name="institution"
                                placeholder="Institution"
                                value={registerData.institution}
                                onChange={handleRegisterChange}
                                style={hasError('institution') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.institution && <MobileError>{fieldErrors.institution}</MobileError>}
                        </div>

                        <div>
                            <MobileSelect
                                name="role"
                                value={registerData.role}
                                onChange={handleRegisterChange}
                                required
                                style={hasError('role') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            >
                                <option value="">Select Role</option>
                                <option value="STUDENT">Student</option>
                                <option value="ACADEMIC">Academic</option>
                                <option value="INDUSTRY_PROFESSIONAL">Industry Professional</option>
                                <option value="OTHER">Other</option>
                            </MobileSelect>
                            {fieldErrors.role && <MobileError>{fieldErrors.role}</MobileError>}
                        </div>

                        <MobileButton type="submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Sign Up'}
                        </MobileButton>

                        <MobileToggleButton type="button" onClick={() => navigate('/login')}>
                            Already have an account? Sign In
                        </MobileToggleButton>
                    </MobileForm>
                )}

                {error && <MobileError style={{ textAlign: 'center', marginTop: '20px' }}>{error}</MobileError>}
            </MobileContainer>

            {/* Desktop Version */}
            <DesktopContainer>
                <S.SignUpContainer $isLogin={isLogin}>
                    <S.Form onSubmit={handleRegisterSubmit} style={{ position: 'relative' }}>
                        <S.Title2>Sign Up</S.Title2>
                        
                        <FormRow>
                            <div style={{ width: '100%' }}>
                                <S.Input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={registerData.firstName}
                                    onChange={handleRegisterChange}
                                    required
                                    style={{
                                        ...hasError('firstName') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                        '@media (max-width: 768px)': {
                                            fontSize: '15px',
                                            padding: '12px 15px'
                                        }
                                    }}
                                />
                                {fieldErrors.firstName && <S.InputError>{fieldErrors.firstName}</S.InputError>}
                            </div>
                            
                            <div style={{ width: '100%' }}>
                                <S.Input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={registerData.lastName}
                                    onChange={handleRegisterChange}
                                    required
                                    style={{
                                        ...hasError('lastName') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                        '@media (max-width: 768px)': {
                                            fontSize: '15px',
                                            padding: '12px 15px'
                                        }
                                    }}
                                />
                                {fieldErrors.lastName && <S.InputError>{fieldErrors.lastName}</S.InputError>}
                            </div>
                        </FormRow>
                        
                        <div style={{ width: '100%' }}>
                            <S.Input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                                required
                                style={{
                                    ...hasError('email') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                    '@media (max-width: 768px)': {
                                        fontSize: '15px',
                                        padding: '12px 15px'
                                    }
                                }}
                            />
                            {fieldErrors.email && <S.InputError>{fieldErrors.email}</S.InputError>}
                        </div>
                        
                        <FormRow>
                            <div style={{ width: '100%' }}>
                                <S.Input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    required
                                    style={{
                                        ...hasError('password') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                        '@media (max-width: 768px)': {
                                            fontSize: '15px',
                                            padding: '12px 15px'
                                        }
                                    }}
                                />
                                {fieldErrors.password && <S.InputError>{fieldErrors.password}</S.InputError>}
                            </div>
                            
                            <div style={{ width: '100%' }}>
                                <S.Input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    required
                                    style={{
                                        ...hasError('confirmPassword') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                        '@media (max-width: 768px)': {
                                            fontSize: '15px',
                                            padding: '12px 15px'
                                        }
                                    }}
                                />
                                {fieldErrors.confirmPassword && <S.InputError>{fieldErrors.confirmPassword}</S.InputError>}
                            </div>
                        </FormRow>
                        
                        <FormRow>
                            <div style={{ width: '100%' }}>
                                <S.Select 
                                    name="country"
                                    value={registerData.country}
                                    onChange={handleRegisterChange}
                                    required
                                    style={{
                                        ...hasError('country') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                        '@media (max-width: 768px)': {
                                            fontSize: '15px',
                                            padding: '12px 15px'
                                        }
                                    }}
                                >
                                    <option value="">Country</option>
                                    {countries.map((country, index) => (
                                        <option key={index} value={country.toLowerCase()}>
                                            {country}
                                        </option>
                                    ))}
                                </S.Select>
                                {fieldErrors.country && <S.InputError>{fieldErrors.country}</S.InputError>}
                            </div>
                        </FormRow>
                        
                        <div style={{ width: '100%' }}>
                            <S.Input
                                type="text"
                                name="institution"
                                placeholder="Institution"
                                value={registerData.institution}
                                onChange={handleRegisterChange}
                                style={{
                                    ...hasError('institution') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                    '@media (max-width: 768px)': {
                                        fontSize: '15px',
                                        padding: '12px 15px'
                                    }
                                }}
                            />
                            {fieldErrors.institution && <S.InputError>{fieldErrors.institution}</S.InputError>}
                        </div>
                        
                        <div style={{ width: '100%' }}>
                            <S.Select 
                                name="role"
                                value={registerData.role}
                                onChange={handleRegisterChange}
                                required
                                style={{
                                    ...hasError('role') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {},
                                    '@media (max-width: 768px)': {
                                        fontSize: '15px',
                                        padding: '12px 15px'
                                    }
                                }}
                            >
                                <option value="">Role</option>
                                <option value="STUDENT">Student</option>
                                <option value="ACADEMIC">Academic</option>
                                <option value="INDUSTRY_PROFESSIONAL">Industry Professional</option>
                                <option value="OTHER">Other</option>
                            </S.Select>
                            {fieldErrors.role && <S.InputError>{fieldErrors.role}</S.InputError>}
                        </div>
                        <S.Button type="submit" disabled={loading} style={{
                            '@media (max-width: 768px)': {
                                width: '100%',
                                fontSize: '15px',
                                padding: '12px 20px',
                                marginTop: '20px'
                            }
                        }}>
                            {loading ? 'Processing...' : 'Sign Up'}
                        </S.Button>
                    </S.Form>
                </S.SignUpContainer>

                <S.SignInContainer $isLogin={isLogin}>
                    <S.Form onSubmit={handleLoginSubmit}>
                        <S.Title2>Sign In</S.Title2>
                        
                        <div style={{ width: '80%', '@media (max-width: 768px)': { width: '100%' } }}>
                            <LoginInput
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                required
                                style={hasError('loginEmail') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.loginEmail && <S.InputError style={{ marginLeft: '10%', '@media (max-width: 768px)': { marginLeft: 0 } }}>{fieldErrors.loginEmail}</S.InputError>}
                        </div>
                        
                        <div style={{ width: '80%', '@media (max-width: 768px)': { width: '100%' } }}>
                            <LoginInput
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                required
                                style={hasError('loginPassword') ? { borderColor: '#e74c3c', borderWidth: '2px' } : {}}
                            />
                            {fieldErrors.loginPassword && <S.InputError style={{ marginLeft: '10%', '@media (max-width: 768px)': { marginLeft: 0 } }}>{fieldErrors.loginPassword}</S.InputError>}
                        </div>
                        
                        <S.LinkText as={Link} to="/forgot-password" style={{
                            '@media (max-width: 768px)': {
                                fontSize: '14px',
                                marginTop: '10px',
                                marginBottom: '20px'
                            }
                        }}>
                            Forgot your password?
                        </S.LinkText>
                        
                        <S.Button type="submit" disabled={loading} style={{
                            '@media (max-width: 768px)': {
                                width: '100%',
                                fontSize: '15px',
                                padding: '12px 20px'
                            }
                        }}>
                            {loading ? 'Processing...' : 'Sign In'}
                        </S.Button>
                    </S.Form>
                </S.SignInContainer>
                
                <S.OverlayContainer $isLogin={isLogin}>
                    <S.Overlay $isLogin={isLogin}>
                        <S.LeftOverlayPanel $isLogin={isLogin}>
                            <S.Title>Hello!</S.Title>
                            <S.Text style={{
                                '@media (max-width: 768px)': {
                                    fontSize: '14px',
                                    lineHeight: '1.4'
                                }
                            }}>
                                Don't you have an account?<br />
                                Join us to use all of site features.
                            </S.Text>
                            <S.GhostButton onClick={() => {
                                navigate('/login?signup=true');
                            }} style={{
                                '@media (max-width: 768px)': {
                                    fontSize: '14px',
                                    padding: '10px 20px'
                                }
                            }}>
                                SIGN UP
                            </S.GhostButton>
                        </S.LeftOverlayPanel>

                        <S.RightOverlayPanel $isLogin={isLogin}>
                            <S.Title>Welcome!</S.Title>
                            <S.Text style={{
                                '@media (max-width: 768px)': {
                                    fontSize: '14px',
                                    lineHeight: '1.4'
                                }
                            }}>
                                You already have an account?<br />
                                Sign In!
                            </S.Text>
                            <S.GhostButton onClick={() => {
                                navigate('/login');
                            }} style={{
                                '@media (max-width: 768px)': {
                                    fontSize: '14px',
                                    padding: '10px 20px'
                                }
                            }}>
                                SIGN IN
                            </S.GhostButton>
                        </S.RightOverlayPanel>
                    </S.Overlay>
                </S.OverlayContainer>

                {error && <S.ErrorText>{error}</S.ErrorText>}
            </DesktopContainer>
        </div>
    );
};

export default Login; 