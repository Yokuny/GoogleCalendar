'use client';

import { cn } from '@/helpers/cn.util';
import { ptBR } from 'date-fns/locale';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { buttonVariants } from '@/components/ui/button';
import IconLeft from '../../../public/Left.Icon';
import IconRight from '../../../public/Right.Icon';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, ...props }: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={true}
			locale={ptBR}
			className={cn('p-3', className)}
			classNames={{
				months: 'space-y-4 sm:space-x-4 sm:space-y-0 flex-col sm:flex-row flex',
				month: 'space-y-4',
				caption: 'flex justify-center pt-1 relative items-center',
				caption_label: 'text-sm font-medium dark:text-slate-200 text-slate-700',
				nav: 'space-x-1 flex items-center',
				nav_button: cn(buttonVariants({ variant: 'link' }), 'h-7 w-9 p-0 text-black dark:text-white'),
				nav_button_previous: 'absolute left-1',
				nav_button_next: 'absolute right-1',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex justify-between px-2',
				head_cell: 'font-normal text-[0.8rem]',
				row: 'w-full mt-2 flex gap-1',
				cell: cn(
					'relative md:p-[2px] p-0 text-center text-sm rounded-md focus-within:relative focus-within:z-20 [&:has([aria-selected].day-outside)]:bg-slate-200/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected].day-outside)]:bg-slate-700/50',
					props.mode === 'range'
						? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
						: '[&:has([aria-selected])]:rounded-md'
				),
				day: cn(
					buttonVariants({ variant: 'link' }),
					'font-mono border h-10 w-10 p-5 hover:bg-slate-50 dark:hover:bg-slate-700 font-normal text-slate-700 dark:text-slate-200 hover:no-underline'
				),
				day_range_start: 'day-range-start',
				day_range_end: 'day-range-end',
				day_selected:
					'text-slate-50! focus:text-slate-50! bg-primary-blue hover:bg-primary-blue focus:bg-primary-blue aria-selected:text-slate-50',
				day_today: 'text-sky-blue dark:text-primary-blue! font-semibold!',
				day_outside:
					'day-outside text-slate-300 opacity-20 dark:opacity-60 aria-selected:bg-slate-100/50 aria-selected:text-slate-900 aria-selected:opacity-50 dark:text-slate-500 dark:aria-selected:bg-slate-800/50 dark:aria-selected:text-slate-300',
				day_disabled: 'text-slate-400 opacity-50 dark:text-slate-300',
				day_range_middle:
					'aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50',
				day_hidden: 'invisible',
				...classNames,
			}}
			components={{
				IconLeft: () => <IconLeft className="h-3 w-3" />,
				IconRight: () => <IconRight className="h-3 w-3" />,
			}}
			{...props}
		/>
	);
}
Calendar.displayName = 'Calendario';

export { Calendar };
