import styled from 'styled-components';
import { shade } from 'polished';
import ArrowLeftIcon from '../../assets/ArrowLeft.svg';
import ArrowRightIcon from '../../assets/ArrowRight.svg';

export const Main = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Header = styled.div`
  h2 {
    font-size: 36px;
    color: var(--text);
    margin-bottom: 12px;
  }

  span {
    font-size: 16px;
    color: var(--primary);
    font-weight: 500;
  }
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  span {
    font-size: 20px;
  }

  div {
    width: 100%;
    background: var(--shape);
    border-radius: 10px;
    align-items: center;
    padding: 16px 24px;
    margin-top: 24px;
    position: relative;
    display: flex;

    &::before {
      content: '';
      position: absolute;
      background: var(--primary);
      width: 1px;
      height: 80%;
      left: 0;
      top: 10%;
    }

    > strong {
      font-size: 18px;
      color: var(--text);
      font-weight: 500;
      margin-left: 24px;
    }

    > span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: var(--textGrey);

      svg {
        color: var(--primary);
        margin-right: 8px;
      }
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
`;

export const Appointments = styled.div`
  margin-top: 48px;

  > span {
    color: var(--textGrey);
    font-size: 16px;
    line-height: 26px;
    border-bottom: 1px solid var(--textGrey);
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const SingleAppoinment = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  > span {
    display: flex;
    align-items: center;
    margin-right: 26px;

    svg {
      color: var(--primary);
      margin-right: 8px;
    }
  }

  div {
    width: 100%;
    background: var(--shape);
    border-radius: 10px;
    align-items: center;
    padding: 16px 24px;
    display: flex;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    > strong {
      font-size: 18px;
      color: var(--text);
      font-weight: 500;
      margin-left: 24px;
    }
  }
`;

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    border-radius: 0.6rem;
  }

  .DayPicker-wrapper {
    padding-bottom: 0;
    background: #3e3b47;
    border-radius: 0.6rem;
  }

  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }

  .DayPicker-NavButton {
    color: #999591 !important;
  }

  .DayPicker-NavButton--prev {
    background: url(${ArrowLeftIcon}) no-repeat center;
    right: auto;
    left: 1.5em;
    margin-right: 0;
  }

  .DayPicker-NavButton--next {
    background: url(${ArrowRightIcon}) no-repeat center;
  }

  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 1rem 0 0 0;
    padding: 16px;
    background-color: #28262e;
    border-radius: 0 0 10px 10px;
  }

  .DayPicker-Caption {
    margin-bottom: 1rem;
    padding: 0 1rem;
    color: #f4ede8;

    > div {
      text-align: center;
    }
  }

  .DayPicker-Weekday {
    color: #666360;
  }

  .DayPicker-Day {
    width: 2.5rem;
    height: 2.5rem;
  }

  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 0.6rem;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }

  .DayPicker-Day--today {
    font-weight: normal;
    color: #fff;
  }

  .DayPicker-Day--disabled {
    color: #666360;
    background: transparent !important;
  }

  .DayPicker-Day--selected {
    background: #ff9000 !important;
    border-radius: 0.6rem;
    color: #232129 !important;
  }
`;
