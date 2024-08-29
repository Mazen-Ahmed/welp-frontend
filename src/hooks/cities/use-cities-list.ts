import { CityType } from "interfaces";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import { getCitiesList } from "services";
import { useCitiesStore } from "store/cities";

const useCitiesList = () => {
	const [loading, setLoading] = useState(true);

	const [data, setData] = useState<Array<CityType>>([]);

	const { cities: citiesList, setCities } = useCitiesStore((state) => state);

	const locale = useLocale();

	const listCitiesAction = () => {
		setLoading(true);
		getCitiesList()
			.then((res) => {
				setData(res?.data);

				setCities(res?.data);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	useEffect(() => {
		listCitiesAction();
	}, [locale]);

	return {
		data,
		loading,
	};
};

export default useCitiesList;
