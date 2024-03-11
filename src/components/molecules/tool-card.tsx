import { ChevronRightIcon } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type ToolCardProps = {
	title: string;
	description: string;
};

export function ToolCard({ title, description }: ToolCardProps) {
	return (
		<Card className="flex w-max items-center gap-6 p-6">
			<CardHeader className="p-0">
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
			<ChevronRightIcon />
		</Card>
	);
}
