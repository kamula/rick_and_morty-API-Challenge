import Link from "next/link";

interface Location {
    id: number;
    name: string;
    type: string;
    residents: any[]; 
}

interface LocationTableProps {
    data: any[]
}


export default function LocationTable({ data }: LocationTableProps) {
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="py-3 px-6">
                            Location Name
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Type
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Residents Count
                        </th>
                        <th scope="col" className="py-3 px-6">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((location) => (
                        <tr key={location.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="py-4 px-6">
                                {location.name}
                            </td>
                            <td className="py-4 px-6">
                                {location.type}
                            </td>
                            <td className="py-4 px-6">
                                {location.residents.length}
                            </td>
                            <td className="py-4 px-6">
                                <Link href={`/locations/${location.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}