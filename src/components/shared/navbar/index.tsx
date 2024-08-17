"use client";

import { Modal, SearchInput } from "atoms";
import { AddPlacesForm } from "components";
import { getCookie, setCookie } from "cookies-next";
// @ts-ignore
import * as lookup from "coordinate_to_country";
import { useCitiesList } from "hooks";
import { Link, usePathname } from "navigation";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";
import ClipLoader from "react-spinners/ClipLoader";

const Navbar = ({
	translation,
	isMobile,
	deviceType,
}: {
	translation: any;
	isMobile: boolean;
	deviceType: string;
}) => {
	const [opened, setOpened] = useState<boolean>(false);

	const [isOpeningApp, setIsOpeningApp] = useState(false);

	const [isModalOpened, setIsModalOpened] = useState(false);

	const modalData = {
		isOpened: isModalOpened,
		setIsOpened: setIsModalOpened,
	};

	const [searchOpened, setSearchOpened] = useState<boolean>(false);

	const locale = useLocale();

	const pathname = usePathname();

	const { data, loading } = useCitiesList();

	const isActive = (link: string) => pathname === link;

	const linksWithWhiteBackground = [
		"/categories",
		"/businesses",
		"/biz/businesses",
		"/terms",
		"/privacy",
	];

	const linksWithOpenAppButton = ["menu"];

	const withWhiteBackground = !!linksWithWhiteBackground.find(
		(link) => pathname === link || pathname.includes("menu")
	);

	const hasOpenAppButton = !!linksWithOpenAppButton.find((link) =>
		pathname.includes(link)
	);

	const toggleOpenedHandler = () => {
		if (searchOpened) {
			setSearchOpened(false);
		} else {
			setOpened((prev) => !prev);
		}
	};

	const toggleSearchOpenedHandler = () => {
		setSearchOpened((prev) => !prev);
	};

	useEffect(() => {
		if (navigator.geolocation && !getCookie("location")) {
			navigator.geolocation.getCurrentPosition(
				successFunction,
				errorFunction
			);
		}
	}, []);

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
	}

	function errorFunction() {
		console.log("Unable to retrieve your location.");
	}

	const handleOpenApp = () => {
		setIsOpeningApp(true);

		window.location.href = "welp://home";

		setTimeout(() => {
			if (!document.hidden) {
				setIsOpeningApp(false);
				if (deviceType === "android") {
					window.location.href =
						"https://play.google.com/store/apps/details?id=com.welp.welp";
				} else {
					window.location.href =
						"https://apps.apple.com/us/app/welp-rating-social-reviews/id6478454000";
				}
			}
		}, 1000);
	};

	return (
		<div
			dir="ltr"
			className={`
			${
				withWhiteBackground || opened || searchOpened
					? "bg-white md:bg-transparent shadow-md   static top-0 text-black "
					: "absolute shadow-none lg:bg-transparent text-white"
			}			
			  w-full `}>
			<div
				className={`flex items-center gap-2 md:gap-12 justify-between  px-5 md:px-10 h-14 lg:h-20`}>
				{(!isMobile || (isMobile && !hasOpenAppButton)) && (
					<Link href={"/"}>
						<Image
							src="/logo.svg"
							width={100}
							height={100}
							alt="logo"
							className="h-20 w-20 lg:w-52 lg:h-52"
						/>
					</Link>
				)}
				{isMobile && hasOpenAppButton && (
					<div className="w-full flex items-center gap-10">
						<button
							onClick={handleOpenApp}
							className="bg-secondary w-[118px] h-[32px] flex items-center text-sm justify-center text-white rounded-full ">
							{isOpeningApp ? (
								<ClipLoader
									className="animate-spin"
									color="#fff"
									loading={true}
									size={25}
								/>
							) : (
								"فتح الأبليكيشن"
							)}
						</button>

						<Link href={"/"}>
							<Image
								src="/logo.svg"
								width={100}
								height={100}
								alt="logo"
								className="h-14 w-14 lg:w-52 lg:h-52"
							/>
						</Link>
					</div>
				)}
				<SearchInput
					data={data}
					loading={loading}
					className="hidden lg:flex"
					translation={translation}
				/>
				<div className="items-center justify-between hidden gap-7 lg:flex  ">
					<Link
						className={`flex items-center justify-center gap-2  whitespace-nowrap text-[20px]
						${isActive("/") ? "text-yellow-400" : "hover:text-yellow-400"}`}
						style={{
							fontWeight: isActive("/") ? "bold" : undefined,
						}}
						href={"/"}>
						{translation.home}
					</Link>

					<Link
						className={`flex items-center justify-center gap-2 whitespace-nowrap  text-[20px]
							${isActive("/businesses") ? "text-yellow-400" : "hover:text-yellow-400"}`}
						style={{
							fontWeight: isActive("/businesses")
								? "bold"
								: undefined,
						}}
						href={"/businesses"}>
						{translation.forBusinesses}
					</Link>

					<Link
						className={`  whitespace-nowrap  ${
							!isActive("/about") &&
							"hover:text-yellow-400 text-[20px]"
						}`}
						style={{
							textShadow: isActive("/about")
								? "1px 2px 2px #fff"
								: undefined,
							fontWeight: isActive("/about") ? "bold" : undefined,
						}}
						target="_blank"
						href={"https://blog.welpstar.com/"}>
						{translation.blog}
					</Link>
					<button
						className={`flex items-center justify-center gap-2 whitespace-nowrap text-white bg-secondary p-2 rounded-full`}
						onClick={() => setIsModalOpened((prev) => !prev)}>
						<FaPlus />
						{translation.addPlace}
					</button>
				</div>

				<Modal
					withoutExitButton
					className={"w-full max-w-sm !rounded-3xl "}
					data={modalData}>
					<div className="w-full h-full p-3">
						<h1 className="text-center">{translation.addPlace}</h1>
						<AddPlacesForm
							setOpen={setIsModalOpened}
							translation={{
								placeName: translation.placeName,
								city: translation.city,
								address: translation.address,
								description: translation.description,
								sendRequest: translation.sendRequest,
								cancel: translation.cancel,
							}}
						/>
					</div>
				</Modal>

				<div className="flex gap-3 items-center lg:hidden">
					<button
						className={`block ${
							(searchOpened || opened) && "hidden"
						} `}
						onClick={toggleSearchOpenedHandler}>
						<SlMagnifier
							className={`w-6 h-6 ${
								withWhiteBackground || opened || searchOpened
									? "text-gray-400"
									: "text-white"
							}`}
						/>
					</button>
					<button
						onClick={toggleOpenedHandler}
						className="flex flex-col gap-1 cursor-pointer ">
						<div
							className={`w-6 h-0.5 ease-in-out duration-100 ${
								withWhiteBackground || opened || searchOpened
									? "bg-gray-400"
									: "bg-white"
							} ${
								(opened || searchOpened) &&
								"rotate-45 translate-y-1.5 "
							} `}
						/>
						<div
							className={`w-6 h-0.5 ease-in-out duration-100 ${
								withWhiteBackground || opened || searchOpened
									? "bg-gray-400"
									: "bg-white"
							} ${(opened || searchOpened) && "opacity-0 "}`}
						/>
						<div
							className={`w-6 h-0.5 ease-in-out duration-100 ${
								withWhiteBackground || opened || searchOpened
									? "bg-gray-400"
									: "bg-white"
							} ${
								(opened || searchOpened) &&
								"-rotate-45 -translate-y-1.5 "
							}`}
						/>
					</button>
				</div>
			</div>

			<div
				dir={locale === "ar" ? "rtl" : "ltr"}
				className={`flex lg:hidden flex-col items-start justify-start ease-out duration-100 gap-10 px-5  ${
					opened
						? "max-h-96 py-4 border-t border-gray-300"
						: "overflow-hidden max-h-0"
				}    md:px-10 lg:px-20`}>
				<Link
					className="flex items-center justify-center gap-2 text-lg"
					href={"/"}
					onClick={toggleOpenedHandler}>
					{translation.home}
				</Link>
				<Link
					className="flex items-center justify-center gap-2 text-lg"
					scroll={false}
					onClick={() => {
						toggleOpenedHandler();
					}}
					href={"/businesses"}>
					{translation.forBusinesses}
				</Link>
				<Link
					className="flex items-center justify-center gap-2 text-lg"
					target="_blank"
					href={"https://blog.welpstar.com/"}
					onClick={toggleOpenedHandler}>
					{translation.blog}
				</Link>
				<Link
					className={`flex items-center justify-center gap-2 whitespace-nowrap text-white bg-secondary p-2 rounded-full  ${
						!isActive("/contact") && "hover:text-yellow-400"
					}`}
					href={"/contact"}
					onClick={toggleOpenedHandler}>
					<FaPlus />

					{translation.addPlace}
				</Link>
			</div>

			<div
				dir={locale === "ar" ? "rtl" : "ltr"}
				className={`flex lg:hidden flex-col items-start justify-start ease-out duration-100 gap-10 px-5  ${
					searchOpened
						? "max-h-96 py-4 border-t border-gray-300"
						: "overflow-hidden max-h-0"
				}    md:px-10 lg:px-20`}>
				<SearchInput
					data={data}
					loading={loading}
					className="flex lg:hidden"
					translation={translation}
				/>
			</div>
		</div>
	);
};

export default Navbar;
