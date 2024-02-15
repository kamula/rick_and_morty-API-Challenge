import TopCountCard from '@/app/components/locations/TopCountCard';
import { fetchLocationDetails } from '../../lib/data'
import Link from 'next/link';
import ResidentCard from '@/app/components/locations/ResidentCard';

interface LocationPageProps {
    params: any;
}

export default async function LocationPage({ params }: LocationPageProps) {
    const { id } = params
    const data = await fetchLocationDetails(id)
    const { name, residents } = data
    return (
        <div className="mx-auto p-4">
            {/* Breadcrumb */}
            <nav className="flex mb-2" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="mr-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8v13a2 2 0 002 2h3m14-2a2 2 0 01-2 2H5a2 2 0 01-2-2V8m2 0V5a2 2 0 012-2h10a2 2 0 012 2v3m-6 9v-5m0 0l-4 4m4-4l4 4"></path>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            <Link href="/" className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Locations</Link>
                        </div>
                    </li>

                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">{name}</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <div>
                <TopCountCard residentsCount={residents.length} />
            </div>
            <div className='mt-2'>
                <h1 className='font-bold'>Residents</h1>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {residents.map((resident: any) => (
                        <Link key={resident.id} href={`/residents/${resident.id}`}>
                            <ResidentCard name={resident.name} status={resident.status} image={resident.image} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}