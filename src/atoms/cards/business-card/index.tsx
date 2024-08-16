import { Chip } from "atoms";
import { BusinessType } from "interfaces";
import Image from "next/image";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";

const BusinessCard = ({
	item,
	locale = "ar",
	withBackground,
	className,
}: {
	item: BusinessType;
	locale: string;
	withBackground?: boolean;
	className?: string;
}) => {
	const ratingHandler = (rate: number) => {
		const stars = [];

		for (let i = 1; i <= 5; i++) {
			if (rate >= i) {
				stars.push(<IoIosStar className="text-yellow-500" key={i} />);
			} else if (rate >= i - 0.5) {
				stars.push(
					<IoIosStarHalf
						className={`text-yellow-500 ${
							locale === "ar" && "rotate-[215deg] "
						}`}
						key={i}
					/>
				);
			} else {
				stars.push(<IoIosStarOutline key={i} />);
			}
		}

		return stars;
	};

	return (
		<div
			className={`${
				withBackground && "bg-white shadow-md"
			}  rounded-md w-full h-80 cursor-pointer overflow-hidden hover:scale-95 duration-200 ${className}`}>
			<Image
				loading="lazy"
				alt={item.name}
				src={item.cover_image || "/header.png"}
				width={250}
				height={150}
				className={`object-cover w-full h-48 `}
			/>
			<div className="flex justify-between items-center px-2 mt-2">
				<h1 className="text-sm font-bold w-60 overflow-hidden text-ellipsis whitespace-nowrap text-animation">
					{item.name}
				</h1>
			</div>
			<div className="flex items-center flex-wrap gap-2 px-3 py-1">
				{ratingHandler(item.reviews_stats?.rating_score || 0)}(
				{item.reviews_stats?.reviews_count})
			</div>
			<div className="flex flex-wrap gap-2 px-3 py-1">
				{item.categories.map((category: any) => (
					<Chip
						key={category?.id}
						text={category.name}
						className="bg-gray-400 py-1 px-2 text-white !md:text-[10px] !text-[10px] font-normal"
					/>
				))}
			</div>
			<div className="flex items-center gap-1 px-3 py-1">
				<SlLocationPin className="text-red-600" />
				{item.city_name}
			</div>
		</div>
	);
};

export default BusinessCard;
