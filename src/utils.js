export function getFormattedTime(time) {
	const dateObject = new Date(Number(time));
	const options = {
		hour: '2-digit',
		minute: '2-digit',
		hour12: true
	}
	
	const formattedTime = dateObject?.toLocaleTimeString('en-US', options);
	return formattedTime;
}