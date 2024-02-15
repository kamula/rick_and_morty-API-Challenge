interface TopCountCardProps {
    residentsCount: number; 
}

export default function TopCountCard({ residentsCount }: TopCountCardProps) {
    return (
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Total Residents:</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{residentsCount}</p>
            </div>
        </div>
    );
}
