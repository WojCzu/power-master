import { type UseFormRegister, type FieldValues, type Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps<TFormValues extends FieldValues> = {
	placeholder?: string;
	disabled?: boolean;
	id: Path<TFormValues>;
	label: string;
	value?: string;
	register?: UseFormRegister<TFormValues>;
};

export function InputWithLabel<TFormValues extends FieldValues>({
	placeholder,
	id,
	label,
	disabled,
	value,
	register,
}: InputWithLabelProps<TFormValues>) {
	const registerValues = register ? register(id) : {};
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor={id as string}>{label}</Label>
			<Input
				id={id as string}
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				{...registerValues}
			/>
		</div>
	);
}
