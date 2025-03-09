'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import MonthlyCalendar from '../../../components/app/schedule/MonthlyCalendar';
import WeeklyCalendar from '../../../components/app/schedule/WeeklyCalendar';

const Calendar = ({ setPeriod, toast, currentDate, events = [] }: any) => {
	const [calendar, setCalendar] = useState('month');

	const searchParams = useSearchParams();
	const calendarParam = searchParams.get('interface');
	useEffect(() => {
		if (calendarParam === 'week') {
			setCalendar('week');
			setPeriod('week');
			return;
		}
		setCalendar('month');
		setPeriod('month');
	}, [calendarParam, setPeriod]);

	return (
		<>
			{calendar === 'month' ? (
				<MonthlyCalendar toast={toast} currentDate={currentDate} events={events} />
			) : (
				<WeeklyCalendar toast={toast} currentDate={currentDate} events={events} />
			)}
		</>
	);
};

export default Calendar;
