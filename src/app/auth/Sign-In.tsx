'use client';

import { cn } from '@/helpers/cn.util';
import { POST, request } from '@/helpers/fetch.config';
import { signinSchema } from '@/schemas/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Cookie from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, buttonVariants } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import IconReload from '../../../public/Reload.Icon';

const SignIn = ({ toast, isLoading, setIsLoading }: any) => {
	const router = useRouter();

	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	async function onSubmit(values: z.infer<typeof signinSchema>) {
		setIsLoading(true);
		const body = {
			email: values.email,
			password: values.password,
		};

		try {
			const res = await request('user/signin', POST(body));
			if (res.success === false) throw new Error(res.message);

			localStorage.clear();
			localStorage.setItem('user', JSON.stringify(res.data.user));
			Cookie.set('auth', res.data.token, { expires: 7 });

			return router.push('/app');
		} catch (Error: any) {
			toast('Erro no login', Error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="mx-auto mt-60 flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
			<div className="mb-6 flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">Conecte ao serviço</h1>
				<p className="text-muted-foreground text-sm">Insira seu e-mail e senha</p>
			</div>

			<div className="grid w-full gap-6 sm:w-full">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
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
						<Button className={cn(buttonVariants({ variant: 'gradient' }))} disabled={isLoading}>
							{isLoading && <IconReload className="mr-2 h-4 w-4 animate-spin" />}
							Entrar
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default SignIn;
