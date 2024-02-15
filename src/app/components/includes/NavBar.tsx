import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex items-center">
                <div className="flex-1">
                    <Link href="/" className="text-lg font-semibold">
                        Rick & morty API Challenge
                    </Link>
                </div>
            </div>
        </nav>

    )
}