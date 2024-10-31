'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormEvent, useState, useTransition } from "react"
import { Button } from "./ui/button"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Input } from "./ui/input"
import { inviteUserToRoom } from "../../actions/actions"


function InviteUser() {

  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [email, setEmail] = useState('')

  const pathname = usePathname()
  const router = useRouter()


  const handleInvite = async (e: FormEvent) => {
    e.preventDefault()

    const roomId = pathname.split('/').pop() //pop gets last element

    if (!roomId) return

    startTransition(async () => {
      const { success } = await inviteUserToRoom(roomId, email)

      if (success) {
        setIsOpen(false);
        setEmail('')
        toast.success("User added successfully!");
      } else {
        toast.error("Failed to add user!");
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Button asChild variant='outline'>
        <DialogTrigger>Invite</DialogTrigger>
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite user to collaborate!</DialogTitle>
          <DialogDescription>
            Enter the email of user you want to invite.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleInvite} className="flex gap-2">
          <Input
            type="email"
            placeholder="Email"
            className="w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={!email || isPending}>
            {isPending ? "Inviting..." : "Invite"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default InviteUser
