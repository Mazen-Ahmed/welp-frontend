import { getCookie } from "cookies-next";
import { BusinessType } from "interfaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBusinessesList } from "services";
import { useBusinessesFilterStore } from "store/businesses-filters";

const useBusinessesList = () => {
	const [businesses, setBusinesses] = useState<Array<BusinessType>>([]);

	const [page, setPage] = useState<number>(1);

	const [loading, setLoading] = useState<boolean>(true);

	const [count, setCount] = useState<number>(0);

	const isOpened = useBusinessesFilterStore((state) => state.isOpened);

	const searchParams = useSearchParams();

	const category = searchParams.get("category");

	const location = JSON.parse(getCookie("location") as string);

	const priceCategory = useBusinessesFilterStore(
		(state) => state.priceCategory
	);

	const city = useBusinessesFilterStore((state) => state.city);

	const isDeliveryAvailable = useBusinessesFilterStore(
		(state) => state.isDeliveryAvailable
	);

	const categoriesToFilterWith = useBusinessesFilterStore(
		(state) => state.categoriesToFilterWith
	);

	const setIsLoading = useBusinessesFilterStore(
		(state) => state.setIsLoading
	);

	const searchKeyword = useBusinessesFilterStore(
		(state) => state.searchKeyword
	);

	const filteredCategories =
		categoriesToFilterWith?.length > 0
			? categoriesToFilterWith
			: [parseInt(category as string)];

	const finalizedSearchKeyword = searchKeyword || searchParams.get("search");

	const finalizedCity = city || parseInt(searchParams.get("city") as string);

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
				location.lat,
				location.long
			);

			setBusinesses(data.results);

			setCount(data.count);
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
		searchKeyword,
		finalizedCity,
	]);

	return {
		setPage,
		businesses,
		count,
		loading,
		page,
	};
};

export default useBusinessesList;
