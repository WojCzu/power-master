// hooks/useLoadDropCalculation.ts
import { useMemo } from "react";
import { type FormValues } from "./useLoadDropForm";
import { type RPE, RPE_CHART } from "@/lib/constants";

export function useLoadDropCalculation(
	watchedFields: FormValues,
	rir: "RIR" | "RPE",
	rounding: number,
) {
	const calculateLoadDrop = useMemo(() => {
		if (
			!Object.values(watchedFields).every((item) => item) ||
			Object.values(watchedFields).length === 0
		)
			return 0;

		const { mainWeight, mainReps, mainRir, backoffSets, backoffReps, backoffRir } = parseFormValues(
			watchedFields,
			rir === "RIR",
		);

		const mainRpe = 10 - mainRir;
		const rpe = mainRpe.toString() as RPE;

		const modifier = RPE_CHART[rpe][mainReps - 1];

		const estimatedOneRepMax = mainWeight / modifier;
		const repsInit = 1 - 0.031 * (mainReps + mainRir - 1);
		const repsDiff = 1 - 0.027 * (backoffReps - mainReps + backoffRir - mainRir);
		const setModifier = 1 - (backoffSets - 1) * 0.027;

		const result = estimatedOneRepMax * repsInit * repsDiff * setModifier;
		return Math.floor(result / rounding) * rounding;
	}, [watchedFields, rir, rounding]);

	return calculateLoadDrop;
}

const parseFormValues = (watchedFields: FormValues, isRir: boolean) => {
	const parseAndConstrain = (value: string, step: number, max: number, min: number) => {
		let parsedValue = parseFloat(value.replaceAll(",", "."));
		if (isNaN(parsedValue)) parsedValue = min;

		parsedValue = Math.round(parsedValue / step) * step;
		parsedValue = Math.min(Math.max(parsedValue, min), max);

		return parsedValue;
	};

	return {
		mainWeight: parseAndConstrain(watchedFields.mainWeight, 0.25, Infinity, 0),
		mainReps: parseAndConstrain(watchedFields.mainReps, 1, 12, 1),
		mainRir: isRir
			? parseAndConstrain(watchedFields.mainRir, 0.5, 6, 0)
			: 10 - parseAndConstrain(watchedFields.mainRir, 0.5, 10, 4),
		backoffSets: parseAndConstrain(watchedFields.backoffSets, 1, Infinity, 1),
		backoffReps: parseAndConstrain(watchedFields.backoffReps, 1, 12, 1),
		backoffRir: isRir
			? parseAndConstrain(watchedFields.backoffRir, 0.5, 6, 0)
			: 10 - parseAndConstrain(watchedFields.backoffRir, 0.5, 10, 4),
	};
};
