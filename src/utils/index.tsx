"use client";

import { AutoComplete, TextInputWithIcon } from "atoms";
import { getCookie } from "cookies-next";
import { months } from "data";
import { OpeningHoursType } from "interfaces";
import { useLocale } from "next-intl";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

const locale = getCookie("NEXT_LOCALE");

const getISODay = function () {
	return ((new Date().getDay() + 6) % 7) + 1;
};

export const getOpenedHourHandler = (
	openingHours: Array<OpeningHoursType>,
	open: boolean
) => {
	const fromOrTo = open ? "time_from" : "time_to";

	const openingHourItem = openingHours.find(
		(item) => item.day == getISODay()
	);

	if (!openingHourItem) {
		return "Unknown";
	}

	const time = openingHourItem[fromOrTo]?.split(":")[0];
	const formattedTime = parseInt(time, 10) % 12 || 12; // Convert to 12-hour format

	const period = parseInt(time, 10) < 12 ? "ص" : "م";

	return `${formattedTime} ${period}`;
};

export function formatDate(dateStr: string): string {
	const dateObj = new Date(dateStr);

	const month = months[dateObj.getMonth()];
	const day = dateObj.getDate();
	const year = dateObj.getFullYear();
	let hours = dateObj.getHours();
	const minutes = dateObj.getMinutes();
	const period = hours >= 12 ? "pm" : "am";

	hours = hours % 12 || 12;

	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

	const formattedDate = `${month} ${day}, ${year} ${hours}:${formattedMinutes} ${period}`;

	return formattedDate;
}

export const textLimitHandler = (text: string, maxLength: number) => {
	let reformattedText;

	if (text?.length > maxLength) {
		reformattedText = `${text.substr(0, maxLength)}...`;
	} else {
		reformattedText = text;
	}

	return reformattedText;
};

export const renderFormFieldByType = (
	locale: string,
	type: string,
	name: string,
	label: string,
	className: string,
	field: any,
	error?: string | boolean,
	Icon?: ReactNode,
	options?: Array<any>,
	additionalOnChange?: any
) => {
	switch (type) {
		case "text":
			return (
				<div
					dir={locale === "ar" ? "rtl" : "ltr"}
					className="flex flex-col items-start">
					<TextInputWithIcon
						label={label}
						error={error}
						name={name}
						field={field}
						icon={Icon}
					/>
					{error && <p className="text-xs text-red-500">{error}</p>}
				</div>
			);

		case "text-area":
			return (
				<div
					dir={locale === "ar" ? "rtl" : "ltr"}
					className="flex flex-col justify-start w-full gap-2">
					<label
						htmlFor={name}
						className="block text-sm font-normal text-gray-700">
						{label}
					</label>
					<div
						className={`relative rounded-3xl overflow-hidden w-full border px-3 border-solid h-auto ps-1  ${
							error ? " border-red-500" : "border-gray-400"
						}`}>
						<textarea
							{...field}
							name={name}
							className={`shadow-none py-2 text-xs w-full outline-none ${className} `}
							rows={5}
							id="text"
							placeholder={label}
						/>
						{Icon && (
							<div className="absolute inset-inline-end-3 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-yellow-300">
								{Icon}
							</div>
						)}
					</div>
					{error && <p className="text-xs text-red-500">{error}</p>}
				</div>
			);
		case "auto-complete":
			return (
				<div
					dir={locale === "ar" ? "rtl" : "ltr"}
					className="flex flex-col justify-start w-full gap-2">
					<AutoComplete
						onChange={additionalOnChange}
						error={error}
						options={options}
						name={name}
						label={label}
						field={field}
					/>
					{error && <p className="text-xs text-red-500">{error}</p>}
				</div>
			);

		default:
			return <div className="flex flex-col justify-start w-full" />;
	}
};

export const renderField = (
	locale: string,
	type: string,
	name: string,
	label: string,
	className: string,
	control: any,
	error?: string | boolean,
	Icon?: ReactNode,
	options?: Array<any>,
	additionalOnChange?: any
) => {
	return (
		<Controller
			defaultValue={""}
			control={control}
			key={name}
			name={name}
			render={({ field }) =>
				renderFormFieldByType(
					locale,
					type,
					name,
					label,
					className,
					field,
					error,
					Icon,
					options,
					additionalOnChange
				)
			}
		/>
	);
};

export const debounce = (callback: Function, time: number) => {
	let timeout: any = null;

	return (value: any, ...rest: any) => {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(() => callback(value, ...rest), time);
	};
};
