import Link from "next/link";
import Image from "next/image";
import React from "react";

const ContactInfo = ({ translation }: { translation: any }) => {
	return (
		<div className="my-10 grid gap-5 grid-cols-1 md:grid-cols-2 py-10 px-5 md:px-10 bg-gray-businesses">
			<div className="flex items-center justify-center">
				<Image
					src={"/contactBody.png"}
					alt="contact info"
					width={400}
					height={600}
				/>
			</div>
			<div className="flex flex-col px-[27px] md:px-0 items-start  ">
				<h2 className="text-[20px] md:text-[40px]">
					{translation.contactInfo}
				</h2>

				<h3 className="text-[20px] mt-4 ">{translation.address}</h3>
				<p className="mb-4">956 N Grand Ave, Covina, CA 91724, USA</p>
				<h3 className="text-[20px] ">{translation.email}</h3>
				<Link
					href={"mailto:Info@welpstar.com"}
					target="_blank"
					className="underline flex-1 mb-4">
					Info@welpstar.com
				</Link>
				<h3 className="text-[20px] ">{translation.callUs}</h3>
				<p dir="ltr" className="mb-4 flex items-center">
					+1(949) 993-8566 - +201229999268
				</p>
				<h3 className="text-[20px] ">{translation.followUs}</h3>

				<div className="flex gap-2 ">
					<Link target="_blank" href={"https://x.com/Welpusa"}>
						<Image
							loading="lazy"
							src="/x.svg"
							width={30}
							height={30}
							alt="x"
						/>
					</Link>
					<Link
						target="_blank"
						href={"https://www.facebook.com/welpegy"}>
						<Image
							src="/facebook.svg"
							width={30}
							height={30}
							alt="facebook"
						/>
					</Link>

					<Link
						target="_blank"
						href={"https://instagram.com/welpegy"}>
						<Image
							src="/instagram.svg"
							width={30}
							height={30}
							alt="instagram"
						/>
					</Link>
					<Link
						target="_blank"
						href={"https://www.tiktok.com/@welpegy"}>
						<Image
							src="/tiktok.svg"
							width={30}
							height={30}
							alt="tiktok"
						/>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ContactInfo;
