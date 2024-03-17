"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { InputWithLabel } from "@/components/atoms/input-with-label";
import { RPE_CHART } from "@/lib/constants";
import { ToggleRir } from "@/components/molecules/toggle-rir";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function LoadDropCalculations() {
	const [rir, setRir] = useState<"RIR" | "RPE">("RIR");
	const [rounding, setRounding] = useState(0.25);

	const formSchema = z.object({
		"main-weight": z.number().nonnegative().step(0.25),
		"main-reps": z.number().positive().int().max(12),
		"main-rir": z.number().positive().step(0.5).max(6),
		"bakckoff-sets": z.number().positive().int(),
		"bakckoff-reps": z.number().positive().int().max(12),
		"bakckoff-rir": z.number().positive().step(0.5).max(6),
	});

	type FormValues = z.infer<typeof formSchema>;

	const { register, watch } = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	const watchedFields = watch();

	const calculateLoadDrop = () => {
		if (
			!Object.values(watchedFields).every((item) => item) ||
			Object.values(watchedFields).length === 0
		)
			return 0;

		const mainSetRpe =
			rir === "RIR"
				? transformRirToRpe(watchedFields["main-rir"])
				: Math.round(Number(watchedFields["main-rir"]) * 2) / 2;
		const mainSetRir = 10 - mainSetRpe;
		const mainSetReps = watchedFields["main-reps"] || 1;
		type RPE = keyof typeof RPE_CHART;

		const rpe: RPE = mainSetRpe < 4 ? "4" : (mainSetRpe.toString() as RPE);
		const rep = mainSetReps > 12 ? 12 : mainSetReps;

		const modifier = RPE_CHART[rpe][rep - 1];
		const weight = watchedFields["main-weight"];

		const estimatedOneRepMax = weight / modifier;
		const repsInit = 1 - 0.031 * (Number(watchedFields["main-reps"]) + mainSetRir - 1);
		const repsDiff =
			1 -
			0.027 *
				(Number(watchedFields["bakckoff-reps"]) -
					Number(watchedFields["main-reps"]) +
					Number(watchedFields["bakckoff-rir"]) -
					Number(watchedFields["main-rir"]));

		const setModifier = 1 - (Number(watchedFields["bakckoff-sets"]) - 1) * 0.027;

		return estimatedOneRepMax * repsInit * repsDiff * setModifier;
	};
	const transformRirToRpe = (rir: number): number => {
		const roundedRir = Math.round(Number(rir) * 2) / 2;
		const mainSetRpe = 10 - roundedRir;
		return mainSetRpe;
	};

	return (
		<div className="flex flex-col gap-4 py-4">
			<div className="flex items-start gap-10">
				<ToggleRir
					handleClick={() =>
						setRir((prev) => {
							if (prev === "RIR") return "RPE";
							return "RIR";
						})
					}
					value={rir}
				/>
				<div className="flex flex-col">
					<span>select rounding:</span>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<span>{rounding}</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem onClick={() => setRounding(2.5)}>2.5</DropdownMenuItem>
							<DropdownMenuItem onClick={() => setRounding(0.25)}>0.25</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
			<div>
				<h3>Main Set</h3>
				<div className="flex gap-2">
					<InputWithLabel register={register} id="main-weight" label="weight" />
					<InputWithLabel register={register} id="main-reps" label="reps" />
					<InputWithLabel register={register} id="main-rir" label={rir} />
				</div>
			</div>
			<div>
				<h3>Backoff Set</h3>
				<div className="flex gap-2">
					<InputWithLabel register={register} id="bakckoff-sets" label="sets" />
					<InputWithLabel register={register} id="bakckoff-reps" label="reps" />
					<InputWithLabel register={register} id="bakckoff-rir" label={rir} />
				</div>
			</div>

			<div className="flex flex-col">
				<span>Your Load Drop</span>
				<span className="text-6xl">{Math.floor(calculateLoadDrop() / rounding) * rounding}kg</span>
			</div>
		</div>
	);
}
