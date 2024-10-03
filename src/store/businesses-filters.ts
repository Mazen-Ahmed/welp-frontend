"use client";

import { CategoryChildType, CategoryType } from "interfaces";
import { create } from "zustand";

interface BusinessesFilterState {
	category: CategoryType | null;
	categories: Array<CategoryChildType> | [];
	categoriesToFilterWith: Array<number> | [];
	priceCategory: string | null;
	searchKeyword: string | null;
	search: boolean;
	isOpened: boolean;
	isLoading: boolean;
	isDeliveryAvailable: boolean;
	city: string | null;
	nearest: boolean | null;
	setCategory: (category: CategoryType | null) => void;
	setChildrenCategories: (category: Array<CategoryChildType> | []) => void;
	setCategoriesToFilterWith: (categoriesToFilterWith: Array<number>) => void;
	setPriceCategory: (category: string | null) => void;
	setSearchKeyword: (keyword: string | null) => void;
	setSearch: (search: boolean) => void;
	setIsOpened: (isOpened: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;
	setIsDeliveryAvailable: (isDeliveryAvailable: boolean) => void;
	setCity: (city: string | null) => void;
	setNearest: (nearest: boolean | null) => void;
}

export const useBusinessesFilterStore = create<BusinessesFilterState>(
	(set) => ({
		category: null,
		categories: [],
		categoriesToFilterWith: [],
		priceCategory: null,
		searchKeyword: null,
		search: true,
		isOpened: false,
		isLoading: false,
		isDeliveryAvailable: false,
		city: null,
		nearest: false,
		setCategory: (category: CategoryType | null) => set({ category }),
		setChildrenCategories: (categories: Array<CategoryChildType> | []) =>
			set({ categories }),
		setCategoriesToFilterWith: (categoriesToFilterWith: Array<number>) =>
			set({ categoriesToFilterWith }),
		setPriceCategory: (priceCategory: string | null) =>
			set({ priceCategory }),
		setSearchKeyword: (searchKeyword: string | null) =>
			set({ searchKeyword }),
		setSearch: (search = false) => set({ search }),
		setIsOpened: (isOpened = false) => set({ isOpened }),
		setIsLoading: (isLoading = false) => set({ isLoading }),
		setIsDeliveryAvailable: (isDeliveryAvailable = false) =>
			set({ isDeliveryAvailable }),
		setCity: (city: string | null) => set({ city }),
		setNearest: (nearest: boolean | null) => set({ nearest }),
	})
);
