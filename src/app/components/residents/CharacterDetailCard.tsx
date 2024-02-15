"use client"
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface CharacterDetailCardProps {
    character: {
        id: string;
        name: string;
        status: string;
        species: string;
        gender: string;
        location: { name: string };
        image: string;
    };
}

export default function CharacterDetailCard({ character }: CharacterDetailCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [note, setNote] = useState('');
    const [error, setError] = useState('');

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }


    function saveNote() {
        if (!note.trim()) {
            setError('Note cannot be empty.');
            return;
        }

        const characterId = character.id;
        const formData = new FormData();
        // Append the characterId and note to the formData
        formData.append('characterId', characterId);
        formData.append('note', note);


        axios.post('/api/notes', formData)
            .then(response => {
                console.log('Note saved:', response.data);
                closeModal();
            })
            .catch(error => {
                console.error('Error saving note:', error);
            });
    }




    return (
        <div>
            <div className="flex justify-end p-4">
                <button
                    onClick={openModal}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition ease-in-out duration-150"
                >
                    Add Note
                </button>
            </div>

            <div className="md:flex flex-col md:flex-row h-screen">
                <div className="md:w-1/2 flex justify-center items-center bg-gray-100">
                    <Image src={character.image} alt={character.name} width={400} height={400} className="rounded-lg" layout="intrinsic" />
                </div>

                {/* Character Details */}
                <div className="md:w-1/2 p-8">
                    <h2 className="text-4xl font-bold">{character.name}</h2>
                    <p className="mt-4 text-xl">Status: {character.status}</p>
                    <p className="text-xl">Species: {character.species}</p>
                    <p className="text-xl">Gender: {character.gender}</p>
                    <p className="text-xl">Location: {character.location?.name}</p>
                </div>

                {/* Modal for adding notes */}
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            Add Note for {character.name}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Your note about the character.
                                            </p>
                                        </div>

                                        <div className="mt-4">
                                            <textarea
                                                className="textarea textarea-bordered w-full"
                                                placeholder="Your note here"
                                                value={note}
                                                onChange={(e) => setNote(e.target.value)}
                                            ></textarea>
                                        </div>
                                        {error && <div className="text-red-500">{error}</div>}

                                        <div className="flex justify-between mt-4">
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-transparent rounded-md hover:bg-gray-300 focus:outline-none"
                                                onClick={closeModal}
                                            >
                                                Close
                                            </button>
                                            <button
                                                type="button"
                                                className="px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={saveNote}
                                            >
                                                Save Note
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
}
