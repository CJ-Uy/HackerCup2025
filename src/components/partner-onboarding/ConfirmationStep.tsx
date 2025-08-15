import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export function ConfirmationStep() {
	return (
		<div className="flex flex-col items-center justify-center space-y-6 py-12 text-center">
			<CheckCircle className="h-16 w-16 text-green-500" />
			<div className="space-y-2">
				<h2 className="text-3xl font-bold">You're All Set!</h2>
				<p className="text-muted-foreground max-w-sm">
					Your partner profile has been created. You will now appear in searches and can start
					bidding on jobs.
				</p>
			</div>
			<Button asChild>
				<Link href="/profile">View My Partner Profile</Link>
			</Button>
		</div>
	);
}
