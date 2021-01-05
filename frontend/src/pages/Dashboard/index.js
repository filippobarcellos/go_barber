import { useState, useEffect, useMemo } from 'react';
import { FiClock } from 'react-icons/fi';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { format, parseISO, isToday, isAfter } from 'date-fns';
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
    setAppointments([]);
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    api
      .get(`/schedule`, {
        params: {
          date: new Date(year, month, day),
        },
      })
      .then((response) => {
        const appointmentsFormatted = response.data.map((appointment) => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
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

  const morningAppointments = useMemo(() => {
    return appointments.filter((a) => {
      return parseISO(a.date).getHours() < 12;
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter((a) => {
      return parseISO(a.date).getHours() >= 12;
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find((a) => isAfter(parseISO(a.date), new Date()));
  }, [appointments]);

  return (
    <>
      <Header />
      <S.Main>
        <S.Schedule>
          <S.Header>
            <h2>Schedule</h2>
            <span>{selectedDayAsText}</span>
          </S.Header>

          {isToday(selectedDate) && nextAppointment && (
            <S.NextAppointment>
              <span>Next Appointment</span>

              <div>
                <img
                  src={nextAppointment.user.avatar_url}
                  alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                  <FiClock />
                  {nextAppointment.hourFormatted}
                </span>
              </div>
            </S.NextAppointment>
          )}

          <S.Appointments>
            <span>Morning</span>

            {morningAppointments.length === 0 && (
              <p>
                There's no appointments for this morning. Enjoy your free time.
                😀
              </p>
            )}

            {morningAppointments.map((appointment) => (
              <S.SingleAppoinment>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </S.SingleAppoinment>
            ))}
          </S.Appointments>

          <S.Appointments>
            <span>Afternoon</span>

            {afternoonAppointments.length === 0 && (
              <p>
                There's no appointments for this afternoon. Enjoy your free
                time.😀
              </p>
            )}

            {afternoonAppointments.map((appointment, i) => (
              <S.SingleAppoinment key={i}>
                <span>
                  <FiClock />
                  {appointment.hourFormatted}
                </span>

                <div>
                  <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                  />
                  <strong>{appointment.user.name}</strong>
                </div>
              </S.SingleAppoinment>
            ))}
          </S.Appointments>
        </S.Schedule>

        <S.Calendar>
          <DayPicker
            fromMonth={new Date()}
            disabledDays={[
              {
                before: new Date(),
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
