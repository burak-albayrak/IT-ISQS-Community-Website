import styled, { css } from 'styled-components';

const colors = {
    primary: '#223A70',           // Ana mavi renk
    light: '#4059A9',             // Açık mavi
    dark: '#192C54',              // Koyu mavi
    background: '#f1f1f1',        // Arka plan rengi
    text: '#333',                 // Metin rengi
    white: '#FFFFFF'              // Beyaz
};

export const Container = styled.div`
    background-color: #FFF;
    border-radius: 30px;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.08);
    position: relative;
    overflow: visible;
    width: 1000px;
    max-width: 100%;
    min-height: 680px;
    margin: 1px auto;
`;

export const Form = styled.form`
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 50px;
    height: 100%;
    overflow: hidden;
    max-height: 100%;
    text-align: center;
`;

export const Title = styled.h1`
    font-weight: bold;
    margin: 0;
    font-size: 2rem;
    color: #fff;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const Title2 = styled.h1`
    font-weight: bold;
    margin: 0 0 20px;
    font-size: 2rem;
    color: #333;
    text-shadow: none;
`;

export const Text = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 20px 0 15px;
    color: #666;
`;

export const Input = styled.input`
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 30px;
    padding: 12px 15px;
    margin: 6px 0;
    width: 100%;
    font-size: 1rem;
`;

export const Select = styled.select`
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    border-radius: 30px;
    padding: 12px 15px;
    margin: 6px 0;
    width: 100%;
    font-size: 1rem;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 15px top 50%;
    background-size: 12px auto;
`;

export const Button = styled.button`
    border-radius: 30px;
    border: 1px solid #fff;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 0.3s ease;
    margin-top: 15px;
    cursor: pointer;

    &:hover {
        transform: scale(1.05);
        background-color: #f8f8f8;
    }

    &:active {
        transform: scale(0.95);
    }

    &:focus {
        outline: none;
    }

    &:disabled {
        background-color: #cccccc;
        border-color: #cccccc;
        cursor: not-allowed;
    }
`;

export const GhostButton = styled.button`
    background: linear-gradient(90deg, ${colors.primary}, ${colors.light});
    border: none;
    border-radius: 30px;
    color: white;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 35px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 0.3s ease, box-shadow 0.3s;
    margin-top: 15px;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(34, 58, 112, 0.2);

    &:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 15px rgba(34, 58, 112, 0.3);
    }
`;

export const LinkText = styled.a`
    color: ${colors.primary};
    font-size: 14px;
    text-decoration: none;
    margin: 15px 0;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;

export const SocialButton = styled.button`
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 5px;
    width: 40px;
    height: 40px;
    background-color: #fff;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
        transform: scale(1.1);
    }
`;

export const GoogleButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 30px;
    font-size: 14px;
    padding: 12px 20px;
    margin: 10px 0;
    width: 100%;
    color: #666;
    font-weight: 500;
    gap: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(255, 255, 255, 0.9);
    }
`;

export const GoogleLogo = styled.img`
    width: 20px;
    height: 20px;
`;

export const Divider = styled.div`
    position: relative;
    width: 100%;
    text-align: center;
    margin: 15px 0;
    
    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 40%;
        height: 1px;
        background-color: #ddd;
    }
    
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 40%;
        height: 1px;
        background-color: #ddd;
    }
`;

export const CheckboxContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin: 8px 0;
`;

export const Checkbox = styled.input`
    margin-right: 10px;
`;

export const CheckboxLabel = styled.label`
    font-size: 14px;
    color: #666;
    text-align: left;
`;

export const InputGroup = styled.div`
    position: relative;
    width: 100%;
`;

export const InputIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
    color: #999;
`;

// Dekoratif illüstrasyonlar için bileşenler
export const TopLeftImage = styled.img`
    position: absolute;
    top: 50px;
    left: 30px;
    width: 230px;
    height: 230px;
    z-index: 125;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(-5deg);
`;

export const BottomLeftImage = styled.img`
    position: absolute;
    bottom: 5px;
    left: 1050px;
    width: 250px;
    height: 250px;
    z-index: 160;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(-8deg);
`;

export const TopRightImage = styled.img`
    position: absolute;
    top: -35px;
    right: 120px;
    width: 200px;
    height: 200px;
    z-index: 160;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(5deg);
`;

export const BottomRightImage = styled.img`
    position: absolute;
    bottom: -100px;
    right: 900px;
    width: 350px;
    height: 350px;
    z-index: 125;
    opacity: 0.9;
    pointer-events: none;
    object-fit: contain;
    transform: rotate(8deg);
`;

