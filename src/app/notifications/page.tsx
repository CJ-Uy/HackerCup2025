import React from 'react';
import NotificationCard from "@/components/NotificationCard";

const Page = () => {
    return (
        <div>
            <h1 className="text-2xl font-semibold mb-5">Notifications</h1>

            {/*Sample Notifications*/}
            <NotificationCard />
        </div>
    );
};

export default Page;