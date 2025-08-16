import React from 'react';

// Service Request Data
const serviceRequests = [
    // RECENT (Hours/Minutes ago)
    {
        id: 1,
        service: "I need a plumber",
        status: "pending",
        createdAt: "3 hours ago",
        partner: "John Martinez",
        profession: "Plumber",
        avatarColor: "bg-blue-500",
        timeCategory: "recent"
    },
    {
        id: 2,
        service: "I need an electrician",
        status: "job done",
        createdAt: "5 hours ago",
        partner: "Sarah Wilson",
        profession: "Electrician",
        avatarColor: "bg-green-500",
        timeCategory: "recent"
    },
    {
        id: 3,
        service: "I need a carpenter",
        status: "in progress",
        createdAt: "8 hours ago",
        partner: "Mike Chen",
        profession: "Carpenter",
        avatarColor: "bg-yellow-500",
        timeCategory: "recent"
    },
    {
        id: 4,
        service: "I need an HVAC technician",
        status: "cancelled",
        createdAt: "12 hours ago",
        partner: "Lisa Rodriguez",
        profession: "HVAC Technician",
        avatarColor: "bg-red-500",
        timeCategory: "recent"
    },
    {
        id: 5,
        service: "I need a landscaper",
        status: "pending",
        createdAt: "18 hours ago",
        partner: "David Park",
        profession: "Landscaper",
        avatarColor: "bg-purple-500",
        timeCategory: "recent"
    },
    {
        id: 25,
        service: "I need a gutter cleaner",
        status: "cancelled",
        createdAt: "15 minutes ago",
        partner: "Ryan Cooper",
        profession: "Gutter Cleaner",
        avatarColor: "bg-indigo-600",
        timeCategory: "recent"
    },
    {
        id: 21,
        service: "I need a flooring contractor",
        status: "pending",
        createdAt: "45 minutes ago",
        partner: "Kurt Oswill",
        profession: "Flooring Contractor",
        avatarColor: "bg-blue-600",
        timeCategory: "recent"
    },

    // THIS WEEK (Days ago)
    {
        id: 6,
        service: "I need a house cleaner",
        status: "job done",
        createdAt: "2 days ago",
        partner: "Emma Thompson",
        profession: "House Cleaner",
        avatarColor: "bg-pink-500",
        timeCategory: "days"
    },
    {
        id: 7,
        service: "I need a roofer",
        status: "pending",
        createdAt: "3 days ago",
        partner: "Robert Kim",
        profession: "Roofer",
        avatarColor: "bg-indigo-500",
        timeCategory: "days"
    },
    {
        id: 8,
        service: "I need a painter",
        status: "in progress",
        createdAt: "4 days ago",
        partner: "Anna Garcia",
        profession: "Painter",
        avatarColor: "bg-teal-500",
        timeCategory: "days"
    },
    {
        id: 9,
        service: "I need a locksmith",
        status: "job done",
        createdAt: "5 days ago",
        partner: "Tom Anderson",
        profession: "Locksmith",
        avatarColor: "bg-orange-500",
        timeCategory: "days"
    },
    {
        id: 10,
        service: "I need a handyman",
        status: "cancelled",
        createdAt: "6 days ago",
        partner: "Maria Santos",
        profession: "Handyman",
        avatarColor: "bg-cyan-500",
        timeCategory: "days"
    },
    {
        id: 22,
        service: "I need a bathroom remodeler",
        status: "in progress",
        createdAt: "1 day ago",
        partner: "Linda Davis",
        profession: "Bathroom Remodeler",
        avatarColor: "bg-purple-600",
        timeCategory: "days"
    },

    // RECENT WEEKS
    {
        id: 11,
        service: "I need a tile installer",
        status: "job done",
        createdAt: "2 weeks ago",
        partner: "James Lee",
        profession: "Tile Installer",
        avatarColor: "bg-emerald-500",
        timeCategory: "weeks"
    },
    {
        id: 12,
        service: "I need a pest control specialist",
        status: "pending",
        createdAt: "2 weeks ago",
        partner: "Nicole Brown",
        profession: "Pest Control",
        avatarColor: "bg-violet-500",
        timeCategory: "weeks"
    },
    {
        id: 13,
        service: "I need a pool cleaner",
        status: "in progress",
        createdAt: "3 weeks ago",
        partner: "Carlos Mendez",
        profession: "Pool Cleaner",
        avatarColor: "bg-sky-500",
        timeCategory: "weeks"
    },
    {
        id: 14,
        service: "I need a window cleaner",
        status: "cancelled",
        createdAt: "3 weeks ago",
        partner: "Jessica Wang",
        profession: "Window Cleaner",
        avatarColor: "bg-rose-500",
        timeCategory: "weeks"
    },
    {
        id: 15,
        service: "I need a garage door repair",
        status: "job done",
        createdAt: "4 weeks ago",
        partner: "Alex Johnson",
        profession: "Garage Door Tech",
        avatarColor: "bg-amber-500",
        timeCategory: "weeks"
    },
    {
        id: 23,
        service: "I need a kitchen installer",
        status: "job done",
        createdAt: "1 week ago",
        partner: "Mark Wilson",
        profession: "Kitchen Installer",
        avatarColor: "bg-green-600",
        timeCategory: "weeks"
    },

    // MONTHS AGO
    {
        id: 16,
        service: "I need a septic tank service",
        status: "job done",
        createdAt: "2 months ago",
        partner: "Kevin O'Connor",
        profession: "Septic Service",
        avatarColor: "bg-lime-500",
        timeCategory: "months"
    },
    {
        id: 17,
        service: "I need a tree removal service",
        status: "cancelled",
        createdAt: "2 months ago",
        partner: "Rachel Green",
        profession: "Tree Service",
        avatarColor: "bg-stone-500",
        timeCategory: "months"
    },
    {
        id: 18,
        service: "I need a driveway paver",
        status: "job done",
        createdAt: "3 months ago",
        partner: "Steve Martinez",
        profession: "Paver",
        avatarColor: "bg-gray-500",
        timeCategory: "months"
    },
    {
        id: 19,
        service: "I need a fence installer",
        status: "cancelled",
        createdAt: "4 months ago",
        partner: "Diana Chang",
        profession: "Fence Installer",
        avatarColor: "bg-zinc-500",
        timeCategory: "months"
    },
    {
        id: 20,
        service: "I need a solar panel installer",
        status: "job done",
        createdAt: "5 months ago",
        partner: "Brian Foster",
        profession: "Solar Installer",
        avatarColor: "bg-yellow-600",
        timeCategory: "months"
    },
    {
        id: 24,
        service: "I need a chimney cleaner",
        status: "pending",
        createdAt: "1 month ago",
        partner: "Sophie Turner",
        profession: "Chimney Cleaner",
        avatarColor: "bg-red-600",
        timeCategory: "months"
    }
];

