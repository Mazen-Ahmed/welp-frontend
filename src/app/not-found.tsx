import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic"; // defaults to auto

const NotFound = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100vh",
				background: "#fff",
				fontFamily: " 'Poppins', sans-serif",
			}}>
			<Image src="/404.jpg" width={400} height={400} alt="logo" />

			<p style={{ fontSize: 30 }}> 404 | Not Found </p>

			<Link
				href="/"
				style={{
					fontSize: 18,
					textDecoration: "underline",
				}}>
				Back to home
			</Link>
		</div>
	);
};

export default NotFound;
