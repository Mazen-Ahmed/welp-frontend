// @ts-ignore
import * as lookup from "coordinate_to_country";

export default function handler(req: any, res: any) {
	const { lat, long } = req.query;

	if (!lat || !long) {
		return res.status(400).json({ error: "Missing coordinates" });
	}

	const country = lookup(long, lat, true);
	res.status(200).json({ country: country[0] });
}
