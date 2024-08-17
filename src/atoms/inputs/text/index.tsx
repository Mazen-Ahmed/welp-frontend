import { useLocale } from "next-intl";

const TextInputWithIcon = ({
	label,
	name,
	field,
	icon,
	error,
}: {
	label: string;
	name: string;
	field: any;
	icon: any;
	error: any;
}) => {
	const locale = useLocale();

	return (
		<div
			dir={locale === "ar" ? "rtl" : "ltr"}
			className={`relative w-full max-w-sm mx-auto `}>
			<label
				htmlFor={name}
				className="block text-sm font-normal text-gray-700">
				{label}
			</label>
			<div className="mt-1 relative rounded-full shadow-sm">
				<div
					className={`absolute inset-y-0 ${
						locale === "ar" ? "right-0 pr-3" : "left-0 pl-3"
					} flex items-center pointer-events-none border-e pe-1 my-auto h-3/4 border-gray-300`}>
					{icon}
				</div>
				<input
					{...field}
					name={name}
					type="text"
					id="address"
					className={`block w-full
						${
							locale === "ar"
								? "pr-10 pl-3 text-right"
								: "pr-3 pl-10 text-left"
						} py-2 border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm
						${error && "ring-red-500 border-red-500"}
						`}
					placeholder={label}
				/>
			</div>
		</div>
	);
};

export default TextInputWithIcon;
