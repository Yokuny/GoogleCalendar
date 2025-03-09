import { cn } from '@/helpers/cn.util';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import ScheduleForm from './Form';

const NewAppointment = ({ toast }: any) => {
	const searchParams = useSearchParams();
	const financialParam = searchParams.get('interface');
	const closed = () => toast('Operação cancelada', 'O registro foi limpo');

	const [open, setOpen] = useState(false);
	useEffect(() => {
		financialParam === 'register' ? setOpen(true) : setOpen(false);
	}, [financialParam]);

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Link
					href={'/app/schedule?interface=register'}
					className={cn(buttonVariants({ variant: 'gradient', size: 'sm' }), 'w-[100px] text-xs md:text-sm')}>
					Adicionar
				</Link>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto flex w-full flex-col gap-3 p-4 md:max-w-6xl md:p-0 md:pb-4">
					<DrawerHeader>
						<DrawerTitle>Agendar</DrawerTitle>
						<DrawerDescription>Adicione um novo compromisso</DrawerDescription>
					</DrawerHeader>
					<div className="pb-0">
						<ScheduleForm toast={toast} />
					</div>
					<DrawerFooter>
						<DrawerClose asChild>
							<Link
								onClick={closed}
								href={'/app/schedule'}
								className={cn(buttonVariants({ variant: 'link' }), 'text-dark-blue w-full no-underline!')}>
								Cancelar
							</Link>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
	);
};

export default NewAppointment;
