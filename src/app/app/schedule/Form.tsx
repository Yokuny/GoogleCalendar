'use client';

import { refreshSchedule } from '@/helpers/dataManager.helper';
import { POST, request } from '@/helpers/fetch.config';
import { NewSchedule, scheduleSchema } from '@/schemas/schedule.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import IconClock from '../../../../public/Clock.Icon';
import IconReload from '../../../../public/Reload.Icon';

const ScheduleForm = ({ toast }: any) => {
	const router = useRouter();
	const [date, setDate] = useState<Date>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();

	const today = new Date();
	today.setDate(today.getDate() - 1);

	const handleTimeChange = useCallback(
		(time: string, setter: React.Dispatch<React.SetStateAction<Date | undefined>>) => {
			if (!date) return;
			const [hour, minute] = time.split(':');
			const selectedTime = new Date(date);
			selectedTime.setHours(parseInt(hour), parseInt(minute), 0);
			setter(selectedTime);
		},
		[date]
	);

	const form = useForm<NewSchedule>({
		resolver: zodResolver(scheduleSchema),
		defaultValues: {
			description: '',
			startTime: '',
			endTime: '',
		},
		mode: 'onChange',
	});

	useEffect(() => {
		const subscription = form.watch((value) => {
			if (value.startTime) handleTimeChange(value.startTime, setStartDate);
			if (value.endTime) handleTimeChange(value.endTime, setEndDate);
		});
		return () => subscription.unsubscribe();
	}, [form.watch, handleTimeChange, form]);

	const onSubmit = async (values: NewSchedule) => {
		setIsLoading(true);
		const createDateTime = (time: string | undefined) => {
			if (!date) return undefined;
			if (!time) return undefined;
			const [hour, minute] = time.split(':');
			const newDate = new Date(date);
			newDate.setHours(parseInt(hour), parseInt(minute), 0);
			return newDate;
		};
		const body = {
			description: values.description,
			startTime: createDateTime(values.startTime),
			endTime: createDateTime(values.endTime),
		};

		try {
			const res = await request('schedule', POST(body));
			if (res.success === false) throw new Error(res.message);
			await refreshSchedule();
			toast('Sucesso', res.message);

			form.reset();
			router.push(`/app/schedule?interface=view`);
		} catch (Error: any) {
			toast('Erro ao registrar agendamento', Error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Form {...form}>
			<form
				id="financial-form"
				onSubmit={(e) => {
					e.preventDefault();
					onSubmit(form.getValues());
				}}
				className="space-y-5">
				<div className="w-full rounded-lg border bg-slate-50 p-4 dark:bg-slate-900/70">
					<div className="flex w-full flex-wrap justify-center gap-1 rounded-lg border bg-white p-4 md:flex-nowrap md:items-start md:gap-5 md:p-8 dark:bg-slate-950">
						<div className="w-full max-w-xs md:max-w-96">
							<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
						</div>
						<div className="flex w-full justify-center gap-5 font-semibold text-slate-600 md:max-w-28 md:flex-col dark:text-slate-300">
							<div className="text-md hidden h-8 items-end gap-1 font-bold md:flex">
								<span className="text-xl">{date?.getDate() || '-'}</span>
								<span className="text-slate-600/70 dark:text-slate-300/70">
									{date?.toLocaleString('default', { weekday: 'short' }) || '-'}
								</span>
							</div>
							<FormField
								control={form.control}
								name="startTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Início</FormLabel>
										<FormControl className="w-full min-w-28">
											<div className="relative">
												<div className="pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
													<IconClock />
												</div>
												<Input
													type="time"
													min="06:00"
													max="22:00"
													tabIndex={0}
													{...field}
													disabled={isLoading || !date || date < today}
												/>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="endTime"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Término</FormLabel>
										<FormControl className="w-full min-w-28">
											<div className="relative">
												<div className="pointer-events-none absolute inset-y-0 end-0 top-0 flex items-center pe-3.5">
													<IconClock />
												</div>
												<Input
													type="time"
													min="06:00"
													max="22:00"
													tabIndex={0}
													{...field}
													disabled={isLoading || !startDate}
												/>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-semibold">Titulo</FormLabel>
										<FormControl className="w-full min-w-28">
											<Input {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</div>
				</div>
				<Button form="financial-form" type="submit" variant={'gradient'} className="mt-4 w-full" disabled={isLoading}>
					{isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
					Cadastrar
				</Button>
			</form>
		</Form>
	);
};

export default ScheduleForm;
