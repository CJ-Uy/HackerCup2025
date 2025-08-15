import React from 'react';
import ActivityCard from "@/components/ActivityCard";

const Page = () => {
    return (
        <div>
			<h1 className="mb-5 text-2xl font-semibold">Activity</h1>

			{/*Sample Activities*/}
			<ActivityCard />
        </div>
    );
};

export default Page;