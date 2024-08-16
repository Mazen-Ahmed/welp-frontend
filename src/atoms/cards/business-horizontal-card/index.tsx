"use client";

import { Chip } from "atoms";
import { BusinessType } from "interfaces";
import Image from "next/image";
import { IoIosStar, IoIosStarHalf, IoIosStarOutline } from "react-icons/io";
import { SlLocationPin } from "react-icons/sl";

const BusinessHorizontalCard = ({
	item,
	locale,
}: {
	item: BusinessType;
	locale: string;
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
		<button
			style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
			className="flex  justify-start p-[8px] gap-3 overflow-hidden rounded-[15px] my-2 bg-white cursor-pointer w-full">
			<Image
				loading="lazy"
				className=" object-fill self-center h-[114px] w-[114px] rounded-[15px]"
				src={item.cover_image}
				width={102}
				height={90}
				style={{ borderRadius: 5 }}
				alt="restaurant"
			/>
			<div className="flex flex-col items-start justify-between min-h-24 gap-1 my-1">
				<h1 className="font-bold text-start text-[12px] md:text-[18px]">
					{item.name}
				</h1>
				<div className="flex items-center flex-wrap gap-1 ">
					{ratingHandler(item.reviews_stats?.rating_score || 0)}(
					{item.reviews_stats?.reviews_count})
				</div>
				<Chip
					//@ts-ignore
					key={item?.categories[0]?.id}
					//@ts-ignore
					text={item?.categories[0].name}
					className="bg-gray-400 py-1 px-2 text-white md:text-[10px] font-normal"
				/>
				<div className="flex items-center gap-1 text-[12px] md:text-[18px]">
					<SlLocationPin className="text-red-600" />
					{item.city_name}
				</div>
			</div>
		</button>
	);
};

export default BusinessHorizontalCard;
