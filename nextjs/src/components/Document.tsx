"use client"

import { useEffect, useState, useTransition } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import useOwner from "../lib/useOwner"
import Editor from './Editor';
import InviteUser from './InviteUser';
import DeleteDocument from './DeleteDocument';
import ManageUser from './ManageUser';
import Avatars from './Avatars';

export default function Document({ id }: { id: string }) {
    const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
    const [input, setInput] = useState('');
    const [isUpdating, startTransition] = useTransition();
    const isOwner = useOwner()


    const updateTitle = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, 'documents', id), {
                    title: input
                })
            })
        }
    }

    useEffect(() => {
        if (data) setInput(data.title)
    }, [data])
    return (
        <div className='flex-1 h-full bg-white p-5'>
            <div className='flex max-w-6xl mx-auto justify-between pb-5'>
                <form onSubmit={updateTitle} className='flex flex-1 space-x-2'>
                    {/* update title  */}
                    <Input className='bg-white' value={input} onChange={(e) => setInput(e.target.value)} />
                    <Button disabled={isUpdating}>
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                    {/* if owner delete doc  */}
                    {isOwner && (
                        <>
                            {/* Invite user */}
                            <InviteUser />
                            {/* Delete document */}
                            <DeleteDocument />
                        </>
                    )}
                </form>
            </div>

            <div className='flex max-w-6xl mx-auto justify-between items-center mb-5'>
                {/* manage user  */}
                <ManageUser />
                {/* avatar */}
                <Avatars />
            </div>
            <hr className='pb-10' />
            {/* editor  */}
            <Editor />
        </div>
    )
}
