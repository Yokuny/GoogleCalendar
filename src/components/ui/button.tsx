import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/helpers/cn.util';

const buttonVariants = cva(
	'inline-flex items-center font-medium justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300 cursor-pointer',
	{
		variants: {
			variant: {
				default: 'bg-primary-blue hover:bg-dark-blue saturate-150 font-semibold text-white shadow-sm',
				primary:
					'hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-700 text-slate-950 dark:text-slate-200 hover:text-black dark:hover:text-white placeholder:text-black dark:placeholder:text-white border border-slate-200 dark:border-slate-700 shadow-2xs data-[state=on]:bg-primary-blue data-[state=on]:text-white data-[state=on]:border-transparent',
				secondary:
					'bg-sky-blue hover:bg-sky-blue/80 dark:bg-sky-800 dark:hover:bg-sky-700 saturate-150 font-semibold text-white shadow-xs',
				basic:
					'bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-900 hover:bg-slate-100 border border-slate-100 dark:border-slate-800',
				outline: 'bg-white dark:bg-slate-950 hover:bg-muted dark:hover:bg-muted border font-semibold shadow-xs',

				destructive: 'bg-red-500 hover:bg-red-600 text-white shadow-xs',
				success: 'bg-green-500 hover:bg-green-600 text-white shadow-xs',
				info: 'bg-blue-500 hover:bg-blue-600 text-white shadow-xs',
				warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-xs',

				gradient:
					'bg-linear-to-r from-sky-blue to-primary-blue dark:from-dark-blue dark:to-blue-700 shadow-xs hover:saturate-150 text-dark-blue dark:text-blue950 font-semibold text-white',

				blank: 'p-0!',
				link: 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900 underline-offset-4 hover:underline',
				glassy:
					'bg-white/20 hover:bg-white/30 text-slate-950 dark:text-white border border-white/30 hover:border-slate-200 shadow-xs backdrop-blur-xs',
			},
			size: {
				default: 'h-9 px-4 py-2',
				sm: 'h-8 rounded-md px-3 text-xs',
				lg: 'h-10 rounded-md px-8',
				icon: 'h-9 w-9',
				'icon-sm': 'h-7 w-7',
				'icon-md': 'md:h-10 md:w-10 h-8 w-7',
				'icon-lg': 'h-12 w-12',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
	const Comp = asChild ? Slot : 'button';
	return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }), '')} {...props} />;
}
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

export { Button, buttonVariants };
