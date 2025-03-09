import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/helpers/cn.util';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'DetalEase',
	description: 'DetalEase - A melhor plataforma de gestão de clínicas odontológicas',
	icons: {
		icon: '/favicon.svg',
		shortcut: '/favicon-16x16.png',
		apple: '/favicon.svg',
	},
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="pt-BR">
			<head />
			<body className={cn('bg-background min-h-screen font-sans antialiased', inter.className)}>
				<div className="bg-background relative flex min-h-screen flex-col">{children}</div>
				<Toaster />
			</body>
		</html>
	);
}
