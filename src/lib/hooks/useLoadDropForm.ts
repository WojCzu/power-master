import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
	mainWeight: z.number().nonnegative().step(0.25),
	mainReps: z.number().positive().int().max(12),
	mainRir: z.number().positive().step(0.5).max(6),
	backoffSets: z.number().positive().int(),
	backoffReps: z.number().positive().int().max(12),
	backoffRir: z.number().positive().step(0.5).max(6),
});

export type FormValues = {
	mainWeight: string;
	mainReps: string;
	mainRir: string;
	backoffSets: string;
	backoffReps: string;
	backoffRir: string;
};

export function useLoadDropForm() {
	const formMethods = useForm<FormValues>({
		resolver: zodResolver(formSchema),
	});

	const watchedFields = formMethods.watch();

	return { ...formMethods, watchedFields };
}
