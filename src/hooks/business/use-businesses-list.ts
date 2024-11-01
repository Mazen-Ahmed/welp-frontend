import { getCookie } from "cookies-next";
import { BusinessType } from "interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBusinessesList } from "services";
import { useBusinessesFilterStore } from "store/businesses-filters";
import { useCitiesStore } from "store/cities";

const useBusinessesList = (currentLocation: string, category: any) => {
	const [businesses, setBusinesses] = useState<Array<BusinessType>>([]);

	const [page, setPage] = useState<number>(1);

	const [loading, setLoading] = useState<boolean>(true);

	const [count, setCount] = useState<number>(0);

	const isOpened = useBusinessesFilterStore((state) => state.isOpened);

	const searchParams = useSearchParams();

	const location =
		getCookie("location") && JSON?.parse(getCookie("location") as string);

	const priceCategory = useBusinessesFilterStore(
		(state) => state.priceCategory
	);

	const cities = useCitiesStore((state) => state.cities);

	const city = useBusinessesFilterStore((state) => state.city);

	const isDeliveryAvailable = useBusinessesFilterStore(
		(state) => state.isDeliveryAvailable
	);

	const nearest = useBusinessesFilterStore((state) => state.nearest);

	const categoriesToFilterWith = useBusinessesFilterStore(
		(state) => state.categoriesToFilterWith
	);

	const setSearch = useBusinessesFilterStore((state) => state.setSearch);

	const search = useBusinessesFilterStore((state) => state.search);

	const setIsLoading = useBusinessesFilterStore(
		(state) => state.setIsLoading
	);

	const searchKeyword = useBusinessesFilterStore(
		(state) => state.searchKeyword
	);

	const filteredCategories =
		categoriesToFilterWith?.length > 0
			? categoriesToFilterWith
			: [category];

	const finalizedSearchKeyword = searchKeyword || searchParams.get("search");

	const finalizedCity =
		city ||
		cities.find(
			(city) => city.name === (searchParams.get("city") as string)
		)?.id;

	const fetchBusinessesHandler = async () => {
		setLoading(true);
		setIsLoading(true);
		try {
			const data = await getBusinessesList(
				page,
				filteredCategories,
				isOpened,
				priceCategory,
				isDeliveryAvailable,
				finalizedSearchKeyword,
				finalizedCity,
				location?.lat,
				location?.long,
				nearest || searchParams.get("city") === currentLocation
			);

			setBusinesses(data.results);

			setCount(data.count);

			setSearch(false);
		} catch (error: any) {
			toast.error(error);
		} finally {
			setLoading(false);

			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (page > 1) {
			fetchBusinessesHandler();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [page]);

	useEffect(() => {
		setPage(1);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [
		isOpened,
		priceCategory,
		isDeliveryAvailable,
		categoriesToFilterWith,
		searchKeyword,
		finalizedCity,
		nearest,
	]);

	useEffect(() => {
		if (page === 1) {
			fetchBusinessesHandler();
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [
		isOpened,
		priceCategory,
		isDeliveryAvailable,
		categoriesToFilterWith,
		page,
		search,
		nearest,
	]);

	return {
		setPage,
		businesses,
		count,
		loading,
		page,
		setSearch,
	};
};

export default useBusinessesList;
