import { routesUrls } from "data";
import { Link } from "navigation";
import Image from "next/image";

export const dynamic = "force-dynamic"; // defaults to auto

const NotFound = () => {
	const { home } = routesUrls;
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
			<Image src="/404.webp" width={400} height={400} alt="logo" />

			<p style={{ fontSize: 30 }}> 404 | Not Found </p>

			<Link
				href={home}
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
