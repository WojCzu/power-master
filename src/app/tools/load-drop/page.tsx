import { LoadDropCalculations } from "@/components/organisms/load-drop";

export default function LoadDrop() {
	return (
		<>
			<h1 className="text-2xl font-bold">Calculate Load Drop</h1>
			<p>Add all the data for the main set and the assumed data to be done in the backoff sets</p>

			<LoadDropCalculations />
		</>
	);
}
