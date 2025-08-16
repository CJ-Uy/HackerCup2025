// Example of a flexible ProfileMenuItem.tsx component

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Props {
	icon: React.ReactNode;
	label: string;
	href?: string;
	onClick?: () => void;
}

export function ProfileMenuItem({ icon, label, href, onClick }: Props) {
	const content = (
		<div className="flex items-center p-4">
			<div className="text-gray-600">{icon}</div>
			<span className="ml-4 flex-1 text-gray-800">{label}</span>
			{/* Show chevron only for links, not for actions like logout */}
			{href && <ChevronRight size={20} className="text-gray-400" />}
		</div>
	);

	// If href is provided, render a Next.js Link
	if (href) {
		return (
			<Link href={href} className="block cursor-pointer transition-colors hover:bg-gray-50">
				{content}
			</Link>
		);
	}

	// Otherwise, render a button for the onClick action
	return (
		<button onClick={onClick} className="w-full text-left transition-colors hover:bg-gray-50">
			{content}
		</button>
	);
}
