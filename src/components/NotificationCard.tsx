import React from 'react';

const NotificationCard = () => {
    return (
        <div className="px-4 py-3 border-2 rounded-xl flex flex-col gap-2">
            {/*Hard Coded*/}
            <div className="flex justify-between items-center">
                <h1 className="font-semibold">A partner accepted your bid</h1>
                <p className="opacity-50 text-sm">1 hour ago</p>
            </div>
            <div className="flex items-center gap-2 text-sm">
                {/*Put the avatar of the user here*/}
                <div className="rounded-full bg-red-500 size-5" />
                <p>Kurt Oswill · <span className="opacity-50">Electrician</span></p>
            </div>
        </div>
    );
};

export default NotificationCard;