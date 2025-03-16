'use client';

import { useToast } from '@/components/ui/use-toast';
import { cn, GET, refreshSchedule, request } from '@/helpers';
import type { NewSchedule } from '@/schemas/schedule.schema';
import { useRouter } from 'next/navigation';
import { Suspense, useCallback, useEffect, useState } from 'react';

import { Button, buttonVariants } from '@/components/ui/button';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import IconGoogleCalendar from '../../../../public/google-calendar-svgrepo-com';
import IconLeft from '../../../../public/Left.Icon';
import IconRight from '../../../../public/Right.Icon';
import Calendar from './Calendar';
import Register from './RegisterBtn';

const Schedule = () => {
	const router = useRouter();
	const [events, setEvents] = useState<NewSchedule[]>([]);
	const [period, setPeriod] = useState('month');
	const [userHasGoogleAuth, setUserHasGoogleAuth] = useState(false);

	const { toast } = useToast();
	const handlRequestResponse = useCallback(
		(title: string, message: string) => toast({ title: title, description: message }),
		[toast]
	);

	useEffect(() => {
		const fetchGoogleAuth = async () => {
			const res = await request('user/google/access_token', GET());
			if (res.success) setUserHasGoogleAuth(true);
		};
		const fetchSchedules = async () => {
			try {
				const data: NewSchedule[] = await refreshSchedule();
				setEvents(data);
			} catch (error: any) {
				handlRequestResponse('Erro', error.message);
			}
		};
		fetchGoogleAuth();
		fetchSchedules();
	}, [handlRequestResponse, router]);

	const [currentDate, setCurrentDate] = useState(new Date());
	const monthNames = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro',
	];
	const currentMonth = monthNames[currentDate.getMonth()];
	const currentYear = currentDate.getFullYear();

	const handlePreviousMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
	const handleNextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
	const handlePreviousWeek = () =>
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 7));
	const handleNextWeek = () =>
		setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7));

	const handleGoogleAuth = () => {
		const handleGoogleAuth = async () => {
			const clientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
			const redirectUri = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_LOCAL;
			const scope = encodeURIComponent('https://www.googleapis.com/auth/calendar.app.created');
			const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientID}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
			window.location.href = authUrl;
		};

		handleGoogleAuth();
	};

	return (
		<>
			<CardHeader className="flex flex-row items-center justify-between p-3 px-6">
				<div>
					<CardTitle className="text-sky-blue dark:text-primary-blue">{currentMonth}</CardTitle>
					<CardDescription className="pt-1 font-semibold text-slate-500 dark:text-slate-400">
						{currentYear}
					</CardDescription>
				</div>
				<div className="flex items-center justify-between gap-4 lg:flex-none">
					<div className="flex items-center">
						<div className="relative flex items-center md:items-stretch">
							<Button
								variant={'outline'}
								size={'sm'}
								onClick={period === 'month' ? handlePreviousMonth : handlePreviousWeek}
								className="rounded-none rounded-l-lg border-r-0 px-2">
								<span className="sr-only">Anterior</span>
								<IconLeft />
							</Button>
							<Button
								variant={'outline'}
								size={'sm'}
								onClick={() => setCurrentDate(new Date())}
								className="hidden rounded-none border-x-0 md:block">
								Hoje
							</Button>
							<Button
								variant={'outline'}
								size={'sm'}
								onClick={period === 'month' ? handleNextMonth : handleNextWeek}
								className="rounded-none rounded-r-lg border-l-0 px-2">
								<span className="sr-only">Próximo</span>
								<IconRight />
							</Button>
						</div>
					</div>
					<Select
						value={period}
						onValueChange={(value) => {
							setPeriod(value);
							router.push(`/app/schedule?interface=${value}`);
						}}>
						<SelectTrigger className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}>
							<SelectValue placeholder="Período" />
						</SelectTrigger>
						<SelectContent className="min-w-[1rem] font-medium">
							<SelectItem value="week">Semana</SelectItem>
							<SelectItem value="month">Mês</SelectItem>
						</SelectContent>
					</Select>
					{!userHasGoogleAuth && (
						<Button variant={'outline'} size={'sm'} onClick={handleGoogleAuth} className="flex items-center gap-2">
							<IconGoogleCalendar className="h-8 w-8" />
						</Button>
					)}
					<Suspense fallback={<div>Carregando...</div>}>
						<Register toast={handlRequestResponse} />
					</Suspense>
				</div>
			</CardHeader>

			<CardContent className="flex flex-col justify-center">
				<Suspense fallback={<div>Carregando...</div>}>
					<Calendar setPeriod={setPeriod} currentDate={currentDate} events={events} toast={handlRequestResponse} />
				</Suspense>
			</CardContent>
		</>
	);
};

export default Schedule;
