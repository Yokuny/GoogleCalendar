import Image from 'next/image';

const Banner = () => {
	return (
		<div className="bg-muted hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
			<Image
				src="/pictures/3.jpg"
				width={1080}
				height={843}
				alt="Authentication"
				className="absolute inset-0 h-full object-cover"
			/>
			<div className="relative z-20 mt-auto">
				<blockquote className="space-y-2">
					<p className="text-lg">“-”</p>
					<footer className="text-sm">Yokuny</footer>
				</blockquote>
			</div>
		</div>
	);
};

export default Banner;