// Form alanları içi arkaplan rengini ayarlayan bileşenler
export const SignUpContainer = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    left: 0;
    width: 65%;
    opacity: 0;
    z-index: 300;
    border-radius: 30px;
    background-color: rgba(140, 158, 193, 0.5);
    visibility: hidden;
    overflow: hidden;
    ${props => !props.isLogin && css`
        transform: translateX(53.8%);
        opacity: 1;
        z-index: 300;
        visibility: visible;
    `}
`;

export const SignInContainer = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    left: 0;
    width: 65%;
    z-index: 300;
    opacity: 1;
    visibility: visible;
    border-radius: 30px;
    background-color: rgba(140, 158, 193, 0.5);
    overflow: hidden;
    ${props => !props.isLogin && css`
        transform: translateX(53.8%);
        opacity: 0;
        visibility: hidden;
    `}
`;

export const OverlayContainer = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    position: absolute;
    top: 0;
    left: 65%;
    width: 35%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    z-index: 150;
    border-radius: 50px 0 0 50px;
    ${props => !props.isLogin && css`
        transform: translateX(-185.7%);
        border-radius: 30px 30px 30px 30px;
        z-index: 150;
    `}
`;

export const Overlay = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    background: rgba(255, 255, 255, 0.98);
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7));
    color: #333;
    position: relative;
    left: -100%;
    height: 100%;
    width: 185%;
    transform: translateX(54%);
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
    border-radius: 50px 0 0 50px;
    ${props => !props.isLogin && css`
        transform: translateX(0);
        border-radius: 0 50px 50px 0;
    `}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 45%;
    transform: translateX(0);
    transition: transform 0.8s cubic-bezier(0.86, 0, 0.07, 1);
`;

export const LeftOverlayPanel = styled(OverlayPanel).attrs(props => ({
    'data-islogin': props.isLogin
}))`
    transform: translateX(10%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${props => !props.isLogin && css`
        transform: translateX(-10%);
    `}

    ${Title} {
        color: #333;
    }

    ${Text} {
        color: #666;
    }

    ${GhostButton} {
        background: linear-gradient(90deg, ${colors.primary}, ${colors.light});
        color: white;
    }
`;

export const RightOverlayPanel = styled(OverlayPanel).attrs(props => ({
    'data-islogin': props.isLogin
}))`
    right: 0;
    transform: translateX(35%);
    ${props => !props.isLogin && css`
        transform: translateX(10%);
    `}

    ${Title} {
        color: #333;
    }

    ${Text} {
        color: #666;
    }

    ${GhostButton} {
        background: linear-gradient(90deg, ${colors.primary}, ${colors.light});
        color: white;
    }
`;

export const ErrorText = styled.p`
    color: #e74c3c;
    font-size: 14px;
    margin: 5px 0;
`;

export const InputError = styled.div`
    color: #e74c3c;
    font-size: 12px;
    margin: 2px 0 8px 15px;
    text-align: left;
    width: 100%;
    font-weight: 500;
    display: flex;
    align-items: center;
    animation: errorAppear 0.3s ease-in-out;
    
    @keyframes errorAppear {
        0% {
            opacity: 0;
            transform: translateY(-5px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    &::before {
        content: "!";
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 16px;
        background-color: #e74c3c;
        color: white;
        border-radius: 50%;
        margin-right: 6px;
        font-size: 10px;
        font-weight: bold;
    }
`;

export const PasswordStrengthContainer = styled.div`
    width: 100%;
    margin: 0 0 10px 0;
`;

export const PasswordStrengthBar = styled.div`
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    margin-top: 5px;
    overflow: hidden;
    position: relative;
`;

export const PasswordStrengthIndicator = styled.div`
    height: 100%;
    width: ${props => props.strength}%;
    background-color: ${props => {
        if (props.strength < 33) return '#e74c3c';
        if (props.strength < 66) return '#f39c12';
        return '#27ae60';
    }};
    border-radius: 2px;
    transition: width 0.3s ease, background-color 0.3s ease;
`;

export const PasswordStrengthText = styled.div`
    font-size: 12px;
    margin-top: 4px;
    text-align: right;
    color: ${props => {
        if (props.strength < 33) return '#e74c3c';
        if (props.strength < 66) return '#f39c12';
        return '#27ae60';
    }};
`;

export const FormIllustration = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
    height: 300px;
    background-size: contain;
    background-repeat: no-repeat;
    opacity: 0.2;
    z-index: 0;
`; 