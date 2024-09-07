"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { IoChevronDown } from "react-icons/io5";

const LocalSwitcher = () => {
	const [opened, setOpened] = useState<boolean>(false);
	const [localeLoaded, setLocaleLoaded] = useState<boolean>(false);
	const locale = useLocale();
	const router = useRouter();
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleLocaleChange = (newLocale: string) => {
		if (locale !== newLocale) {
			document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

			window.location.reload();

			router.refresh();

			setOpened(false);
		}
	};

	useEffect(() => {
		setLocaleLoaded(true);
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpened(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<div className="relative" ref={dropdownRef}>
			<button
				onClick={() => setOpened((prev) => !prev)}
				style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
				className="bg-white flex h-[35px] min-w-[60px] justify-between gap-[8px] items-center rounded-full px-[8px] py-[5px]">
				{localeLoaded ? (
					locale === "ar" ? (
						<Image
							src="/egypt.svg"
							width={20}
							height={20}
							alt="country"
						/>
					) : (
						<Image
							src="/america.svg"
							width={20}
							height={20}
							alt="country"
						/>
					)
				) : (
					<div className="bg-gray-200 animate-pulse w-[20px] h-[20px] rounded-full" />
				)}
				<IoChevronDown
					className={`text-black w-4 h-4 shrink-0 duration-150 ${
						opened ? "rotate-180" : "rotate-0"
					}`}
				/>
			</button>
			<div
				style={{ zIndex: 999 }}
				className={`absolute min-w-36
					duration-150
					${
						opened ? "min-h-20" : "max-h-0"
					} text-black bg-white top-14 items-start justify-around  flex flex-col rounded-md overflow-hidden`}>
				<div
					className="flex h-full px-[12px] items-center cursor-pointer"
					onClick={() => handleLocaleChange("ar")}>
					<input
						id={"ar"}
						type="radio"
						value="ar"
						checked={locale === "ar"}
						name="radio"
						readOnly
						className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
					/>
					<label
						htmlFor={"ar"}
						className="ms-2 text-sm font-medium flex items-center gap-1 text-gray-900">
						<Image
							src={"/egypt.svg"}
							width={24}
							height={24}
							alt={"Egypt"}
						/>
						عربي
					</label>
				</div>
				<div
					className="flex h-full px-[12px] items-center cursor-pointer"
					onClick={() => handleLocaleChange("en")}>
					<input
						id={"en"}
						type="radio"
						value="en"
						checked={locale === "en"}
						name="radio"
						readOnly
						className="w-4 h-4 text-blue-500 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 cursor-pointer"
					/>
					<label
						htmlFor={"en"}
						className="ms-2 text-sm font-medium flex items-center gap-1 text-gray-900">
						<Image
							src={"/america.svg"}
							width={24}
							height={24}
							alt={"USA"}
						/>
						English
					</label>
				</div>
			</div>
		</div>
	);
};

export default LocalSwitcher;
