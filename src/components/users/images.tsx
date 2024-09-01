import Image from "next/image";

const ImagesSection = () => {
	return (
		<div className="relative -mt-20 md:-mt-32 lg:-mt-56 flex items-center justify-center gap-10">
			<Image
				src="/iPhone.svg"
				width={200}
				height={200}
				alt="iphone"
				className="hidden md:block"
			/>
			<Image
				src="/iPhone.svg"
				width={250}
				height={300}
				alt="iphone"
				className="w-56 h-56 md:max-w-[100%] md:h-[auto]"
			/>
			<Image
				src="/iPhone.svg"
				width={200}
				height={200}
				alt="iphone"
				className="hidden md:block"
			/>
		</div>
	);
};

export default ImagesSection;
