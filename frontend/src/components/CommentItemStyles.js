import styled from 'styled-components';

export const CommentItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.$isReply ? '20px' : '24px'};
  padding: ${props => props.$isReply ? '0' : '32px 0'};
  border-bottom: ${props => props.$isReply ? 'none' : '1px solid #E4E7EC'};
  width: 100%;

  &:last-child {
    border-bottom: none;
  }
`;

export const CommentMainContent = styled.div`
  display: flex;
  gap: 16px;
  width: 100%;
`;

export const CommentAvatar = styled.div`
  width: ${props => props.$isReply ? '36px' : '40px'};
  height: ${props => props.$isReply ? '36px' : '40px'};
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    loading: lazy;
  }
`;

export const CommentContent = styled.div`
  flex-grow: 1;
  min-width: 0;
  padding-right: 16px;
`;

export const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
`;

export const CommentAuthorName = styled.div`
  font-weight: 600;
  color: #101828;
  font-size: 15px;
`;

export const CommentTime = styled.div`
  font-size: 13px;
  color: #667085;
`;

export const CommentText = styled.p`
  margin: 0;
  font-size: 15px;
  color: #344054;
  line-height: 1.6;
  white-space: pre-line;
  word-wrap: break-word;
  padding: 4px 0;
`;

export const CommentActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 12px;
`; 