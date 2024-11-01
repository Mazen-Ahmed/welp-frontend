"use client";

import { useLocale } from "next-intl";
import { ReactNode, useEffect, useState, memo } from "react";
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
	const [isBeginning, setIsBeginning] = useState(true);
	const [isEnd, setIsEnd] = useState(false);

	const locale = useLocale();

	useEffect(() => {
		setDomLoaded(true);
	}, []);

	const handleSwiper = (swiperInstance: any) => {
		// Update the state of navigation arrows
		setIsBeginning(swiperInstance.isBeginning);
		setIsEnd(swiperInstance.isEnd);
	};

	return (
		<div className="py-2 md:px-10 lg:px-10 w-full ">
			{domLoaded ? (
				<div className="flex flex-col justify-center py-2 rounded-md min-h-96 w-full">
					<div className="relative z-0">
						<Swiper
							dir={locale === "ar" ? "rtl" : "ltr"}
							modules={[Navigation, FreeMode]}
							freeMode={false}
							navigation={{
								nextEl: `#${className}-right`,
								prevEl: `#${className}-left`,
							}}
							slidesPerView={slidesPerView}
							spaceBetween={30}
							breakpoints={breakPoints as any}
							pagination={{ clickable: true }}
							data-id={className}
							onSlideChange={handleSwiper}
							onSwiper={handleSwiper}>
							{children}
						</Swiper>

						<div className="flex items-center justify-center gap-4 mt-6">
							<button
								id={`${className}-left`}
								className={`${
									isBeginning
										? "opacity-50 cursor-not-allowed"
										: "opacity-100 cursor-pointer"
								} bg-black text-white rounded-full flex items-center justify-center p-1 arrow-left`}
								disabled={isBeginning}>
								<IoIosArrowForward
									className={`w-5 h-5 ${
										locale === "en" && "rotate-180"
									}`}
								/>
							</button>
							<button
								id={`${className}-right`}
								className={`${
									isEnd
										? "opacity-50 cursor-not-allowed"
										: "opacity-100 cursor-pointer"
								} bg-black text-white rounded-full flex items-center justify-center p-1 arrow-right`}
								disabled={isEnd}>
								<IoIosArrowBack
									className={`w-5 h-5 ${
										locale === "en" && "rotate-180"
									}`}
								/>
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-5 px-5 md:px-10">
					<div className="py-2 w-full">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
					<div className="py-2 w-full hidden md:block">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
					<div className="py-2 w-full hidden lg:block">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
					<div className="py-2 w-full hidden lg:block">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
					<div className="py-2 w-full hidden max-xl:block">
						<div className="w-full h-80 rounded-md animate-pulse bg-gray-100" />
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(CustomSwiper);
