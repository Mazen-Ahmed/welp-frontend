"use client";

import { ReviewCard, ReviewsLoader, CustomPagination } from "atoms";
import { useBusinessReviewsList } from "hooks";
import { useMemo } from "react";

const BusinessReviews = ({
	translation,
	businessSlug,
}: {
	translation: any;
	businessSlug: string;
}) => {
	const { loading, reviews, count, page, setPage } =
		useBusinessReviewsList(businessSlug);

	const loaders = useMemo(() => {
		const loaders = [];
		for (let i = 0; i < 8; i++) {
			loaders.push(<ReviewsLoader key={i} />); // Add ProductsLoader component to the array
		}
		return loaders;
	}, []);

	const pagesCount = Math.ceil(count / 10);

	const handleNextAction = () => {
		if (page < pagesCount) {
			setPage((prev) => prev + 1);
		}
	};

	const handlePrevAction = () => {
		if (page > 0) {
			setPage((prev) => prev - 1);
		}
	};

	return (
		<div className="my-10" id="reviews">
			<h3 className="text-xl my-1 font-bold">{translation.reviews}</h3>

			{loading ? (
				<div className="flex flex-col  border-1 border-solid border-gray-100 p-3 rounded-3xl text-xs md:text-md min-h-[30vh]">
					{loaders}
				</div>
			) : (
				<div
					className={`flex flex-col  border-1 border-solid border-gray-100 p-3 rounded-3xl text-xs md:text-md min-h-[30vh]
			${reviews?.length === 0 && " flex items-center justify-center"}
			`}>
					{reviews?.map((item, index) => (
						<div key={item.id} className="flex flex-col gap-2">
							<ReviewCard key={item.id} item={item} />
							{index !== count - 1 && <hr className="my-2" />}
						</div>
					))}
					{count !== reviews?.length && (
						<CustomPagination
							page={page}
							setPage={setPage}
							pagesCount={pagesCount}
							paginationNextAction={handleNextAction}
							paginationPrevAction={handlePrevAction}
						/>
					)}
					{reviews?.length === 0 && (
						<p className="text-lg">{translation.noReviews}</p>
					)}
				</div>
			)}
		</div>
	);
};

export default BusinessReviews;
