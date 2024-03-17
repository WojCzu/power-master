import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ToggleRirProps = {
	value: "RIR" | "RPE";
	handleClick: () => void;
};

export function ToggleRir({ value, handleClick }: ToggleRirProps) {
	return (
		<Button
			className="relative bg-transparent p-10 shadow-none hover:bg-transparent [&>*]:hover:bg-primary/90"
			onClick={handleClick}
		>
			<Item isSelected={value === "RIR"}>RIR</Item>
			<Item isSelected={value === "RPE"}>RPE</Item>
		</Button>
	);
}

type ItemProps = {
	children: ReactNode;
	isSelected: boolean;
};

function Item({ children, isSelected }: ItemProps) {
	return (
		<span
			className={cn(
				"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-primary px-4 py-2 shadow transition-transform ",
				{
					"-z-10 -translate-y-full translate-x-1/3 text-[0.75em]": !isSelected,
				},
			)}
		>
			{children}
		</span>
	);
}
