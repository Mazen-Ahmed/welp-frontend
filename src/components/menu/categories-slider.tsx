"use client";

import { Chip, TagsLoader } from "atoms";
import { CategoryType, ProductTypesType } from "interfaces";
import { useMemo } from "react";

const CategoriesSlider = ({
	active,
	data,
	loading,
	pathname,
	router,
	setActive,
	createQueryString,
	productsLoading,
}: {
	active: number | null;
	data: Array<CategoryType>;
	loading: boolean;
	productsLoading: boolean;
	pathname: string;
	router: any;
	setActive: (state: number) => void;
	createQueryString: Function;
}) => {
	const loaders = useMemo(() => {
		const loaders = [];
		for (let i = 0; i < 4; i++) {
			loaders.push(<TagsLoader key={i} />);
		}
		return loaders;
	}, []);

	const chipClickHandler = (id: number) => {
		if (!productsLoading) {
			setActive(id);
			router.push(pathname + "?" + createQueryString("type", id));
		}
	};

	return (
		<div className="flex gap-4 overflow-auto py-2 no-scrollbar">
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
								: "bg-white"
						} border-gray-200 border py-2 px-4`}
						text={item.name}
					/>
				</button>
			))}
		</div>
	);
};

export default CategoriesSlider;
