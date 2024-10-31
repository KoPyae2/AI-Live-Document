import React from 'react'
import {
    LiveblocksProvider
} from "@liveblocks/react/suspense";

export default function LiveBlockProvider({ children }: { children: React.ReactNode }) {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error('Missing NEXT_PUBLIC_LIVEBLOCKS_API_KEY')
    }
    return (
        <LiveblocksProvider
            authEndpoint={"/auth-endpoint"}
        >
            {children}
        </LiveblocksProvider>
    )
}
