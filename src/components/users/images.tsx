import Image from "next/image";

const ImagesSection = () => {
	return (
		<div className="relative -mt-32  md:-mt-20 lg:-mt-52 flex items-center justify-center gap-10">
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
				className="w-64 h-64 md:max-w-[100%] md:h-[auto]"
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