const NotificationsCard = () => {
    // Function to get notifications message based on status
    const getNotificationsMessage = (status) => {
        switch (status) {
            case 'pending':
                return 'A partner accepted your bid';
            case 'in progress':
                return 'Work has started on your request';
            case 'job done':
                return 'Your service request was completed';
            case 'cancelled':
                return 'Service request was cancelled';
            default:
                return 'Notifications update';
        }
    };

    // Filter notifications by time category
    const recentNotifications = serviceRequests.filter(req => req.timeCategory === 'recent');
    const daysNotifications = serviceRequests.filter(req => req.timeCategory === 'days');
    const weeksNotifications = serviceRequests.filter(req => req.timeCategory === 'weeks');
    const monthsNotifications = serviceRequests.filter(req => req.timeCategory === 'months');

    // Component to render notifications cards
    const renderNotificationsCards = (notifications) => (
        <div className="space-y-3 mb-6">
            {notifications.map((request) => (
                <div key={request.id} className="flex flex-col gap-2 rounded-xl border-2 px-4 py-3">
                    {/* Notifications Header */}
                    <div className="flex items-center justify-between">
                        <h1 className="font-semibold">{getNotificationsMessage(request.status)}</h1>
                        <p className="text-sm whitespace-nowrap ml-5 opacity-50">{request.createdAt}</p>
                    </div>

                    {/* Partner Info */}
                    <div className="flex items-center gap-2 text-sm">
                        {/* Avatar */}
                        <div className={`size-5 rounded-full ${request.avatarColor}`} />
                        <p>
                            {request.partner} · <span className="opacity-50">{request.profession}</span>
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div>
            {/* Recent Section (within 1 day) */}
            {recentNotifications.length > 0 && (
                <div>
                    <h1 className="text-lg mb-2 font-semibold">Recent</h1>
                    {renderNotificationsCards(recentNotifications)}
                </div>
            )}

            {/* Days Section (1-6 days ago) */}
            {daysNotifications.length > 0 && (
                <div>
                    <h1 className="text-lg mb-2 font-semibold">This Week</h1>
                    {renderNotificationsCards(daysNotifications)}
                </div>
            )}

            {/* Weeks Section (1-4 weeks ago) */}
            {weeksNotifications.length > 0 && (
                <div>
                    <h1 className="text-lg mb-2 font-semibold">Past Weeks</h1>
                    {renderNotificationsCards(weeksNotifications)}
                </div>
            )}

            {/* Months Section (1+ months ago) */}
            {monthsNotifications.length > 0 && (
                <div>
                    <h1 className="text-lg mb-2 font-semibold">Past Months</h1>
                    {renderNotificationsCards(monthsNotifications)}
                </div>
            )}
        </div>
    );
};

export default NotificationsCard;