import styled from 'styled-components';

export const CommentReplyButton = styled.button`
  background: none;
  border: none;
  color: #667085;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 16px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  svg {
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    z-index: 2;
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover, &.active {
    color: #1570EF;
    background-color: rgba(21, 112, 239, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgba(21, 112, 239, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    transition: width 0.4s ease-out, height 0.4s ease-out;
  }

  &:active:before {
    width: 150%;
    height: 150%;
  }

  &.active {
    font-weight: 600;

    svg {
      transform: scale(1.1);
    }
  }
`; 