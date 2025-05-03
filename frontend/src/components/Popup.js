import React, { useEffect } from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 25px;
  border-radius: 8px;
  background-color: ${props => props.type === 'success' ? '#27ae60' : '#e74c3c'};
  color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  animation: slideIn 0.3s ease-out;
  display: flex;
  align-items: center;
  gap: 10px;

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

const Icon = styled.span`
  font-size: 1.2em;
`;

const Message = styled.p`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
`;

const Popup = ({ message, type = 'success', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <PopupContainer type={type}>
      <Icon>{type === 'success' ? '✓' : '✕'}</Icon>
      <Message>{message}</Message>
    </PopupContainer>
  );
};

export default Popup; 