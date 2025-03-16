'use client';

import { POST, request } from '@/helpers/fetch.config';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import IconCheck from '../../../../../public/Check.Icon';
import IconReload from '../../../../../public/Reload.Icon';
import IconGoogleCalendar from '../../../../../public/google-calendar-svgrepo-com';

const GoogleAuth = () => {
	const router = useRouter();
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

	const { toast } = useToast();
	const handlRequestResponse = useCallback(
		(title: string, message: string) => toast({ title: title, description: message }),
		[toast]
	);

	useEffect(() => {
		const registerGoogleAuth = async () => {
			const search = window.location.search;
			const code = new URLSearchParams(search).get('code');

			if (search.includes('error=')) {
				setStatus('error');
				handlRequestResponse('Erro', 'Falha na autenticação com o Google. Por favor, tente novamente.');
				return;
			}

			try {
				if (!code) throw new Error('Código de autorização não encontrado. Por favor, tente novamente.');
				const decodedCode = decodeURIComponent(code);

				const res = await request('user/google/token', POST({ token: decodedCode }));
				if (!res.success) throw new Error(res.message);

				window.history.pushState('', document.title, window.location.pathname);
				setStatus('success');
				setTimeout(() => {
					router.push('/app/schedule');
				}, 1500);
			} catch (error: any) {
				handlRequestResponse('Erro', error.message);
				setStatus('error');
			}
		};
		registerGoogleAuth();
	}, [router]);

	return (
		<div className="space-y-3 bg-slate-50 p-4 dark:bg-slate-900/70">
			<div className="flex h-screen w-full flex-col items-center justify-center gap-2 md:h-[84vh]">
				<span className="flex items-center gap-2">
					<IconGoogleCalendar className="h-14 w-14" />
					<h2 className="text-2xl font-semibold text-gray-700">Google</h2>
					<p className="text-2xl text-gray-500">Calendar</p>
				</span>

				{status === 'loading' && (
					<div className="flex flex-col items-center justify-center gap-3 rounded-lg border bg-white p-4 px-10 dark:bg-slate-950">
						<p className="text-sm text-gray-500">Autenticando com Google Calendar...</p>
						<div className="flex items-center justify-center">
							<IconReload className="h-6 w-6 animate-spin" />
						</div>
					</div>
				)}

				{status === 'success' && (
					<div className="flex flex-col items-center justify-center gap-3 rounded-lg border bg-white p-4 px-10 dark:bg-slate-950">
						<p className="text-sm text-gray-500">Autenticação concluída com sucesso!</p>
						<div className="flex items-center justify-center">
							<IconCheck className="h-6 w-6 text-green-500" />
						</div>
					</div>
				)}

				{status === 'error' && (
					<div className="flex flex-col items-center justify-center gap-3 rounded-lg border bg-white p-4 px-10 dark:bg-slate-950">
						<p className="text-sm text-gray-500">Falha na autenticação com o Google Calendar.</p>
						<Button variant={'primary'} onClick={() => router.push('/app/schedule')}>
							Voltar para Agenda
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default GoogleAuth;
