// src/components/ImportantNotification.tsx
"use client";

import React, { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ImportantNotificationProps {
	// <-- RENAMED
	show: boolean;
	message: string;
	onClose: () => void;
}

const ImportantNotification = ({ show, message, onClose }: ImportantNotificationProps) => {
	// <-- RENAMED
	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => {
				onClose();
			}, 5000); // Auto-close after 5 seconds
			return () => clearTimeout(timer);
		}
	}, [show, onClose]);

	return (
		<div
			className={`fixed top-5 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4 transition-all duration-300 ease-in-out ${
				show ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
			}`}
		>
			<div className="flex items-center rounded-lg border border-green-300 bg-green-100 p-4 text-green-800 shadow-lg">
				<CheckCircle2 className="mr-3 h-6 w-6 flex-shrink-0" />
				<p className="flex-1 text-sm font-medium">{message}</p>
				<button
					onClick={onClose}
					className="ml-4 rounded-full p-1 transition-colors hover:bg-green-200"
				>
					<X className="h-5 w-5" />
				</button>
			</div>
		</div>
	);
};

export default ImportantNotification; // <-- RENAMED
