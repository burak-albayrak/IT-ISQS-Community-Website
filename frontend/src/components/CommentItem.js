import React from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { CommentReplyButton } from './CommentButtons';
import { ReplyFormContainer, RepliesContainer, CommentForm, CommentInput } from './CommentStyles';
import {
  CommentItemContainer,
  CommentMainContent,
  CommentAvatar,
  CommentContent,
  CommentAuthor,
  CommentAuthorName,
  CommentTime,
  CommentText,
  CommentActionsContainer
} from './CommentItemStyles';

const CommentItem = ({
  comment,
  replyingTo,
  replyTexts,
  handleReplyTextChange,
  setReplyingTo,
  handleSubmitReply,
  defaultProfilePic,
  isReply = false
}) => {
  return (
    <CommentItemContainer $isReply={isReply}>
      <CommentMainContent>
        <CommentAvatar $isReply={isReply}>
          <img
            src={comment.userProfilePic || defaultProfilePic}
            alt={`${comment.userName}'s avatar`}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultProfilePic;
            }}
          />
        </CommentAvatar>
        <CommentContent>
          <CommentAuthor>
            <CommentAuthorName>{comment.userName}</CommentAuthorName>
            <CommentTime>{comment.timeAgo}</CommentTime>
          </CommentAuthor>
          <CommentText>{comment.content}</CommentText>
          {!isReply && (
            <CommentActionsContainer>
              <CommentReplyButton 
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                className={replyingTo === comment.id ? 'active' : ''}
              >
                <FiMessageSquare size={14} />
                <span>Reply</span>
              </CommentReplyButton>
            </CommentActionsContainer>
          )}
        </CommentContent>
      </CommentMainContent>

      {replyingTo === comment.id && (
        <ReplyFormContainer>
          <CommentForm onSubmit={(e) => handleSubmitReply(e, comment.id)}>
            <CommentInput
              placeholder="Write a reply..."
              value={replyTexts[comment.id] || ''}
              onChange={(e) => handleReplyTextChange(comment.id, e.target.value)}
              minRows={1}
              maxRows={5}
            />
            <button type="submit" disabled={!replyTexts[comment.id]?.trim()}>
              Reply
            </button>
          </CommentForm>
        </ReplyFormContainer>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <RepliesContainer>
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              replyingTo={replyingTo}
              replyTexts={replyTexts}
              handleReplyTextChange={handleReplyTextChange}
              setReplyingTo={setReplyingTo}
              handleSubmitReply={handleSubmitReply}
              defaultProfilePic={defaultProfilePic}
              isReply={true}
            />
          ))}
        </RepliesContainer>
      )}
    </CommentItemContainer>
  );
};

export default CommentItem; 