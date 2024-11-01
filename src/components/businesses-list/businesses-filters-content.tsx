"use client";

import { CheckBox, RadioButton } from "atoms";
import { CategoryType } from "interfaces";
import React, { useEffect } from "react";
import { GiCancel } from "react-icons/gi";
import { useBusinessesFilterStore } from "store/businesses-filters";

const BusinessesFiltersContent = ({
	translation,
	setOpened,
	category,
}: {
	translation: any;
	setOpened?: (state: boolean) => void;
	category?: CategoryType;
}) => {
	const setIsOpened = useBusinessesFilterStore((state) => state.setIsOpened);

	const isOpened = useBusinessesFilterStore((state) => state.isOpened);

	const categoriesToFilterWith = useBusinessesFilterStore(
		(state) => state.categoriesToFilterWith
	);

	const setIsDeliveryAvailable = useBusinessesFilterStore(
		(state) => state.setIsDeliveryAvailable
	);

	const isDeliveryAvailable = useBusinessesFilterStore(
		(state) => state.isDeliveryAvailable
	);

	const setCategoriesToFilterWith = useBusinessesFilterStore(
		(state) => state.setCategoriesToFilterWith
	);

	const setPriceCategory = useBusinessesFilterStore(
		(state) => state.setPriceCategory
	);

	const priceCategory = useBusinessesFilterStore(
		(state) => state.priceCategory
	);

	const setCategory = useBusinessesFilterStore((state) => state.setCategory);

	const isLoading = useBusinessesFilterStore((state) => state.isLoading);

	const resetFiltersHandler = () => {
		setPriceCategory(null);
		setIsOpened(false);
		setIsDeliveryAvailable(false);
		setCategoriesToFilterWith([]);
		setCategory(null);
	};

	useEffect(() => {
		return () => resetFiltersHandler();
	}, []);

	return (
		<>
			<div className="flex flex-col items-start  gap-2">
				<div className="w-full flex justify-between items-center ">
					<h2 className="font-bold">{translation.filters}</h2>
					{(isOpened ||
						isDeliveryAvailable ||
						priceCategory ||
						categoriesToFilterWith.length > 0) &&
						!isLoading && (
							<GiCancel
								onClick={resetFiltersHandler}
								className="w-5 h-5 hover:text-red-500 cursor-pointer"
							/>
						)}
				</div>
				<hr className="my-2 h-[1px] bg-gray-100 w-full	" />
				<h3 className="font-bold">{translation.suggested}</h3>
				<CheckBox
					disabled={isLoading}
					checked={isOpened}
					onChange={(e) => {
						if (e.target.checked) {
							setIsOpened(true);
						} else {
							setIsOpened(false);
						}
						setOpened && setOpened(false);
					}}
					label={translation.isOpened}
				/>
				<CheckBox
					checked={isDeliveryAvailable}
					onChange={(e) => {
						if (e.target.checked) {
							setIsDeliveryAvailable(true);
						} else {
							setIsDeliveryAvailable(false);
						}
						setOpened && setOpened(false);
					}}
					disabled={isLoading}
					label={translation.offersDelivery}
				/>
			</div>
			<hr className="my-2 h-[2px] bg-gray-100	" />
			<div className="flex flex-col items-start  gap-2">
				<h3 className="font-bold">{translation.price}</h3>
				<CheckBox
					checked={priceCategory === "$$$$"}
					onChange={(e) => {
						if (e.target.checked) {
							setPriceCategory("$$$$");
						} else {
							setPriceCategory(null);
						}
						setOpened && setOpened(false);
					}}
					disabled={isLoading}
					label={translation.expensive}
				/>
				<CheckBox
					checked={priceCategory === "$$$"}
					onChange={(e) => {
						if (e.target.checked) {
							setPriceCategory("$$$");
						} else {
							setPriceCategory(null);
						}
						setOpened && setOpened(false);
					}}
					disabled={isLoading}
					label={translation.high}
				/>
				<CheckBox
					checked={priceCategory === "$$"}
					onChange={(e) => {
						if (e.target.checked) {
							setPriceCategory("$$");
						} else {
							setPriceCategory(null);
						}
						setOpened && setOpened(false);
					}}
					disabled={isLoading}
					label={translation.medium}
				/>
				<CheckBox
					checked={priceCategory === "$"}
					onChange={(e) => {
						if (e.target.checked) {
							setPriceCategory("$");
						} else {
							setPriceCategory(null);
						}
						setOpened && setOpened(false);
					}}
					disabled={isLoading}
					label={translation.low}
				/>
			</div>
			{category?.children && category?.children?.length > 0 && (
				<>
					<hr className="my-2 h-[1px] bg-gray-100	" />
					<h3 className="font-bold mb-3">{category?.name}</h3>
					<div className="flex flex-col items-start h-40  overflow-auto gap-2">
						{category?.children?.map((item) => (
							<CheckBox
								key={item.id}
								checked={
									!!categoriesToFilterWith?.find(
										(category) => category === item.id
									)
								}
								onChange={(e) => {
									setOpened && setOpened(false);

									if (e.target.checked) {
										setCategoriesToFilterWith([
											...categoriesToFilterWith,
											item.id,
										]);
									} else {
										setCategoriesToFilterWith([
											...categoriesToFilterWith.filter(
												(category) =>
													category !== item.id
											),
										]);
									}
								}}
								disabled={isLoading}
								label={item.name}
							/>
						))}
					</div>
				</>
			)}
		</>
	);
};

export default BusinessesFiltersContent;
