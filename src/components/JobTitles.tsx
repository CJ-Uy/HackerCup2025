import { PlugZap, InspectionPanel, Lock, BrushCleaning, Fence, PaintRoller, Drill, Ellipsis   } from 'lucide-react';

export default function JobTitles() {
    const jobCategories = [
        {
            id: 1,
            title: "Electrician",
            icon: <PlugZap className="w-6 h-6" style={{ color: '#3B82F6' }} />
        },
        {
            id: 2,
            title: "Tiler",
            icon: <InspectionPanel className="w-6 h-6" style={{ color: '#3B82F6' }} />
        },
        {
            id: 3,
            title: "Locksmith",
            icon: <Lock className="w-6 h-6" style={{ color: '#3B82F6' }} />
        },
        {
            id: 4,
            title: "Cleaner",
            icon: <BrushCleaning className="w-6 h-6" style={{ color: '#3B82F6' }} />
        },
        {
            id: 5,
            title: "Gardener",
            icon: <Fence className="w-6 h-6" style={{ color: '#3B82F6' }} />
        },
        {
            id: 6,
            title: "Painter",
            icon: <PaintRoller className="w-6 h-6" style={{ color: '#3B82F6' }} />
        },
        {
            id: 7,
            title: "Carpenter",
            icon: <Drill className="w-6 h-6" style={{ color: '#3B82F6' }} />
        },
        {
            id: 8,
            title: "More",
            icon: <Ellipsis className="w-6 h-6" style={{ color: '#3B82F6' }} />
        }
    ];

    // const handleJobClick = (job) => {
    //     console.log(`Selected job: ${job.title}`);

         // router.push(`/jobs/${job.title.toLowerCase()}`);
    // };

    return (
        <div>
            <div className="grid grid-cols-4 gap-3">
                {jobCategories.map((job) => (
                    <button
                        key={job.id}
                        // onClick={() => handleJobClick(job)}
                        className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl transition-all duration-200 hover:shadow-md active:scale-95"
                        style={{ borderWidth: '1px', borderColor: '#1B365D' }}
                    >
                        <div className="mb-2" >
                            {job.icon}
                        </div>
                        <span className="text-xs font-semibold text-center leading-tight" style={{ color: '#1B365D' }}>
              {job.title}
            </span>
                    </button>
                ))}
            </div>
        </div>
    );
}