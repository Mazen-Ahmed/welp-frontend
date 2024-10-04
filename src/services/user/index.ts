import { setCookie } from "cookies-next";
import { toast } from "react-toastify";

export const getCurrentUserLocation = async (coords: any) => {
	fetch(`/api/location?lat=${coords.latitude}&long=${coords.longitude}`)
		.then((response) => response.json())
		.then((data) => {
			if (data.country) {
				const expiryDate = new Date();
				expiryDate.setDate(expiryDate.getDate() + 3);
				setCookie(
					"location",
					{
						country: data.country,
						long: coords.longitude,
						lat: coords.latitude,
					},
					{ expires: expiryDate }
				);
				window.location.reload();
			}
		})
		.catch(() => {
			toast.error("Failed to retrieve location.");
		});
};
