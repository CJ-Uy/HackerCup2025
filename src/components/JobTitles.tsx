import {
	PlugZap,
	InspectionPanel,
	Lock,
	BrushCleaning,
	Fence,
	PaintRoller,
	Drill,
	Ellipsis,
} from "lucide-react";

export default function JobTitles() {
	const jobCategories = [
		{
			id: 1,
			title: "Electrician",
			icon: <PlugZap className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
		{
			id: 2,
			title: "Tiler",
			icon: <InspectionPanel className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
		{
			id: 3,
			title: "Locksmith",
			icon: <Lock className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
		{
			id: 4,
			title: "Cleaner",
			icon: <BrushCleaning className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
		{
			id: 5,
			title: "Gardener",
			icon: <Fence className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
		{
			id: 6,
			title: "Painter",
			icon: <PaintRoller className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
		{
			id: 7,
			title: "Carpenter",
			icon: <Drill className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
		{
			id: 8,
			title: "More",
			icon: <Ellipsis className="h-6 w-6" style={{ color: "#3B82F6" }} />,
		},
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
						className="flex flex-col items-center justify-center rounded-2xl bg-white p-4 transition-all duration-200 hover:shadow-md active:scale-95"
						style={{ borderWidth: "1px", borderColor: "#1B365D" }}
					>
						<div className="mb-2">{job.icon}</div>
						<span
							className="text-center text-xs leading-tight font-semibold"
							style={{ color: "#1B365D" }}
						>
							{job.title}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}
