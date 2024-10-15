"use client";

import { BusinessCard, CustomSwiper } from "atoms";
import { BusinessType } from "interfaces";
import Link from "next/link";
import React from "react";
import { SwiperSlide } from "swiper/react";

const Featured = ({
	featuredBusinesses,
	translation,
	locale,
}: {
	featuredBusinesses: Array<BusinessType>;
	translation: any;
	locale: string;
}) => {
	const breakpoints = {
		200: {
			slidesPerView: 1,
		},
		700: {
			slidesPerView: 2,
		},
		1000: {
			slidesPerView: 4,
		},
	};

	return (
		<div className="mb-[24px] md:mb-10 md:min-h-[80vh]">
			<h1 className="text-center text-black text-3xl font-bold">
				{translation.featuredBusinesses}
			</h1>

			<CustomSwiper
				breakPoints={breakpoints as any}
				slidesPerView={4}
				className="featuredSwiper">
				{featuredBusinesses?.map((item) => (
					<SwiperSlide
						className="py-2 w-full md:w-1/3 px-5"
						key={item.id}>
						<Link href={`/biz/${item.slug || item.id}`}>
							<BusinessCard
								withBackground
								item={item}
								locale={locale}
							/>
						</Link>
					</SwiperSlide>
				))}
			</CustomSwiper>
		</div>
	);
};

export default Featured;
