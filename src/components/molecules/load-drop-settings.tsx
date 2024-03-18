import { type Dispatch, type SetStateAction } from "react";
import { ToggleRir } from "@/components/molecules/toggle-rir";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type LoadDropSettingsProps = {
	rir: "RPE" | "RIR";
	rounding: number;
	setRir: Dispatch<SetStateAction<"RIR" | "RPE">>;
	setRounding: Dispatch<SetStateAction<number>>;
};

export function LoadDropSettings({ rir, rounding, setRir, setRounding }: LoadDropSettingsProps) {
	return (
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
	);
}
