import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const ReplyFormContainer = styled.div`
  margin-left: 56px;
  margin-top: 12px;
  margin-bottom: 16px;
  position: relative;
  width: calc(100% - 56px);
  background-color: #F9FAFB;
  border-radius: 8px;
  padding: 16px;
`;

export const RepliesContainer = styled.div`
  margin-left: 56px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  padding-left: 28px;
  width: calc(100% - 56px);

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 16px;
    width: 2px;
    background-color: #E4E7EC;
  }
`;

export const CommentForm = styled.form`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`;

export const CommentInput = styled(TextareaAutosize)`
  flex-grow: 1;
  padding: 12px 16px;
  border: 1px solid #E4E7EC;
  border-radius: 8px;
  font-size: 15px;
  resize: none;
  min-height: 44px;
  line-height: 1.5;
  background-color: #FFFFFF;

  &:focus {
    outline: none;
    border-color: #1570EF;
    box-shadow: 0 0 0 2px rgba(21, 112, 239, 0.1);
  }

  &::placeholder {
    color: #98A2B3;
  }
`; 