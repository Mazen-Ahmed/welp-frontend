"use client";

import { CustomSwiper } from "atoms";
import { SwiperSlide } from "swiper/react";

const Cities = () => {
	const breakpoints = {
		200: {
			slidesPerView: 2,
		},
		700: {
			slidesPerView: 3,
		},
		1000: {
			slidesPerView: 4,
		},
	};

	const cities = [
		{ name: "Cairo", img: "/cairo.jpg" },
		{ name: "Giza", img: "/giza.jpg" },
		{ name: "Hurghada", img: "/hurghada.jpg" },
		{ name: "Alexandria", img: "/alex.jpg" },
		{ name: "Sainai", img: "/sainai.jpg" },
	];

	return (
		<div className="bg-gray-200 py-4 ">
			<div>
				<h1 className="text-center text-black text-3xl font-bold">
					Cities
				</h1>

				<CustomSwiper
					className="citiesSwiper"
					breakPoints={breakpoints as any}
					slidesPerView={4}>
					{cities.map((item, index) => (
						<SwiperSlide className="py-2" key={index}>
							<div
								className={`${
									index % 2 !== 0 ? "h-96" : "h-72"
								} w-11/12 flex items-start justify-center  rounded-3xl border border-yellow-500 border-solid text-xl font-semibold text-white
                                `}
								style={{
									background: ` url(${item.img})`,
									backgroundRepeat: "no-repeat",
									backgroundSize: "100% 100%",
									backgroundPosition: "center",
								}}>
								{item.name}
							</div>
						</SwiperSlide>
					))}
				</CustomSwiper>
			</div>
		</div>
	);
};

export default Cities;
