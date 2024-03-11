import { type UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputWithLabelProps = {
	placeholder?: string;
	disabled?: boolean;
	id: string;
	label: string;
	value?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	register?: UseFormRegister<any>;
};

export function InputWithLabel({
	placeholder,
	id,
	label,
	disabled,
	value,
	register,
}: InputWithLabelProps) {
	const registerValues = register?.(id) || {};
	return (
		<div className="grid w-full max-w-sm items-center gap-1.5">
			<Label htmlFor={id}>{label}</Label>
			<Input
				id={id}
				placeholder={placeholder}
				disabled={disabled}
				value={value}
				{...registerValues}
			/>
		</div>
	);
}
