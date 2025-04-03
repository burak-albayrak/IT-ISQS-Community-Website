import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import contactUsImg from '../assets/contactus.png';

// Basitleştirilmiş stil bileşenleri
const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to right, #e1e5ee 50%, white 50%);
  padding-bottom: 150px; /* Footer için alan */
`;

const ContentContainer = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
`;

const TopSection = styled.div`
  display: flex;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    background: #e1e5ee;
  }
`;

const LeftContent = styled.div`
  width: 50%;
  padding: 6rem 4rem 4rem 8rem;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 3rem 2rem;
  }
`;

const RightContent = styled.div`
  width: 50%;
  padding: 5rem 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  @media (max-width: 768px) {
    width: 100%;
    padding: 2rem;
    align-items: center;
    background: white;
  }
`;

const ContactImage = styled.img`
  max-width: 72%;
  height: auto;
  transform: translateY(-2rem);
  
  @media (max-width: 768px) {
    transform: none;
    max-width: 80%;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: bold;
  color: #223A70;
  margin-bottom: 1rem;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 3.5rem;
  line-height: 1.5;
`;

const ContactInfoSection = styled.div`
  margin-top: -0.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  font-size: 1rem;
`;

const ContactText = styled.span`
  color: #333;
  font-size: 1.05rem;
`;

const ContactDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0.3rem 0 0.5rem 0;
`;

const FormSectionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
  margin-top: -5rem;
  position: relative;
  
  @media (max-width: 768px) {
    margin-top: 2rem;
    padding: 0 1rem;
  }
`;

const FormSection = styled.div`
  padding: 2.5rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  width: 80%;
  max-width: 800px;
  position: relative;
  
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const FormTitle = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  color: #223A70;
  margin-bottom: 2rem;
  text-transform: uppercase;
  font-weight: 600;
`;

const FormContainer = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputField = styled.input`
  padding: 12px 15px;
  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: 1rem;
  flex: 1;
  width: 100%;
  
  &:focus {
    outline: none;
    border-color: #223A70;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const TextareaField = styled.textarea`
  padding: 15px;
  border-radius: 15px;
  border: 1px solid #ddd;
  font-size: 1rem;
  width: 100%;
  min-height: 120px;
  resize: none;
  
  &:focus {
    outline: none;
    border-color: #223A70;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

const SubmitButton = styled.button`
  padding: 10px 30px;
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin: 1.5rem auto 0;
  display: block;
  
  &:hover {
    background-color: #f5f5f5;
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  
  &:disabled {
    background-color: #eee;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const mainContent = document.querySelector('.main-content');
    
    if (mainContent) {
      mainContent.classList.add('no-padding');
      
      return () => {
        mainContent.classList.remove('no-padding');
      };
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({
        name: '',
        surname: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
      alert('Your message has been sent successfully!');
    }, 1500);
  };

  return (
    <PageWrapper>
      <ContentContainer>
        <TopSection>
          <LeftContent>
            <Title>Contact Us</Title>
            <Subtitle>
              Contact us for request, suggestion, complaint and press relations.
            </Subtitle>
            
            <ContactInfoSection>
              <ContactItem>
                <div>
                  <ContactText>📍 Location</ContactText>
                  <ContactDivider />
                  <ContactText>6391 Elgin St. Celina, Delaware 10299</ContactText>
                </div>
              </ContactItem>
              
              <ContactItem>
                <div>
                  <ContactText>📞 Phone</ContactText>
                  <ContactDivider />
                  <ContactText>(603) 555-0123</ContactText>
                </div>
              </ContactItem>
              
              <ContactItem>
                <div>
                  <ContactText>✉️ E-mail</ContactText>
                  <ContactDivider />
                  <ContactText>blabla@edu</ContactText>
                </div>
              </ContactItem>
            </ContactInfoSection>
          </LeftContent>
          
          <RightContent>
            <ContactImage src={contactUsImg} alt="Contact support" />
          </RightContent>
        </TopSection>

        <FormSectionWrapper>
          <FormSection>
            <FormTitle>Send a Message</FormTitle>
            <form onSubmit={handleSubmit}>
              <FormContainer>
                <FormColumn>
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Name*"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  
                  <InputField
                    type="text"
                    name="surname"
                    placeholder="Surname*"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                  />
                  
                  <InputField
                    type="email"
                    name="email"
                    placeholder="E-mail*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormColumn>
                
                <FormColumn>
                  <InputField
                    type="text"
                    name="subject"
                    placeholder="Subject*"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                  
                  <TextareaField
                    name="message"
                    placeholder="Description*"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </FormColumn>
              </FormContainer>
              
              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
              </SubmitButton>
            </form>
          </FormSection>
        </FormSectionWrapper>
      </ContentContainer>
    </PageWrapper>
  );
};

export default ContactUs; 