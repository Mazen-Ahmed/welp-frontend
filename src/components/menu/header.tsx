"use client";

import { Chip } from "atoms";
import { Link } from "navigation";
import Image from "next/image";
import { getOpenedHourHandler } from "utils";

const BusinessHeader = ({ business }: any) => {
	const {
		slug,
		name,
		cover_image,
		description,
		reviews_stats,
		categories,
		is_opened,
		opening_hours,
	} = business;

	return (
		<div className="flex gap-2 bg-gray-50 p-3 my-4 md:px-10 ">
			<Image
				className="rounded-md object-cover w-32 h-36"
				src={cover_image}
				height={100}
				width={150}
				alt="business"
			/>
			<div className="w-full flex-1 flex flex-col gap-4">
				<div className="flex justify-between gap-1">
					<Link
						href={`/biz/${slug}`}
						className="text-black font-extrabold text-[16px]">
						{name}
					</Link>

					{!!reviews_stats.rating_score && (
						<div className="flex items-center justify-center gap-1 rounded-full h-[20px] w-[50px] px-[5px] bg-secondary text-white">
							<h2 className="text-[12px] font-[400] md:text-[15px]">
								{reviews_stats.rating_score}
							</h2>
							<Image
								width={12}
								height={12}
								className="w-[12px] h-[12px] md:w-[16px] md:h-[16px]"
								alt="star"
								src="/star-icon.png"
							/>
						</div>
					)}
				</div>
				<div>
					<p className="text-gray-600 text-sm">{description}</p>
				</div>

				<div className="flex flex-wrap gap-1">
					{categories.map((category: any) => (
						<Chip
							key={category.id}
							text={category.name}
							icon={category.icon}
							className="bg-white border-gray-200 border py-2 px-4"
						/>
					))}
				</div>

				{is_opened ? (
					<div className="flex  gap-1 text-xs md:text-md">
						<p className="text-success font-bold">مفتوح الأن</p>
						<p className="text-black">
							يغلق عند الساعة&nbsp;
							{getOpenedHourHandler(opening_hours, false)}
						</p>
					</div>
				) : (
					<div className="flex  gap-1 text-xs md:text-md">
						<p className="text-red-500 font-bold">مغلق</p>
						<p className="text-black">
							يفتح عند الساعة&nbsp;
							{getOpenedHourHandler(opening_hours, true)}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default BusinessHeader;
