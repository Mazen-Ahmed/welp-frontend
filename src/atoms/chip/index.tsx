import Image from "next/image";
import React from "react";

const Chip = ({
	text,
	icon,
	className,
}: {
	text: string;
	icon?: string;
	className?: string;
}) => {
	return (
		<div
			className={`rounded-full  flex gap-2 md:gap-1 items-center justify-center text-[10px] font-medium md:text-[15px] ${className}`}>
			<h2>{text}</h2>
			{icon && (
				<Image
					width={10}
					height={10}
					className="w-[12px] h-[12px] md:w-[16px] md:h-[16px]"
					alt="star"
					src={icon}
				/>
			)}
		</div>
	);
};

export default Chip;
