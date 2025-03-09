import { cn } from '@/helpers/cn.util';
import * as React from 'react';

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div data-slot="card" className={cn('bg-card border shadow-sm md:rounded-md', className)} {...props} />;
}

function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			data-slot="card-header"
			className={cn('flex flex-col p-4 pb-2 md:space-y-1.5 md:p-6 md:pb-4', className)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h3
			data-slot="card-title"
			className={cn('text-lg leading-none font-semibold tracking-tight', className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			data-slot="card-description"
			className={cn('text-muted-foreground hidden font-mono text-xs tracking-tighter md:block', className)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div data-slot="card-content" className={className} {...props} />;
}

function CardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
	return <div data-slot="card-footer" className={cn('flex items-center p-6 pt-0', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
