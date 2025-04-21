import React, { useState } from 'react';
import { checkCommentToxicity } from '../services/toxicityService';
import styled from 'styled-components';

const FormContainer = styled.div`
    margin: 20px 0;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    min-height: 100px;
    font-family: inherit;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
    
    &:hover:not(:disabled) {
        background-color: #0056b3;
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    margin-top: 10px;
    padding: 10px;
    border-radius: 4px;
    background-color: #f8d7da;
`;

const CommentForm = ({ onSubmit }) => {
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            // Check toxicity before submitting
            const toxicityResult = await checkCommentToxicity(comment);
            
            if (toxicityResult.is_toxic) {
                setError('Please comment respectfully.');
                setIsSubmitting(false);
                return;
            }

            // If comment is not toxic, proceed with submission
            await onSubmit(comment);
            setComment('');
            
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <FormContainer>
            <StyledForm onSubmit={handleSubmit}>
                <TextArea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here..."
                    required
                />
                <Button type="submit" disabled={isSubmitting || !comment.trim()}>
                    {isSubmitting ? 'Submitting...' : 'Submit Comment'}
                </Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </StyledForm>
        </FormContainer>
    );
};

export default CommentForm; 