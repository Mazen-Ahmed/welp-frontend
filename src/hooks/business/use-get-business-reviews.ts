import { ReviewType } from "interfaces";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getBusinessReviews } from "services";

const useBusinessReviewsList = (businessSlug: string) => {
	const [reviews, setReviews] = useState<Array<ReviewType>>([]);
	const [page, setPage] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(true);
	const [count, setCount] = useState<number>(0);

	const fetchReviewsHandler = async () => {
		setLoading(true);
		try {
			const data = await getBusinessReviews(businessSlug, page);

			console.log(data, "dt");

			setCount(data.count);

			setReviews(data.results);

			setLoading(false);
		} catch (error: any) {
			toast.error(error.response.data.message);
		}
	};

	useEffect(() => {
		fetchReviewsHandler();
	}, [page]);

	return {
		setPage,
		reviews,
		count,
		loading,
		page,
	};
};

export default useBusinessReviewsList;
