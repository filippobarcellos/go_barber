import { useState, useEffect, useMemo } from 'react';
import { FiClock } from 'react-icons/fi';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { format } from 'date-fns';
import api from '../../services/api';
import { useAuth } from '../../context/useAuth';
import * as S from './styles';

import Header from '../../components/Header';

function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState([]);
  const [appointments, setAppointments] = useState([]);

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
    api
      .get(`providers/${user.id}/availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth(),
        },
      })
      .then((response) => setMonthAvailability(response.data));
  }, [user.id, currentMonth]);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const day = selectedDate.getDate();

    api
      .get(`/schedule`, {
        params: {
          date: new Date(year, month, day),
        },
      })
      .then((response) => setAppointments(response.data));
  }, [selectedDate]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter((monthDay) => monthDay.available === false)
      .map((monthDay) => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDayAsText = useMemo(() => {
    return format(selectedDate, 'do MMMM');
  }, [selectedDate]);

  return (
    <>
      <Header />
      <S.Main>
        <S.Schedule>
          <S.Header>
            {console.log(appointments)}
            <h2>Schedule</h2>
            <span>{selectedDayAsText}</span>
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
              ...disableDays,
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
