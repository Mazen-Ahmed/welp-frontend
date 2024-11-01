"use client";

import BusinessesFiltersContent from "./businesses-filters-content";
import { useGetCategory } from "hooks";
import { CategoryType } from "interfaces";
import { useSearchParams } from "next/navigation";

const BusinessesFilters = ({
	translation,
	category,
}: {
	translation: any;
	category?: CategoryType;
}) => {
	const params = useSearchParams();

	const id = params.get("category");

	useGetCategory(id as string);

	return (
		<div className="col-span-1 hidden lg:block bg-gray-businesses shadow-md w-full h-screen rounded-3xl p-3 sticky top-0">
			<BusinessesFiltersContent
				category={category}
				translation={{
					filters: translation.filters,
					price: translation.price,
					high: translation.high,
					medium: translation.medium,
					low: translation.low,
					expensive: translation.expensive,
					isOpened: translation.isOpened,
					suggested: translation.suggested,
					offersDelivery: translation.offersDelivery,
				}}
			/>
		</div>
	);
};

export default BusinessesFilters;
