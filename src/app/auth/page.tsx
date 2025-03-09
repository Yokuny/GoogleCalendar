'use client';
import { cn } from '@/helpers/cn.util';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import PreviousPage from './Previous-Page';
import SignIn from './Sign-In';
import SignUp from './Sign-Up';

const loginParamValues = ['entrar', 'cadastro'];

const AuthenticationPage = () => {
	const searchParams = useSearchParams();
	const loginParam = searchParams.get('interface');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const { toast } = useToast();
	const handlResponse = (title: string, message: string) => toast({ title: title, description: message });

	return (
		<>
			<Link
				href={
					isLoading
						? '#'
						: {
								search: `?interface=${loginParamValues.find((value) => value !== loginParam) || 'entrar'}`,
							}
				}
				className={cn(buttonVariants({ variant: 'gradient' }), 'absolute top-6 right-6 w-28 md:top-10 md:right-10')}>
				{loginParam === 'entrar' ? 'Cadastrar' : 'Entrar'}
			</Link>
			<div className="mb-10 flex h-full flex-col justify-between lg:p-8">
				<div className="flex justify-center">
					{loginParam === 'entrar' ? (
						<SignIn toast={handlResponse} isLoading={isLoading} setIsLoading={setIsLoading} />
					) : (
						<SignUp toast={handlResponse} isLoading={isLoading} setIsLoading={setIsLoading} />
					)}
				</div>
				<div className="flex w-full justify-center">
					<PreviousPage isLoading={isLoading} />
				</div>
			</div>
		</>
	);
};

export default AuthenticationPage;
