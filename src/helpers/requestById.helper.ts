import { GET, request } from '@/helpers/fetch.config';
import { NewSchedule } from '@/schemas/schedule.schema';

export const requestSchedule = async (id: string) => {
	const res = await request(`schedule/${id}`, GET());
	if (res.success !== true) throw new Error(res.message);

	return res.data as NewSchedule;
};
