import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Props {
	icon: React.ReactNode;
	label: string;
	href: string;
}

export function ProfileMenuItem({ icon, label, href }: Props) {
	return (
		<Link href={href}>
			<div className="flex cursor-pointer items-center justify-between p-4 hover:bg-gray-50">
				<div className="flex items-center gap-4">
					<span className="text-blue-600">{icon}</span>
					<span className="font-medium text-gray-800">{label}</span>
				</div>
				<ChevronRight className="h-5 w-5 text-gray-400" />
			</div>
		</Link>
	);
}
