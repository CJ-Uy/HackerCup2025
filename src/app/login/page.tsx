"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { type Session } from "@supabase/supabase-js";
import { AuthModal } from "@/components/auth/AuthModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
	const [session, setSession] = useState<Session | null>(null);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const supabase = createClient();
	const router = useRouter();

	useEffect(() => {
		// Fetch initial session
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		// Listen for auth state changes
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});

		return () => subscription.unsubscribe();
	}, [supabase.auth]);

	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.push("/"); // Redirect to home after sign out
	};

	return (
		<>
			<nav className="flex items-center justify-between p-4">
				<div>
					{session ? (
						<div className="flex items-center gap-4">
							<span className="text-sm">{session.user.email}</span>
							<Button variant="outline" onClick={handleSignOut}>
								Sign Out
							</Button>
						</div>
					) : (
						<Button onClick={() => setIsAuthModalOpen(true)}>Login</Button>
					)}
				</div>
			</nav>

			{/* The Auth Modal is controlled by the state above */}
			<AuthModal open={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
		</>
	);
}
