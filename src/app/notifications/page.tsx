import React from "react";
import NotificationCard from "@/components/NotificationCard";

const Page = () => {
	return (
		<div>
			<h1 className="mb-5 text-2xl font-semibold">Notifications</h1>

			{/*Sample Notifications*/}
			<NotificationCard />
		</div>
	);
};

export default Page;
