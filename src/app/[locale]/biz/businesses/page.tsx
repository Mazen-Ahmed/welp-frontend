import { BusinessesFilters, BusinessesList } from "components";
import { useTranslations } from "next-intl";
import React from "react";

const BusinessesListPage = ({ params }: { params: any }) => {
	const businessT = useTranslations("business");
	const navbarT = useTranslations("navbar");
	return (
		<div className="grid grid-cols-4 gap-5 px-10 my-10">
			<BusinessesFilters
				translation={{
					filters: businessT("filters"),
					price: businessT("price"),
					high: businessT("high"),
					medium: businessT("medium"),
					low: businessT("low"),
					expensive: businessT("expensive"),
					isOpened: businessT("isOpened"),
					suggested: businessT("suggested"),
					offersDelivery: businessT("offersDelivery"),
				}}
			/>
			<BusinessesList
				translation={{
					noResults: businessT("noResults"),
					filters: businessT("filters"),
					price: businessT("price"),
					high: businessT("high"),
					medium: businessT("medium"),
					low: businessT("low"),
					expensive: businessT("expensive"),
					isOpened: businessT("isOpened"),
					suggested: businessT("suggested"),
					offersDelivery: businessT("offersDelivery"),
					currentLocation: navbarT("currentLocation"),
				}}
			/>
		</div>
	);
};

export default BusinessesListPage;
