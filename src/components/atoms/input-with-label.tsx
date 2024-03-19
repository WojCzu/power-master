import { type UseFormRegister, type FieldValues, type Path } from "react-hook-form";
import { type InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps<TFormValues extends FieldValues> =
	InputHTMLAttributes<HTMLInputElement> & {
		id: Path<TFormValues>;
		label: string;
		register?: UseFormRegister<TFormValues>;
	};

export function InputWithLabel<TFormValues extends FieldValues>({
	id,
	label,
	register,
	...inputProps
}: InputWithLabelProps<TFormValues>) {
	const registerValues = register ? register(id) : {};
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor={id as string}>{label}</Label>
			<Input id={id as string} {...inputProps} {...registerValues} />
		</div>
	);
}
