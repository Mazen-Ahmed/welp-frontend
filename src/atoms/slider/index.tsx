"use client";

import { ReactNode, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

const CustomSwiper = ({
	slidesPerView = 3,
	children,
	breakPoints,
	className,
}: {
	slidesPerView: number;
	className: string;
	children: ReactNode;
	breakPoints: Array<{}>;
}) => {
	const [domLoaded, setDomLoaded] = useState(false);

	const swiper = useSwiper();

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	return (
		<div className="py-2 md:px-10 lg:px-10 ">
			{domLoaded ? (
				<div className="container flex flex-col justify-center px-5 py-2 rounded-md min-h-96 ">
					<div className="relative z-0">
						<Swiper
							modules={[Navigation, FreeMode]}
							freeMode={true}
							navigation={{
								nextEl: `#${className}-right`,
								prevEl: `#${className}-left`,
							}}
							slidesPerView={slidesPerView}
							spaceBetween={30}
							breakpoints={breakPoints as any}
							pagination={{
								clickable: true,
							}}
							data-id={className}>
							{children}
						</Swiper>

						<div className="flex items-center justify-center gap-4 mt-6">
							<button
								id={`${className}-left`}
								className={`${
									swiper &&
									swiper.isEnd &&
									"cursor-not-allowed"
								} bg-black text-white rounded-full flex items-center justify-center p-1 arrow-left`}
								disabled={swiper && swiper.isEnd}>
								<IoIosArrowForward className="w-5 h-5" />
							</button>
							<button
								id={`${className}-right`}
								className={`${
									swiper &&
									swiper.isBeginning &&
									"cursor-not-allowed"
								} bg-black text-white rounded-full flex items-center justify-center p-1 arrow-right`}
								disabled={swiper && swiper.isBeginning}>
								<IoIosArrowBack className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4 px-5 md:px-10">
					<div className="py-2 w-full  ">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
					<div className="py-2 w-full hidden md:block  ">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
					<div className="py-2 w-full  hidden lg:block">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
					<div className="py-2 w-full  hidden lg:block">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
				</div>
			)}
		</div>
	);
};

export default CustomSwiper;
