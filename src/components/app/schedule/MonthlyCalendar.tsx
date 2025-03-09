import { cn } from '@/helpers';
import { NewSchedule } from '@/schemas/schedule.schema';

const MonthlyCalendar = ({ toast, currentDate, events }: any) => {
	return (
		<>
			<div className="border-y lg:flex lg:flex-auto lg:flex-col">
				<div className="grid grid-cols-7 gap-px border-b bg-gray-200 text-center text-xs font-semibold text-slate-700 lg:flex-none dark:bg-gray-700 dark:text-slate-300">
					{['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, index) => (
						<div key={`month-header-${index}`} className="flex justify-center bg-white py-2 dark:bg-slate-950">
							<span>{day}</span>
							<span className="sr-only sm:not-sr-only">{['om', 'eg', 'er', 'ua', 'ui', 'ex', 'ab'][index]}</span>
						</div>
					))}
				</div>

				<div className="flex bg-gray-200 text-xs leading-3 text-slate-800 lg:flex-auto dark:bg-gray-700 dark:text-slate-200">
					<div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
						{Array.from({ length: 42 }).map((_, index) => {
							const date = new Date(
								currentDate.getFullYear(),
								currentDate.getMonth(),
								index - new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 1
							);
							const isCurrentMonth = date.getMonth() === currentDate.getMonth();
							const isToday = date.toDateString() === new Date().toDateString();

							const dayEvents = events?.length
								? events.filter((e: NewSchedule) => new Date(e.startTime).toDateString() === date.toDateString())
								: [];

							return (
								<div
									key={`month-square-${index}`}
									className={cn(
										'relative h-36 px-3 py-2 ring-1 ring-slate-200 dark:ring-slate-800',
										isCurrentMonth ? 'bg-white dark:bg-slate-950' : 'bg-gray-50 text-gray-500 dark:bg-slate-900'
									)}>
									<time
										dateTime={date.toISOString().split('T')[0]}
										className={cn(
											isToday
												? 'bg-sky-blue dark:bg-dark-blue flex h-6 w-6 items-center justify-center rounded-full font-bold text-white dark:text-slate-200'
												: ''
										)}>
										{date.getDate()}
									</time>

									{dayEvents.length > 0 && (
										<ol className="mt-2">
											{dayEvents.map((event: NewSchedule, eventIndex: number) => (
												<li key={`month-event-${index}-${eventIndex}`}>
													<p className="group-hover:text-sky-blue flex-auto truncate text-xs font-medium text-gray-900 dark:text-slate-200">
														{event.description}
													</p>
													<div className="flex gap-2">
														<time
															dateTime={event.startTime}
															className="group-hover:text-sky-blue hidden flex-none text-gray-500 xl:block">
															{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
														</time>
														{event.endTime && (
															<time
																dateTime={event.endTime}
																className="group-hover:text-sky-blue hidden flex-none text-gray-500 xl:block">
																{new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
															</time>
														)}
													</div>
												</li>
											))}
										</ol>
									)}
								</div>
							);
						})}
					</div>

					<div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
						{Array.from({ length: 42 }).map((_, index) => {
							const date = new Date(
								currentDate.getFullYear(),
								currentDate.getMonth(),
								index - new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 1
							);
							const isCurrentMonth = date.getMonth() === currentDate.getMonth();
							const isToday = date.toDateString() === new Date().toDateString();

							const dayEvents = events?.length
								? events.filter((e: NewSchedule) => new Date(e.startTime).toDateString() === date.toDateString())
								: [];

							return (
								<button
									key={`month-mobile-day-${index}`}
									className={cn(
										'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10 dark:hover:bg-slate-900',
										isToday ? 'text-sky-blue" font-semibold' : 'text-gray-900 dark:text-slate-300',
										isCurrentMonth
											? 'bg-white dark:bg-slate-950'
											: 'bg-gray-50 text-gray-500 dark:bg-slate-900 dark:text-gray-500'
									)}>
									<time
										dateTime={date.toISOString().split('T')[0]}
										className={cn(
											'ml-auto',
											isToday
												? 'bg-sky-blue dark:bg-dark-blue flex h-6 w-6 items-center justify-center rounded-full text-white dark:text-slate-200'
												: ''
										)}>
										{date.getDate()}
									</time>
									{dayEvents.length > 0 && (
										<span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
											{dayEvents.map((event: NewSchedule, eventIndex: number) => (
												<span
													key={`month-mobile-event-${index}-${eventIndex}`}
													className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"></span>
											))}
										</span>
									)}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default MonthlyCalendar;
