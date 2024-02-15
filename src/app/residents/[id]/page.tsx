import CharacterDetailCard from '../../components/residents/CharacterDetailCard';
import { fetchCharacterDetails } from '../../lib/data'



interface ResidentPageProps {
    params: any;
}

export default async function ResidentPage({ params }: ResidentPageProps) {
    const { id } = params
    const data = await fetchCharacterDetails(id)

    return (
        <div className="mx-auto p-4">
            <CharacterDetailCard character={data} />
        </div>
    )
}