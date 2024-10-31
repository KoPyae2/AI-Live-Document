"use client"

import React from 'react';
import {
    RoomProvider as RoomProviderWrapper,
    ClientSideSuspense
} from "@liveblocks/react/suspense";
import { LiveList, LiveObject } from '@liveblocks/client';
import LoadingSpinner from './LoadingSpinner';
import LiveCursorProvider from './LiveCursorProvider';

export default function RoomProvider({ children, roomId }: {
    children: React.ReactNode;
    roomId: string;
}) {
    return (
        <RoomProviderWrapper
            id={roomId}
            initialPresence={{ cursor: null }}
        // initialStorage={{
        //     people: new LiveList([new LiveObject({ name: 'chico', age: 20 })])
        // }}
        >
            <ClientSideSuspense fallback={<LoadingSpinner />}>
                <LiveCursorProvider>
                    {children}
                </LiveCursorProvider>
            </ClientSideSuspense>
        </RoomProviderWrapper>
    )
}
