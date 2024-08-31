import { redirect } from "next/navigation";

export const dynamic = "force-dynamic"; // defaults to auto

const RootPage = ({ params }: { params: any }) => {
	redirect("/ar");
};

export default RootPage;
