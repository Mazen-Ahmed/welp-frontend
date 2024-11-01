"use client";

import { Modal, SearchInput, LocalSwitcher } from "atoms";
import { AddPlacesForm } from "components";
import { getCookie, setCookie } from "cookies-next";
import { useCitiesList } from "hooks";
import { useRouter, usePathname, Link } from "navigation";
import Image from "next/image";
import { memo } from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { SlMagnifier } from "react-icons/sl";
import { getUserLocation } from "services";

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

	const router = useRouter();

	const modalData = {
		isOpened: isModalOpened,
		setIsOpened: setIsModalOpened,
	};

	const [searchOpened, setSearchOpened] = useState<boolean>(false);

	const pathname = usePathname();

	const { data, loading } = useCitiesList();

	const isActive = (link: string) => pathname === link;

	const linksWithWhiteBackground = [
		"/categories",
		"/categories/:path",
		"/businesses",
		"/biz",
		"/biz/user/:path",
		"/terms",
		"/privacy",
		"/download/1",
		"/category/:path",
	];

	const linksWithOpenAppButton = ["menu"];

	const regexPatterns = linksWithWhiteBackground.map(
		(link) => `(?:/(ar|en))?${link.replace(/:path/, "([^/]+)")}$`
	);

	const withWhiteBackground = !!regexPatterns.find((pattern) => {
		const regex = new RegExp(pattern);
		return regex.test(pathname) || pathname.includes("menu");
	});

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

	async function successFunction(position: any) {
		const { coords } = position;

		const address: any = await getUserLocation(
			coords.longitude,
			coords.latitude
		);

		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + 3);
		setCookie(
			"location",
			{
				country: address?.country_code,
				long: coords.longitude,
				lat: coords.latitude,
			},
			{ expires: expiryDate }
		);

		router.refresh();
	}

	function errorFunction() {
		console.log("Unable to retrieve your location.");
	}

	const handleOpenApp = () => {
		setIsOpeningApp(true);
		window.location.href =
			pathname === "/" ? "welp://home" : `welp://${pathname}`;

		let visibilityChanged = false;
		const handleVisibilityChange = () => {
			if (document.hidden) {
				visibilityChanged = true;
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		setTimeout(() => {
			if (!visibilityChanged) {
				setIsOpeningApp(false);
				if (deviceType === "android") {
					window.location.href =
						"https://play.google.com/store/apps/details?id=com.welp.welp";
				} else {
					window.location.href =
						"https://apps.apple.com/us/app/welp-rating-social-reviews/id6478454000";
				}
			}

			// Cleanup the event listener
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange
			);
		}, 1000);
	};

	return (
		<div
			className={`
			${
				withWhiteBackground || opened || searchOpened
					? "bg-white md:bg-transparent shadow-md   static top-0 text-black "
					: "absolute shadow-none lg:bg-transparent text-white"
			}			
			  w-full `}>
			<div
				className={`flex items-center gap-2 md:gap-[27px] justify-between  px-5 md:px-10 h-14 lg:h-20`}>
				{(!isMobile || (isMobile && !hasOpenAppButton)) && (
					<div className="flex gap-[24px] items-center w-40 shrink-0">
						<Link href={"/"}>
							<Image
								src="/logo.svg"
								width={100}
								height={100}
								alt="logo"
								className="h-20 w-20 shrink-0 lg:w-52 lg:h-52"
							/>
						</Link>
						<LocalSwitcher />
					</div>
				)}
				{isMobile && hasOpenAppButton && (
					<div className="w-full flex items-center gap-[18px]">
						<button
							onClick={handleOpenApp}
							className="bg-secondary w-[118px] h-[32px] flex items-center text-sm justify-center text-white rounded-full ">
							{isOpeningApp
								? translation.openingApp
								: translation.openApp}
						</button>
						<div className=" w-auto h-full shrink-0">
							<Link href={"/"}>
								<Image
									src="/logo.svg"
									width={100}
									height={100}
									alt="logo"
									className="h-14 w-14 lg:w-52 lg:h-52 shrink-0"
								/>
							</Link>
						</div>
						<LocalSwitcher />
					</div>
				)}
				<SearchInput
					data={data}
					loading={loading}
					className="hidden lg:flex"
					translation={translation}
				/>
				<div className="items-center justify-between hidden gap-[25px] lg:flex  ">
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
				<button
					className={`flex items-center justify-center gap-2 whitespace-nowrap text-white bg-secondary p-2 rounded-full`}
					onClick={() => setIsModalOpened((prev) => !prev)}>
					<FaPlus />
					{translation.addPlace}
				</button>
			</div>

			<div
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

export default memo(Navbar);
