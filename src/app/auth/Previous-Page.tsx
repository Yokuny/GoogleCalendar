'use client';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import IconBack from '../../../public/Back.Icon';

const PreviousPageBtn = ({ isLoading }: { isLoading: boolean }) => {
	const router = useRouter();
	const previousPage = () => router.back();

	return (
		<Button
			disabled={isLoading}
			onClick={previousPage}
			variant={'gradient'}
			className="group flex w-full gap-8 sm:w-[350px]">
			Voltar
			<IconBack className="h-4 w-4 group-hover:animate-pulse" />
		</Button>
	);
};

export default PreviousPageBtn;
