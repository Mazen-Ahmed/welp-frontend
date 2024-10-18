export const dynamic = "force-dynamic"; // defaults to auto

export async function getUserLocation(latitude: number, longitude: number) {
	try {
		const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

		const response = await fetch(url);

		const data = await response.json();

		return data.address;
	} catch (error) {
		return error;
	}
}
