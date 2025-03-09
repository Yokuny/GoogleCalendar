'use client';

import { Card } from '@/components/ui/card';

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
	return (
		<main>
			<div className="mt-2 flex min-h-screen max-w-(--breakpoint-2xl) flex-col items-center justify-between gap-10 md:container md:py-10">
				<Card className="ml-0 w-full lg:max-[1480px]:ml-20">{children}</Card>
			</div>
		</main>
	);
};

export default Layout;
