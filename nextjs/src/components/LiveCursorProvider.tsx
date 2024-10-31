import { useMyPresence, useOthers } from '@liveblocks/react/suspense'
import React, { PointerEvent } from 'react'
import FollowPointer from './FollowPointer';

export default function LiveCursorProvider({ children }:
    {
        children: React.ReactNode
    }) {

    const [myPresence, updateMyPresence] = useMyPresence();
    const other = useOthers();

    const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
        const corsor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) }
        updateMyPresence({ cursor: corsor })
    }
    const handlePointerLeave = () => {
        updateMyPresence({ cursor: null })
    }
    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {/* render cursor  */}
            {
                other.filter((other) => other.presence.cursor != null).map((other) => (
                    <FollowPointer
                        key={other.connectionId}
                        info={other.info}
                        x={other.presence.cursor?.x}
                        y={other.presence.cursor?.y}
                    />
                ))
            }
            {children}
        </div>
    )
}
