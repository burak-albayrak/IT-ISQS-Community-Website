import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserProfile } from '../services/authService';
import { toast } from 'react-hot-toast';

const OAuth2Callback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login: authLogin } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            const tempToken = params.get('temp_token');
            const registration = params.get('registration');

            if (tempToken && registration === 'incomplete') {
                // Yeni kullanıcı - profil tamamlama sayfasına yönlendir
                localStorage.setItem('token', tempToken);
                navigate('/complete-profile');
                toast.success('Please complete your profile to continue');
                return;
            }

            if (token) {
                try {
                    // Token'ı localStorage'a kaydet
                    localStorage.setItem('token', token);

                    // Token'ı decode et
                    const decodedToken = JSON.parse(atob(token.split('.')[1]));
                    console.log('Decoded token:', decodedToken);

                    // Mevcut kullanıcı için normal akış
                    const userResponse = await getUserProfile();
                    console.log('User profile response:', userResponse);

                    const userInfo = {
                        ...userResponse,
                        email: decodedToken.sub,
                        id: decodedToken.userId,
                    };

                    // Context'e kullanıcı bilgilerini kaydet
                    authLogin({ token, user: userInfo });
                    
                    // Local storage'a kullanıcı bilgilerini kaydet
                    localStorage.setItem('user', JSON.stringify(userInfo));

                    // Ana sayfaya yönlendir
                    navigate('/');
                    toast.success('Successfully logged in!');
                } catch (error) {
                    console.error('Error processing OAuth callback:', error);
                    toast.error('Login failed. Please try again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                }
            } else {
                toast.error('No token received');
                navigate('/login');
            }
        };

        handleCallback();
    }, [navigate, location, authLogin]);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            Processing login...
        </div>
    );
};

export default OAuth2Callback; 