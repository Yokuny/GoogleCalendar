import { cn } from '@/helpers/cn.util';
import * as React from 'react';

function Input({ className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				'flex h-9 w-full rounded-md border border-slate-300 bg-transparent px-3 py-1 text-sm shadow-xs transition-colors',
				'file:border-0 file:bg-transparent file:text-sm file:font-medium',
				'focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:outline-hidden',
				'disabled:cursor-not-allowed disabled:opacity-50',
				'dark:border-slate-700 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300',
				className
			)}
			{...props}
		/>
	);
}

export { Input };
