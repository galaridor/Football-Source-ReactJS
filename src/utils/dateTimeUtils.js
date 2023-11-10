export function formatDateToDDMMYYYY(dateTimeString) {
	const date = new Date(dateTimeString);

	if (isNaN(date.getTime())) {
		return "Invalid Date";
	}

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	return `${day}-${month}-${year}`;
}