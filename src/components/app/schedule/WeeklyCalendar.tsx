import { cn } from '@/helpers/cn.util';
import { NewSchedule } from '@/schemas/schedule.schema';

import { ScrollArea } from '@/components/ui/scroll-area';
import IconDot from '../../../../public/Dot.Icon';

const WeeklyCalendar = ({ toast, currentDate, events }: any) => {
	const findEventForDayAndHour = (events: NewSchedule[] | null, currentDate: Date, dayIndex: number, hour: number) => {
		if (!Array.isArray(events) || events.length === 0) {
			return null;
		}
		const event = events.find((event) => {
			const eventStart = new Date(event.startTime);
			return eventStart.getDate() === currentDate.getDate() + dayIndex - 1 && eventStart.getHours() === hour;
		});
		return event;
	};

	return (
		<div className="relative border-y">
			<div className="sticky top-0 left-0 grid w-full grid-cols-[39px_repeat(7,1fr)] gap-px bg-gray-200 text-center text-xs font-semibold text-slate-700 dark:bg-gray-700 dark:text-slate-300">
				<div className="flex items-center justify-center bg-white py-2 dark:bg-slate-950"></div>
				{Array.from({ length: 7 }).map((_, index) => {
					const date = new Date(currentDate);
					date.setDate(currentDate.getDate() + index);
					const isToday = date.toDateString() === new Date().toDateString();
					return (
						<span
							key={`week-header-${index}`}
							className={cn(
								'flex items-center justify-center bg-white py-2 dark:bg-slate-950',
								isToday ? 'text-primary-blue' : ''
							)}>
							<span className="hidden sm:block">
								{date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}
							</span>
							{/* Subistituir para um component proprio para lista diaria */}
							<span className="block sm:hidden">{date.toLocaleDateString('pt-BR', { day: 'numeric' })}</span>
						</span>
					);
				})}
			</div>

			<ScrollArea className="w-full md:h-[calc(100vh-21rem)]">
				<div className="hidden w-full grid-cols-[39px_repeat(7,1fr)] gap-px overflow-x-auto bg-gray-200 text-slate-800 sm:grid dark:bg-gray-800 dark:text-slate-200">
					{Array.from({ length: 8 }).map((_, dayIndex) => (
						<div key={`week-square-${dayIndex}`}>
							{Array.from({ length: 14 }).map((_, hourIndex) => {
								const hour = 6 + hourIndex;
								const event = findEventForDayAndHour(events, currentDate, dayIndex, hour);
								return dayIndex === 0 ? (
									<div
										key={`week-hour-${hourIndex}`}
										className="flex h-32 items-end justify-center border-t bg-white text-xs text-gray-400 md:py-1 lg:h-28 dark:bg-slate-950 dark:hover:bg-slate-900">
										{hour}
										{hour < 12 ? 'AM' : 'PM'}
									</div>
								) : (
									<div
										key={`week-event-${hourIndex}-${dayIndex}`}
										className="h-32 border-t border-gray-200 bg-white p-1 font-medium hover:bg-gray-50 lg:h-28 dark:border-gray-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:bg-slate-900">
										<div className={'group p-0.5 pl-1 text-xs'}>
											<p className="group-hover:text-sky-blue text-start">{event?.description}</p>
											<time
												dateTime={event?.startTime}
												className="text-primary-blue group-hover:text-sky-blue flex items-center gap-1 leading-4 font-semibold">
												{event && (
													<>
														<span>
															{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
														</span>
														<IconDot />
														{event?.endTime && (
															<span>
																{new Date(event?.endTime).toLocaleTimeString([], {
																	hour: '2-digit',
																	minute: '2-digit',
																})}
															</span>
														)}
													</>
												)}
											</time>
										</div>{' '}
									</div>
								);
							})}
						</div>
					))}
				</div>
				{/* Subistituir para um component proprio para lista diaria */}
				<div className="flex w-full items-center border-t border-gray-200 sm:hidden">
					<div className="flex flex-col">
						{Array.from({ length: 14 }).map((_, hourIndex) => {
							const hour = 6 + hourIndex;
							return (
								<div
									key={`week-row-mobile-${hourIndex}`}
									className="flex h-20 w-10 items-end border-r border-b border-gray-200 bg-white p-2 text-xs font-semibold text-gray-400 dark:bg-slate-950 dark:hover:bg-slate-900">
									{hour} {hour < 12 ? 'AM' : 'PM'}
								</div>
							);
						})}
					</div>
					<div className="grid w-full grid-cols-1">
						{Array.from({ length: 14 }).map((_, hourIndex) => {
							const hour = 6 + hourIndex;
							if (!events || !Array.isArray(events)) return null;

							const event = events.find((event) => {
								if (!event?.startTime) return false;
								const eventStart = new Date(event.startTime);
								return eventStart.getDate() === currentDate.getDate() && eventStart.getHours() === hour;
							});

							return (
								<div key={`week-event-mobile-${hourIndex}`} className="h-20 w-full border-b border-gray-200 p-1.5">
									{event && (
										<div className="border-sky-blue h-full w-full rounded border-l-2 bg-gray-50 p-1.5 dark:bg-slate-900">
											<div>
												<p className="text-start text-xs font-normal text-gray-900">{event.patient}</p>
												<p className="text-xs leading-4 font-semibold">
													{new Date(event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -{' '}
													{event.endTime
														? new Date(event.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
														: '...'}
												</p>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			</ScrollArea>
		</div>
	);
};

export default WeeklyCalendar;
