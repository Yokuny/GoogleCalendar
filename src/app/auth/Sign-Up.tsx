'use client';

import { cn } from '@/helpers/cn.util';
import { POST, request } from '@/helpers/fetch.config';
import { signupSchema } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import IconReload from '../../../public/Reload.Icon';

const SignUp = ({ toast, isLoading, setIsLoading }: any) => {
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof signupSchema>) {
		setIsLoading(true);
		const body = {
			name: values.name,
			email: values.email,
			password: values.password,
		};

		try {
			const res = await request('user/signup', POST(body));
			if (res.success === false) throw new Error(res.message);
			setIsDisabled(true);
			toast('Sucesso', res.message);
			return router.push('/auth?interface=entrar');
		} catch (Error: any) {
			setIsDisabled(false);
			toast('Erro no login', Error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="mx-auto mt-60 flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
			<div className="mb-6 flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Criar conta</h1>
				<p className="text-muted-foreground text-sm">Insira seu e-mail abaixo para se cadastrar.</p>
			</div>
			<div className="grid w-full gap-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Nome de usuário"
											type="text"
											autoCapitalize="none"
											className="h-12"
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Email"
											type="email"
											autoCapitalize="none"
											autoComplete="email"
											autoCorrect="off"
											className="h-12"
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											placeholder="Password"
											type="password"
											autoCapitalize="none"
											autoComplete="password"
											autoCorrect="off"
											className="h-12"
											disabled={isLoading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className={cn(buttonVariants({ variant: 'gradient' }))} disabled={isLoading || isDisabled}>
							{isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
							Entrar
						</Button>
					</form>
				</Form>
			</div>
			<p className="text-muted-foreground px-8 text-center text-sm sm:w-[450px]">
				Ao clicar em continuar, você está concordando com nossos{' '}
				<Link href="/terms" className="hover:text-primary underline underline-offset-4">
					Termos de serviço
				</Link>{' '}
				e{' '}
				<Link href="/privacy" className="hover:text-primary underline underline-offset-4">
					Politica de privacidade
				</Link>
				.
			</p>
		</div>
	);
};

export default SignUp;
