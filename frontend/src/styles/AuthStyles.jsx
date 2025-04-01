import styled, { css } from 'styled-components';

const colors = {
    primary: '#2a4b8d',    // Mavi - Contact Us butonuyla aynı renk
    light: '#4a6cad',      // Açık mavi
    dark: '#1a3a7d',       // Koyu mavi
    background: '#f1f1f1',  // Açık gri arka plan
    text: '#333',          // Metin rengi
    white: '#FFFFFF'
};

export const Container = styled.div`
    background-color: ${colors.white};
    border-radius: 20px;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: hidden;
    width: 1000px;
    max-width: 100%;
    min-height: 680px;
    margin: 50px auto;
`;

export const Form = styled.form`
    background-color: ${colors.white};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 40px;
    height: 100%;
    text-align: center;
    overflow-y: auto;
    max-height: 680px;
`;

export const Title = styled.h1`
    font-weight: bold;
    margin: 0;
    font-size: 2rem;
    color: ${colors.white};
`;

export const Title2 = styled.h1`
    font-weight: bold;
    margin: 0 0 20px;
    font-size: 2rem;
    color: ${colors.text};
`;

export const Text = styled.p`
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.5px;
    margin: 30px 0 15px;
    color: ${colors.white};
`;

export const Input = styled.input`
    background-color: #eee;
    border: none;
    border-radius: 30px;
    padding: 12px 15px;
    margin: 6px 0;
    width: 100%;
    font-size: 1rem;
`;

export const Select = styled.select`
    background-color: #eee;
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
    border: 1px solid ${colors.primary};
    background-color: ${colors.primary};
    color: ${colors.white};
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
    background-color: transparent;
    border: 2px solid ${colors.white};
    border-radius: 30px;
    color: ${colors.white};
    font-size: 14px;
    font-weight: bold;
    padding: 12px 45px;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 0.3s ease;
    margin-top: 15px;
    cursor: pointer;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
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
        background-color: #f8f8f8;
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
    color: ${colors.text};
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

// Animasyon için kritik olan bileşenler:
export const SignUpContainer = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
    ${props => !props.isLogin && css`
        transform: translateX(100%);
        opacity: 1;
        z-index: 5;
    `}
`;

export const SignInContainer = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
    left: 0;
    width: 50%;
    z-index: 2;
    ${props => !props.isLogin && css`
        transform: translateX(100%);
    `}
`;

export const OverlayContainer = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
    ${props => !props.isLogin && css`
        transform: translateX(-100%);
    `}
`;

export const Overlay = styled.div.attrs(props => ({
    'data-islogin': props.isLogin
}))`
    background: ${colors.primary};
    background: linear-gradient(to right, ${colors.primary}, ${colors.light});
    color: ${colors.white};
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    ${props => !props.isLogin && css`
        transform: translateX(50%);
    `}
`;

export const OverlayPanel = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
`;

export const LeftOverlayPanel = styled(OverlayPanel).attrs(props => ({
    'data-islogin': props.isLogin
}))`
    transform: translateX(-20%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${props => !props.isLogin && css`
        transform: translateX(0);
    `}
`;

export const RightOverlayPanel = styled(OverlayPanel).attrs(props => ({
    'data-islogin': props.isLogin
}))`
    right: 0;
    transform: translateX(0);
    ${props => !props.isLogin && css`
        transform: translateX(20%);
    `}
`;

export const ErrorText = styled.p`
    color: #e74c3c;
    font-size: 14px;
    margin: 5px 0;
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