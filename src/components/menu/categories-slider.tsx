"use client";

import { Chip, TagsLoader } from "atoms";
import { CategoryType, ProductTypesType } from "interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const CategoriesSlider = ({
	active,
	data,
	loading,
	pathname,
	router,
	setActive,
	createQueryString,
	productsLoading,
	sliderRef,
}: {
	active: number | null;
	data: Array<CategoryType>;
	loading: boolean;
	productsLoading: boolean;
	pathname: string;
	router: any;
	setActive: (state: number) => void;
	createQueryString: Function;
	sliderRef: any;
}) => {
	const searchParams = useSearchParams();

	const type = searchParams.get("type");

	const loaders = useMemo(() => {
		const loaders = [];
		for (let i = 0; i < 4; i++) {
			loaders.push(<TagsLoader key={i} />);
		}
		return loaders;
	}, []);

	const chipClickHandler = (id: number) => {
		if (!productsLoading) {
			router.push(pathname + "?" + createQueryString("type", id));
		}
	};

	useEffect(() => {
		setActive(parseInt(type as string));
	}, [type]);

	return (
		<div
			ref={sliderRef}
			className="flex gap-2 overflow-auto  no-scrollbar items-center z-50 py-[16px]  mx-3 md:mx-10">
			{loading && loaders}
			{data?.map((item: ProductTypesType) => (
				<button
					onClick={() => chipClickHandler(item.id)}
					key={item.id}
					className="shrink-0 cursor-pointer">
					<Chip
						className={`${
							active === item.id
								? "bg-secondary  text-white"
								: "bg-white text-[#636363]"
						} border-gray-200 border py-2 px-4 font-medium text-base`}
						text={item.name}
					/>
				</button>
			))}
		</div>
	);
};

export default CategoriesSlider;
