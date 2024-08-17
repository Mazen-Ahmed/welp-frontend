"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { FileInput, FileLink } from "atoms";
import { fileData } from "data/accept";
import { useAddBusinessRequest } from "hooks";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { CiLocationOn, CiMap } from "react-icons/ci";
import { IoCameraOutline } from "react-icons/io5";
import ClipLoader from "react-spinners/ClipLoader";
import { useAddBusinessFormSchema } from "schemas";
import { useCitiesStore } from "store/cities";
import { renderField } from "utils";

const AddPlacesForm = ({
	translation,
	setOpen,
}: {
	translation: any;
	setOpen: (state: boolean) => void;
}) => {
	const businessT = useTranslations("business");

	const schema = useAddBusinessFormSchema();

	const { addBusinessRequestAction, success, loading } =
		useAddBusinessRequest();

	const cities = useCitiesStore((state) => state.cities);

	const locale = useLocale();

	const formattedCities = cities.map((city) => ({
		label: city.name,
		value: city.id,
	}));

	const { acceptedExtensions } = fileData;

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		mode: "onChange",
	});

	const image: any = watch("image");

	const addPlaceHandler = (e: any) => {
		const { name, description, location, image, city } = e;

		addBusinessRequestAction(name, description, location, city, image);
	};

	return (
		<>
			{success ? (
				<div className="flex flex-col justify-start items-center">
					<Image
						src={"/thank_you.png"}
						width={200}
						height={200}
						alt="thank you"
					/>
					<h3>{businessT("thankyou")}</h3>
					<p className="text-gray-400">
						{businessT("weRecievedRequest")}
					</p>

					<button
						disabled={loading}
						type="button"
						onClick={() => setOpen(false)}
						className="w-full  flex-1 bg-yellow-500 text-white px-3 py-[15px] mt-[24px] rounded-3xl">
						{businessT("close")}
					</button>
				</div>
			) : (
				<form
					dir={locale === "ar" ? "rtl" : "ltr"}
					onSubmit={handleSubmit(addPlaceHandler)}
					className="flex flex-col gap-2 [scrollbar-width:10px] w-full  overflow-auto max-h-[82vh] py-2 px-1 ">
					{renderField(
						"text",
						"name",
						translation.placeName,
						"",
						control,
						errors?.name?.message,
						<CiLocationOn className="w-4 h-4 text-gray-400" />
					)}
					{renderField(
						"auto-complete",
						"city",
						translation.city,
						"",
						control,
						errors?.city?.message,
						null,
						formattedCities,
						(city: number) => {
							setValue("city", city.toString());
						}
					)}
					{renderField(
						"text",
						"address",
						translation.address,
						"",
						control,
						errors?.address?.message,
						<CiMap className="w-4 h-4 text-gray-400" />
					)}

					{renderField(
						"text-area",
						"description",
						translation.description,
						"",
						control,
						errors?.description?.message
					)}
					<div
						dir={locale === "ar" ? "rtl" : "ltr"}
						className="flex flex-col items-start justify-center w-full py-2 ">
						<FileInput
							icon={<IoCameraOutline />}
							accept={Object.values(acceptedExtensions).join(",")}
							className={` border rounded-3xl w-full p-3  ${
								errors?.image?.message
									? "border-red-500 text-red-500"
									: "border-gray-300 text-yellow-500"
							}`}
							onChange={(e) => {
								setValue("image", e.target.files[0]);
							}}
						/>
						{errors?.image?.message && (
							<p className="text-xs text-start text-red-500">
								{errors?.image?.message}
							</p>
						)}

						{image && (
							<FileLink
								key={image?.name}
								withDelete
								maxFileNameLength={30}
								deleteAction={() =>
									//@ts-ignore
									setValue("image", undefined)
								}
								fileName={image?.name}
							/>
						)}
					</div>

					<div className="flex gap-1 w-full items-center justify-center">
						<button
							type="submit"
							disabled={loading}
							className="bg-yellow-main flex-1 flex text-white px-3 justify-center items-center py-1 rounded-3xl">
							{loading ? (
								<ClipLoader
									size={20}
									color="#fff"
									loading={true}
								/>
							) : (
								translation.sendRequest
							)}
						</button>
						<button
							disabled={loading}
							type="button"
							onClick={() => setOpen(false)}
							className="bg-transparent border  flex-1 border-yellow-500 text-yellow-500 px-3 py-1 rounded-3xl">
							{translation.cancel}
						</button>
					</div>
				</form>
			)}
		</>
	);
};

export default AddPlacesForm;
