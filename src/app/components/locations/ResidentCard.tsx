import Image from "next/image";

interface ResidentCardProps {
    name: String;
    status: String;
    image: any;
}

export default function ResidentCard({ name, status, image }: ResidentCardProps) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image
                className="w-full"
                src={image}
                alt={`Image of ${name}`}
                width={500}
                height={500}
            />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">
                    Status: {status}
                </p>
            </div>
        </div>
    )
}