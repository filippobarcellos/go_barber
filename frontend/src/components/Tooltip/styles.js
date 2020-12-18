import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  span {
    width: 220px;
    background: var(--error);
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: var(--text);

    &::before {
      content: '';
      position: absolute;
      border-style: solid;
      border-color: var(--error) transparent;
      border-width: 6px 6px 0 6px;
      left: 50%;
      transform: translateX(-50%);
      top: 100%;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
