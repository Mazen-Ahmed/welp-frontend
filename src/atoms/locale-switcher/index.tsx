"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IoChevronDown } from "react-icons/io5";

// Import setCookie from cookies-next

const LocalSwitcher = () => {
	const [opened, setOpened] = useState<boolean>(false);

	const locale = useLocale();

	const handleLocaleChange = (newLocale: string) => {
		if (locale !== newLocale) {
			document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
			window.location.reload();
			setOpened(false);
		}
	};

	return (
		<div className="relative">
			<button
				onClick={() => setOpened((prev) => !prev)}
				style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
				className="bg-white flex h-[35px] min-w-[60px] justify-between gap-[8px] items-center rounded-full px-[8px] py-[5px]">
				<Image
					src={locale === "ar" ? "/egypt.svg" : "/america.svg"}
					width={20}
					height={20}
					alt="country"
				/>
				<IoChevronDown
					className={`text-black w-4 h-4 shrink-0 duration-150 ${
						opened ? "rotate-180" : "rotate-0"
					}`}
				/>
			</button>
			<div
				onBlur={() => setOpened(false)}
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
