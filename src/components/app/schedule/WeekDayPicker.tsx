'use client';

import { useState } from 'react';

import { Calendar } from '@/components/ui/calendar';

const WeekDayPicker = ({ controller }: any) => {
	const [date, setDate] = useState<Date>();

	return (
		<div className="flex flex-col items-center justify-center">
			<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
		</div>
	);
};

export default WeekDayPicker;
