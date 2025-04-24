import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Import static translations
import trTranslations from '../translations/tr.json';
import esTranslations from '../translations/es.json';
import nlTranslations from '../translations/nl.json';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language
    const [translations, setTranslations] = useState({});

    // Static translations map
    const staticTranslations = {
        tr: trTranslations,
        es: esTranslations,
        nl: nlTranslations
    };

    useEffect(() => {
        // Load translations for the selected language
        setTranslations(staticTranslations[language] || {});
    }, [language]);

    // Function to change language
    const changeLanguage = (newLang) => {
        setLanguage(newLang);
        localStorage.setItem('preferredLanguage', newLang);
    };

    // Function to translate dynamic content
    const translateDynamic = async (text) => {
        if (language === 'en') return text; // Don't translate if target is English
        
        try {
            const response = await axios.post('/api/translate', {
                text,
                targetLanguage: language
            });
            return response.data.translatedText;
        } catch (error) {
            console.error('Translation error:', error);
            return text; // Return original text if translation fails
        }
    };

    // Function to get static translation
    const t = (key) => {
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            value = value?.[k];
            if (!value) break;
        }
        
        return value || key;
    };

    return (
        <LanguageContext.Provider value={{
            language,
            changeLanguage,
            translateDynamic,
            t,
            availableLanguages: ['en', 'tr', 'es', 'nl']
        }}>
            {children}
        </LanguageContext.Provider>
    );
}; 