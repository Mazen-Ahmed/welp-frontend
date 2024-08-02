import Image from "next/image";

const ForBusinessesHeader = ({ translation }: { translation: any }) => {
	return (
		<div className="flex  md:flex-row flex-col px-5 md:px-10 pt-10 md:pt-5  items-center w-full justify-start min-h-[80vh] md:min-h-[90vh]">
			<div className="md:flex-1 h-[30vh]  md:h-[70vh] ">
				<Image
					src="/businesses-header.svg"
					width={200}
					height={200}
					alt="business"
					className="h-full w-full"
				/>
			</div>
			<div className="flex flex-1 flex-col ">
				<div className="font-bold text-[20px] md:text-[30px]">
					{translation.presence}
				</div>
				<div className=" flex gap-[31px] mt-4">
					<Image
						src={"/google-store.png"}
						width={150}
						height={120}
						alt="google"
					/>
					<Image
						src={"/app-store.png"}
						width={150}
						height={120}
						alt="apple"
					/>
				</div>
			</div>
		</div>
	);
};

export default ForBusinessesHeader;
