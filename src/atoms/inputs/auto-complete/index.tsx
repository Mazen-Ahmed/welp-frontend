"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { IoChevronDown } from "react-icons/io5";

interface Option {
	label: string;
	value: any;
}

const Autocomplete = ({
	field,
	label,
	name,
	options = [],
	error,
	onChange,
}: {
	field: any;
	label: string;
	name: string;
	error: any;
	onChange?: any;
	options?: Array<Option>;
}) => {
	const [query, setQuery] = useState<string | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<Array<Option>>([]);
	const [isFocused, setIsFocused] = useState(false);

	const locale = useLocale();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		setQuery(value);
		setFilteredOptions(
			options.filter((city) =>
				city.label.toLowerCase().includes(value.toLowerCase())
			)
		);
	};

	const handleFocus = () => {
		setIsFocused(true);
		setFilteredOptions(options);
	};

	const handleBlur = () => {
		setIsFocused(false);
		// setFilteredOptions([]); // Optionally clear the list on blur
	};

	const handleSelect = (city: Option) => {
		setQuery(city.label);
		setFilteredOptions([]);
		setIsFocused(false);

		onChange(city.value);
	};

	return (
		<div
			dir={locale === "ar" ? "rtl" : "ltr"}
			className="relative w-full max-w-sm mx-auto">
			<label
				htmlFor="city"
				className="block text-sm font-normal text-gray-700">
				{label}
			</label>
			<div className="mt-1 relative rounded-full shadow-sm">
				<input
					{...field}
					type="text"
					id="city"
					name={name}
					value={query}
					onChange={handleInputChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					className={`block w-full ps-3 pe-10 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
						error && "ring-red-500 border-red-500"
					}`}
					placeholder={label}
				/>
				<div className="absolute inset-y-0 end-0 pe-3 flex items-center pointer-events-none">
					<IoChevronDown className="text-gray-400 " />
				</div>
			</div>
			{isFocused && filteredOptions.length > 0 && (
				<ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
					{filteredOptions.map((city) => (
						<li
							key={city.label}
							className="cursor-pointer px-4 py-2 hover:bg-gray-100"
							onMouseDown={() => handleSelect(city)} // Use onMouseDown to prevent blur event
						>
							{city.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Autocomplete;
