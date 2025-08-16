import React from "react";
import NotificationsCard from "@/components/NotificationsCard";

const Page = () => {
	return (
		<div>
			<h1 className="mb-5 text-2xl font-semibold">Notifications</h1>

			{/*Sample Notifications*/}
			<NotificationsCard />
		</div>
	);
};

export default Page;
