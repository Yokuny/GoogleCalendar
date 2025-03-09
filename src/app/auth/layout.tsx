import { Metadata } from 'next';
import { Suspense } from 'react';

import Banner from './Banner';

export const metadata: Metadata = {
	title: 'Autenticação',
	description: 'Página de cadastro e autenticação de usuário.',
};

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="relative container grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
			<Banner />
			<Suspense fallback={<div>Carregando...</div>}>{children}</Suspense>
		</div>
	);
}
