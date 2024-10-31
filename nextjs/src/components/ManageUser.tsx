'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { useUser } from "@clerk/nextjs"
import { useRoom } from "@liveblocks/react/suspense"
import useOwner from "@/lib/useOwner"
import { useCollection } from "react-firebase-hooks/firestore"
import { collectionGroup, query, where } from "firebase/firestore"
import { db } from "../../firebase"
import exp from "constants"
import { removeUserFromDocument } from "../../actions/actions"
import { toast } from "sonner"


function ManageUser() {
    const { user } = useUser();
    const room = useRoom();
    const isOwner = useOwner();

    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

    const [usersInRoom] = useCollection(
        user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
    )



    const handleDelete = async (userId: string) => {
        startTransition(async () => {
            if (!user) return;
            const { success } = await removeUserFromDocument(room?.id, userId);

            if (success) {
                toast.success("User remove successfully!");
            } else {
                toast.error(`Failed to remove user ${userId}!`);
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='outline'>
                <DialogTrigger>Users ({usersInRoom?.docs.length})</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User with Access</DialogTitle>
                    <DialogDescription>
                        Below is a list of users who have access to the document.
                    </DialogDescription>
                </DialogHeader>
                <hr className="my2" />
                <div className="flex flex-col gap-4">
                    {/* mapp user list */}
                    {
                        usersInRoom?.docs.map((doc) => (
                            <div
                                key={doc.data().userId}
                                className="flex items-center justify-between"
                            >
                                <p className="font-light">
                                    {doc.data().userId === user?.emailAddresses[0].toString() ?
                                        `You (${doc.data().userId})` :
                                        doc.data().userId}
                                </p>
                                <div className="flex items-center gap-2">
                                    <Button variant={'outline'}>{doc.data().role}</Button>
                                    {
                                        isOwner && doc.data().userId !== user?.emailAddresses[0].toString() &&
                                        <Button
                                            variant={'destructive'}
                                            onClick={() => handleDelete(doc.data().userId)}
                                            disabled={isPending}
                                        >
                                            {
                                                isPending ? "Romoving..." : "Remove"
                                            }
                                        </Button>
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ManageUser


