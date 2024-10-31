import { useOthers, useSelf } from '@liveblocks/react/suspense'
import React, { use } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Avatars() {
    const other = useOthers();
    const self = useSelf();
    

    const all = [...other, self]
    return (
        <div className='flex gap-2 items-center'>
            <p className='font-light text-sm'>Users currently editing this document</p>
            <div className='flex -space-x-5'>
                {
                    all.map((user, index) => (
                        <TooltipProvider key={user.id + index}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <Avatar className='border-2 hover:z-50'>
                                        <AvatarImage src={user?.info.avatar} />
                                        <AvatarFallback>{user.info.name[0]}</AvatarFallback>
                                    </Avatar>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{self.id === user.id ? 'You' : user.info.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ))
                }
            </div>

        </div>
    )
}
