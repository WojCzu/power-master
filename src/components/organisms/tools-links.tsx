import Link from "next/link";
import { ToolCard } from "@/components/molecules/tool-card";

export function ToolsLinks() {
	const TOOLS = [
		{
			href: "/tools/load-drop",
			title: "Load Drop",
			description: "Calculate load drop for backoff set",
		},
	] as const;

	return (
		<ul>
			{TOOLS.map((tool) => (
				<li key={tool.href}>
					<Link href={tool.href} className="block w-max ">
						<ToolCard title={tool.title} description={tool.description} />
					</Link>
				</li>
			))}
		</ul>
	);
}
