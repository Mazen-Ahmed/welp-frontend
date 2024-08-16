"use client";

import {
	BusinessCard,
	BusinessesListLoader,
	CustomPagination,
	BusinessHorizontalCard,
	ProductsLoader,
} from "atoms";
import { ResponsiveBusinessesFilters } from "components";
import { useBusinessesList } from "hooks";
import { Link } from "navigation";
import React, { useEffect, useMemo, useState } from "react";

const BusinessesList = ({
	locale,
	translation,
}: {
	locale: string;
	translation: any;
}) => {
	const { businesses, page, setPage, count, loading } = useBusinessesList(
		translation.currentLocation
	);
	const [windowWidth, setWindowWidth] = useState<number>(
		typeof window !== "undefined" ? window.innerWidth : 0
	);

	useEffect(() => {
		const handleResize = () => setWindowWidth(window.innerWidth);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const loaders = useMemo(() => {
		const loadersArray = [];
		for (let i = 0; i < 9; i++) {
			loadersArray.push(<BusinessesListLoader key={i} />);
		}
		return loadersArray;
	}, []);

	const horizontalLoaders = useMemo(() => {
		const loadersArray = [];
		for (let i = 0; i < 9; i++) {
			loadersArray.push(<ProductsLoader withShadow key={i} />);
		}
		return loadersArray;
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
		<div className="col-span-4 lg:col-span-3 w-full">
			<ResponsiveBusinessesFilters
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
			<div className="col-span-4 lg:col-span-3 w-full min-h-screen">
				<div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
					{loading &&
						(windowWidth <= 700 ? horizontalLoaders : loaders)}
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
					{!loading &&
						businesses.map((item) => (
							<Link
								href={`/biz/businesses/${item.slug || item.id}`}
								key={item.id}>
								{windowWidth <= 700 ? (
									<BusinessHorizontalCard
										item={item}
										locale={locale}
									/>
								) : (
									<BusinessCard
										item={item}
										locale={locale}
										className="bg-gray-businesses rounded-[20px] border border-gray-200 border-solid"
									/>
								)}
							</Link>
						))}
				</div>

				{!loading && businesses?.length === 0 && (
					<div className="h-screen w-full flex items-center justify-center text-xl">
						{translation.noResults}
					</div>
				)}

				{loading ? (
					<div className="bg-gray-200 rounded-md col-span-3 w-full h-10 animate-pulse"></div>
				) : (
					<div dir="ltr" className="select-none col-span-3">
						{pagesCount > 1 && (
							<CustomPagination
								setPage={setPage}
								page={page}
								pagesCount={pagesCount}
								paginationNextAction={handleNextAction}
								paginationPrevAction={handlePrevAction}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default BusinessesList;
