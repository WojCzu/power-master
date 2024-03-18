"use client";

import { useState } from "react";
import { useLoadDropForm } from "@/lib/hooks/useLoadDropForm";
import { useLoadDropCalculation } from "@/lib/hooks/useLoadDropCalculation";
import { LoadDropSettings } from "@/components/molecules/load-drop-settings";
import { LoadDropForm } from "@/components/molecules/load-drop-form";

export function LoadDropCalculations() {
	const { register, watchedFields } = useLoadDropForm();
	const [rir, setRir] = useState<"RIR" | "RPE">("RIR");
	const [rounding, setRounding] = useState(0.25);
	const loadDrop = useLoadDropCalculation(watchedFields, rir, rounding);

	return (
		<div className="flex flex-col gap-4 py-4">
			<LoadDropSettings rir={rir} rounding={rounding} setRir={setRir} setRounding={setRounding} />
			<LoadDropForm register={register} rir={rir} />

			<div className="flex flex-col">
				<span>Your Load Drop</span>
				<span className="text-6xl">{loadDrop}kg</span>
			</div>
		</div>
	);
}
