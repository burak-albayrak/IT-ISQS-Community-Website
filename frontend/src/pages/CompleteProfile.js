import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import * as S from '../styles/AuthStyles';
import { updateUserProfile } from '../services/authService';
import { useAuth } from '../contexts/AuthContext';

const CompleteProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login: authLogin } = useAuth();
    const [loading, setLoading] = useState(false);
    const [profileData, setProfileData] = useState({
        password: '',
        confirmPassword: '',
        role: '',
        country: '',
        institution: '',
    });

    const roles = ["STUDENT", "ACADEMICIAN", "PROFESSIONAL"];
    const countries = [
        "Turkey", "United States", "United Kingdom", "Germany", "France", "Italy", "Spain",
        "Canada", "Australia", "Japan", "South Korea", "China", "India", "Brazil",
        // Diğer ülkeler...
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (profileData.password !== profileData.confirmPassword) {
                toast.error('Passwords do not match');
                return;
            }

            // Token'ı al
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('No authentication token found');
                navigate('/login');
                return;
            }

            // Token'dan kullanıcı bilgilerini çıkar
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            const userId = decodedToken.userId;

            // Profili güncelle
            const response = await updateUserProfile(userId, {
                password: profileData.password,
                role: profileData.role,
                country: profileData.country,
                institution: profileData.institution,
            });

            // Context'i güncelle
            authLogin({ token, user: response });
            
            toast.success('Profile completed successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error completing profile:', error);
            toast.error(error.message || 'Failed to complete profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>
            <S.SignInContainer>
                <S.Title>Complete Your Profile</S.Title>
                <S.Text>Please provide additional information to complete your registration</S.Text>
                
                <S.Form onSubmit={handleSubmit}>
                    <S.Input
                        type="password"
                        name="password"
                        placeholder="Create Password"
                        value={profileData.password}
                        onChange={handleChange}
                        required
                    />
                    
                    <S.Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={profileData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    
                    <S.Select
                        name="role"
                        value={profileData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role} value={role}>
                                {role.charAt(0) + role.slice(1).toLowerCase()}
                            </option>
                        ))}
                    </S.Select>
                    
                    <S.Select
                        name="country"
                        value={profileData.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                            <option key={country} value={country}>{country}</option>
                        ))}
                    </S.Select>
                    
                    <S.Input
                        type="text"
                        name="institution"
                        placeholder="Institution (University/Company)"
                        value={profileData.institution}
                        onChange={handleChange}
                        required
                    />
                    
                    <S.Button type="submit" disabled={loading}>
                        {loading ? 'Processing...' : 'Complete Registration'}
                    </S.Button>
                </S.Form>
            </S.SignInContainer>
        </S.Container>
    );
};

export default CompleteProfile; 