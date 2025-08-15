import React from "react";

const NotificationCard = () => {
	return (
		<div className="flex flex-col gap-2 rounded-xl border-2 px-4 py-3">
			{/*Hard Coded*/}
			<div className="flex items-center justify-between">
				<h1 className="font-semibold">A partner accepted your bid</h1>
				<p className="text-sm opacity-50">1 hour ago</p>
			</div>
			<div className="flex items-center gap-2 text-sm">
				{/*Put the avatar of the user here*/}
				<div className="size-5 rounded-full bg-red-500" />
				<p>
					Kurt Oswill · <span className="opacity-50">Electrician</span>
				</p>
			</div>
		</div>
	);
};

export default NotificationCard;
