import { lengthMessage } from '@/helpers/zodMessage.helper';
import { z } from 'zod';

export const scheduleSchema = z.object({
	description: z.string().min(5, lengthMessage(5, 50)).max(50, lengthMessage(5, 50)),
	startTime: z.string().datetime(),
	endTime: z.string().datetime().optional(),
});

export type NewSchedule = z.infer<typeof scheduleSchema>;
