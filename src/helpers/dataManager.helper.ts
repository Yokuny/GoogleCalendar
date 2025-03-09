import { GET, request } from '@/helpers/fetch.config';
import { NewSchedule } from '@/schemas/schedule.schema';

export const refreshSchedule = async () => {
	const res = await request('schedule', GET());
	if (!res.success) throw new Error(res.message);

	return res.data as NewSchedule[];
};
