"use client";

import { getCookie, setCookie } from "cookies-next";
// @ts-ignore
import * as lookup from "coordinate_to_country";
import { CityType } from "interfaces";
import { useRouter, usePathname } from "navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { toast } from "react-toastify";
import { useBusinessesFilterStore } from "store/businesses-filters";

const SearchInput = ({
	translation,
	className,
	data,
	loading,
}: {
	translation: any;
	loading: boolean;
	data: any;
	className?: string;
}) => {
	const searchParams = useSearchParams();

	const [showCities, setShowCities] = useState(false);

	const [filteredCities, setFilteredCities] = useState(data || []);

	const [cityValue, setCityValue] = useState<string | null>(
		(searchParams?.get("city") as string) || null
	);

	const [keyword, setKeyword] = useState<string | null>(
		(searchParams?.get("search") as string) || null
	);

	const location = getCookie("location");

	const inputRef = useRef<HTMLInputElement>(null);

	const listRef = useRef<HTMLDivElement>(null);

	const locale = useLocale();

	const createQueryString = useCallback(
		(name: string, value: any) => {
			if (value) {
				const params = new URLSearchParams(searchParams.toString());
				params.set(name, value);
				return params.toString();
			}
		},
		[searchParams]
	);

	const removeQueryParam = useCallback(
		(name: string, pathname: string) => {
			if (name) {
				const params = new URLSearchParams(searchParams.toString());
				params.delete(name);
				router.push(pathname + "?" + params);
			}
		},
		[searchParams]
	);

	const router = useRouter();

	const pathname = usePathname();

	const setSearchKeyword = useBusinessesFilterStore(
		(state) => state.setSearchKeyword
	);

	const setNearest = useBusinessesFilterStore((state) => state.setNearest);

	const setCity = useBusinessesFilterStore((state) => state.setCity);

	const searchHandler = () => {
		let hasSearchParam = false;
		let hasCityParam = false;

		const queryString = [];

		if (keyword) {
			queryString.push(createQueryString("search", keyword));
			hasSearchParam = true;
		}

		if (cityValue) {
			const cityMatch = data.find((city: CityType) =>
				city?.name
					?.toLowerCase()
					.includes(cityValue?.toLowerCase() || cityValue)
			);
			if (cityMatch || cityValue === translation.currentLocation) {
				queryString.push(createQueryString("city", cityValue));
				hasCityParam = true;
			}
		}

		const queryParams = queryString.join("&");

		if (pathname === "/biz/businesses") {
			const SP = new URLSearchParams(searchParams.toString());

			if (hasSearchParam) {
				SP.set("search", keyword as string);
			} else {
				SP.delete("search");
			}

			if (hasCityParam) {
				SP.set("city", cityValue as string);
			} else {
				SP.delete("city");
			}

			router.push(pathname + "?" + SP.toString());
		} else {
			router.push(
				`/biz/businesses${queryParams ? "?" + queryParams : ""}`
			);
		}

		setSearchKeyword(keyword || null);
	};

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target;
		if (
			target instanceof Node &&
			inputRef.current &&
			!inputRef.current.contains(target) &&
			listRef.current &&
			!listRef.current.contains(target)
		) {
			setShowCities(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setFilteredCities(data);
	}, [data]);

	const handleCitySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value) {
			setCityValue(value);
			setFilteredCities(
				data.filter((city: any) =>
					city.name.toLowerCase().includes(value.toLowerCase())
				)
			);
		} else {
			setFilteredCities(data);
			setCityValue(null);
		}
	};

	function successFunction(position: any) {
		const { coords } = position;

		const country = lookup(coords.longitude, coords.latitude, true);

		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 3);
		setCookie(
			"location",
			{
				country: country[0],
				long: coords.longitude,
				lat: coords.latitude,
			},
			{ expires: expiryDate }
		);

		window.location.reload();
	}

	function errorFunction() {
		toast.info("Please enable location permission.");
	}

	if (!locale) return <div className="h-10 md:h-12 w-full"></div>;
	return (
		<div
			dir={locale === "ar" ? "rtl" : "ltr"}
			className={`rounded-full h-10 md:h-12 w-full relative justify-start shadow-searchInputShadow bg-white flex text-gray-600 gap-1 items-center ${className} `}>
			<div className="flex items-center w-11/12 h-full gap-2 border-e-2 border-solid ps-3 border-gray-200">
				<FaSearch className="text-gray-400" />
				<input
					type="text"
					placeholder={translation.ex}
					className="text-gray-800 text-xs md:text-sm h-full w-full outline-none placeholder:text-xs"
					onChange={(e) => {
						if (e.target.value) {
							setKeyword(e.target.value);
						} else {
							setKeyword(null);
							setSearchKeyword(null);
							removeQueryParam("search", pathname);
						}
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") searchHandler();
					}}
					defaultValue={searchParams?.get("search") as string}
				/>
			</div>
			<div className="flex relative items-center w-56 h-full gap-2 justify-start">
				<Image
					width={20}
					height={20}
					src={"/navigation.svg"}
					alt="navigation"
				/>
				<input
					type="text"
					ref={inputRef}
					disabled={loading}
					placeholder={translation.where}
					onFocus={() => setShowCities(true)}
					onChange={handleCitySearch}
					value={
						cityValue ||
						filteredCities?.find(
							(city: any) =>
								city?.id ===
								parseInt(searchParams?.get("city") as string)
						)?.name ||
						""
					}
					className="text-gray-800 text-xs md:text-sm h-full w-full outline-none"
				/>
				<button
					onClick={() => {
						setCity(null);
						setCityValue(null);
						removeQueryParam("city", pathname);
						setFilteredCities(data);
						setNearest(false);
					}}>
					{!!(
						cityValue ||
						parseInt(searchParams?.get("city") as string)
					) && <GiCancel className="hover:text-red-500" />}
				</button>
				{showCities && (
					<div
						ref={listRef}
						className="absolute -bottom-[16.5rem] z-50 mt-2 w-full h-64 shadow-md bg-white scroll-m-2 rounded-md py-3 px-2 overflow-auto">
						<button
							className="text-red-500 font-bold my-2 text-sm cursor-pointer bg-none text-start custom-scrollbar"
							onClick={() => {
								if (location) {
									setShowCities(false);
									setCityValue(translation.currentLocation);
									removeQueryParam("city", pathname);
									setCity(null);
									setNearest(true);
								} else {
									navigator.geolocation.getCurrentPosition(
										successFunction,
										errorFunction
									);
								}
							}}>
							{translation.currentLocation}
						</button>
						<hr className="h-[1px]" />
						<div className="h-full flex flex-col justify-start items-start">
							{filteredCities?.map((city: any) => (
								<button
									onClick={() => {
										setCityValue(city.name);
										setShowCities(false);
										setCity(city.id);
										if (pathname === "/biz/businesses")
											searchHandler();
									}}
									key={city.id}
									className="font-semiBold my-3 w-full text-sm cursor-pointer bg-none text-start">
									{city.name}
								</button>
							))}
						</div>
					</div>
				)}
			</div>
			<div className="items-center h-full gap-2 flex shrink-0">
				<button
					className="bg-secondary text-white rounded-e-full h-full py-1 px-5 flex-1 start-0 relative"
					onClick={() => searchHandler()}>
					<FaSearch className="text-white" />
				</button>
			</div>
		</div>
	);
};

export default SearchInput;
