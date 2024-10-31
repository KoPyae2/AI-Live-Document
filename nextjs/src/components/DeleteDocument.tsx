'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteDocument } from "../../actions/actions"


function DeleteDocument() {

    const [isOpen, setIsOpen] = useState(false)
    const [isPending, startTransition] = useTransition()

    const pathname = usePathname()
    const router = useRouter()

    const handleDelete = async () => {
        // alternative is to use useRoom to get RoomId to understand which one to delete
        const roomId = pathname.split('/').pop() //pop gets last element

        if (!roomId) return

        startTransition(async () => {
            const { success } = await deleteDocument(roomId)

            if (success) {
                setIsOpen(false);
                router.replace("/"); //redirect to homepage
                toast.success("Room Deleted successfully!");
            } else {
                toast.error("Failed to delete room!");
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild variant='destructive'>
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        This will delete content and all users from document.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end gap-2">
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </Button>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDocument