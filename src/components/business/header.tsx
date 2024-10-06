import Image from "next/image";

const BusinessesHeader = ({
	title,
	city,
	type,
	image,
}: {
	title: string | null;
	city: string;
	type: string;
	image: string;
}) => {
	return (
		<div
			className={`h-[50vh] md:h-129   bg-scroll bg-cover bg-center bg-no-repeat md:bg-fixed`}
			style={{
				backgroundImage: `url(${image}) `,
			}}>
			<div
				className="w-full h-full flex flex-col items-center justify-center gap-10 text-white "
				style={{
					background:
						"linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4))",
				}}>
				<h1 className="text-3xl font-bold text-center"> {title}</h1>

				<div className=" flex items-center gap-5">
					<div className="relative  flex items-center justify-center">
						<Image
							src={"/subtitle.png"}
							width={200}
							height={200}
							alt="subtitle"
						/>
						<h2 className=" absolute  text-lg">{city}</h2>
					</div>
					<div className="relative  flex items-center flex-wrap justify-center">
						<Image
							src={"/subtitle.png"}
							width={200}
							height={200}
							alt="subtitle"
						/>
						<h2 className=" absolute text-lg ">{type}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BusinessesHeader;
