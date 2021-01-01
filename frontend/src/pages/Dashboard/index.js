import { useState, useEffect } from 'react';
import { FiClock } from 'react-icons/fi';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import api from '../../services/api';
import { useAuth } from '../../context/useAuth';
import * as S from './styles';

import Header from '../../components/Header';

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { user } = useAuth();

  const handleDateChange = (day, modifiers) => {
    if (modifiers.available) {
      setSelectedDate(day);
    }
  };

  const handleMonthChange = (month) => {
    setCurrentMonth(month);
  };

  useEffect(() => {
    api.get(`providers/${user.id}/availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth(),
      },
    });
  }, [user.id, currentMonth]);

  return (
    <>
      <Header />
      <S.Main>
        <S.Schedule>
          <S.Header>
            <h2>Today's Schedule</h2>
            <span>Today | 6th Monday</span>
          </S.Header>

          <S.NextAppointment>
            <span>Next Appointment</span>

            <div>
              <img
                src="https://avatars0.githubusercontent.com/u/56128203?s=460&u=9e5f0f57bd59aba31c947d38307cedb30e0f0ebe&v=4"
                alt="Filippo"
              />
              <strong>Filippo Barcellos</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </S.NextAppointment>

          <S.Appointments>
            <span>Morning</span>

            <S.SingleAppoinment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/56128203?s=460&u=9e5f0f57bd59aba31c947d38307cedb30e0f0ebe&v=4"
                  alt="Filippo"
                />
                <strong>Filippo Barcellos</strong>
              </div>
            </S.SingleAppoinment>
            <S.SingleAppoinment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/56128203?s=460&u=9e5f0f57bd59aba31c947d38307cedb30e0f0ebe&v=4"
                  alt="Filippo"
                />
                <strong>Filippo Barcellos</strong>
              </div>
            </S.SingleAppoinment>
          </S.Appointments>

          <S.Appointments>
            <span>Afternoon</span>

            <S.SingleAppoinment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/56128203?s=460&u=9e5f0f57bd59aba31c947d38307cedb30e0f0ebe&v=4"
                  alt="Filippo"
                />
                <strong>Filippo Barcellos</strong>
              </div>
            </S.SingleAppoinment>
            <S.SingleAppoinment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars0.githubusercontent.com/u/56128203?s=460&u=9e5f0f57bd59aba31c947d38307cedb30e0f0ebe&v=4"
                  alt="Filippo"
                />
                <strong>Filippo Barcellos</strong>
              </div>
            </S.SingleAppoinment>
          </S.Appointments>
        </S.Schedule>
        <S.Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[
              {
                daysOfWeek: [0, 6],
              },
            ]}
            modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5] } }}
            onDayClick={handleDateChange}
            selectedDays={selectedDate}
            onMonthChange={handleMonthChange}
          />
        </S.Calendar>
      </S.Main>
    </>
  );
}

export default Dashboard;
