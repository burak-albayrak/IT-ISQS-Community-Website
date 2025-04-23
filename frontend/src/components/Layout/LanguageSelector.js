import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons'; // Google Translate ikonu yerine dil ikonu
import styled from 'styled-components';

const SelectorWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-left: 15px; /* Diğer ikonlardan ayırmak için */
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem; /* İkon boyutu */
  color: #555; /* İkon rengi */
  padding: 5px;

  &:hover {
    color: #000;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 100px;
  padding: 5px 0;
`;

const DropdownItem = styled.button`
  display: block;
  width: 100%;
  padding: 8px 15px;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const LanguageSelector = () => {
  const { language, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  // Mevcut dilin tam adını göster (opsiyonel)
  const languageNames = {
    en: 'English',
    tr: 'Türkçe',
    es: 'Español',
    nl: 'Nederlands',
  };

  return (
    <SelectorWrapper>
      <IconButton onClick={() => setIsOpen(!isOpen)} title="Change Language">
        <FontAwesomeIcon icon={faLanguage} />
      </IconButton>
      {isOpen && (
        <DropdownMenu>
          {availableLanguages.map((lang) => (
            <DropdownItem
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              style={{ fontWeight: lang === language ? 'bold' : 'normal' }}
            >
              {languageNames[lang] || lang.toUpperCase()}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </SelectorWrapper>
  );
};

export default LanguageSelector; 