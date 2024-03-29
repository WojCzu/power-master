import { type UseFormRegister } from "react-hook-form";
import { InputWithLabel } from "@/components/atoms/input-with-label";
import { type FormValues } from "@/lib/hooks/useLoadDropForm";

type LoadDropFormProps = {
	rir: "RPE" | "RIR";
	register: UseFormRegister<FormValues>;
};

export function LoadDropForm({ rir, register }: LoadDropFormProps) {
	return (
		<>
			<div>
				<h3>Main Set</h3>
				<div className="flex gap-2">
					<InputWithLabel register={register} id="mainWeight" label="weight" type="number" />
					<InputWithLabel register={register} id="mainReps" label="reps" type="number" />
					<InputWithLabel register={register} id="mainRir" label={rir} type="number" />
				</div>
			</div>
			<div>
				<h3>Backoff Set</h3>
				<div className="flex gap-2">
					<InputWithLabel register={register} id="backoffSets" label="sets" type="number" />
					<InputWithLabel register={register} id="backoffReps" label="reps" type="number" />
					<InputWithLabel register={register} id="backoffRir" label={rir} type="number" />
				</div>
			</div>
		</>
	);
}
