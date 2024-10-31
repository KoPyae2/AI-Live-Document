"use client"

import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useUser } from "@clerk/nextjs";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import { DocumentData } from "firebase-admin/firestore";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
    createdAt: string;
    role: 'owner' | 'editor';
    roomId: string;
    userId: string;
}

export default function Sidebar() {
    const { user } = useUser();
    
    const [groupData, setGrouData] = useState<{
        owner: RoomDocument[]
        editor: RoomDocument[]
    }>({ owner: [], editor: [] })
    const [data, loading, error] = useCollection(
        user && (
            query(
                collectionGroup(db, "rooms"),
                where("userId", "==", user.emailAddresses[0].toString())
            )
        )
    )

    const menuOptions = (
        <>
            <NewDocumentButton />
            <div className="flex py-4 flex-col space-y-2 md:max-w-36">
                {
                    !loading && groupData.owner.length === 0 ? (
                        <h2 className="text-gray-500 font-semibold text-sm">No documents found</h2>
                    ) : (
                        <>
                            <h2 className="text-gray-500 font-semibold text-sm">My Documnets</h2>
                            {
                                groupData.owner.map((doc) => (
                                    <SidebarOption key={doc.id} href={`/document/${doc.id}`} id={doc.id} />
                                ))
                            }
                        </>
                    )
                }
            </div>

            <div className="flex py-4 flex-col space-y-2 md:max-w-36">
                {
                    groupData.editor.length > 0 && (
                        <>
                            <h2 className="text-gray-500 font-semibold text-sm">Share with me</h2>
                            {
                                groupData.editor.map((doc) => (
                                    <SidebarOption key={doc.id} href={`/document/${doc.id}`} id={doc.id} />
                                ))
                            }
                        </>
                    )
                }
            </div>
        </>
    )

    

    useEffect(() => {

        if (!data) return
        const grouped = data.docs.reduce<{
            owner: RoomDocument[]
            editor: RoomDocument[]
        }>(
            (acc, doc) => {
                const roomData = doc.data() as RoomDocument;
                if (roomData.role === 'owner') {
                    acc.owner.push({
                        id: doc.id,
                        ...roomData
                    })
                } else {
                    acc.editor.push({
                        id: doc.id,
                        ...roomData
                    })
                }

                return acc
            }, {
            owner: [],
            editor: []
        }
        )
        console.log('group', grouped);

        setGrouData(grouped)
    }, [data])

    return (
        <div className="p-2 md:p-4 bg-gray-200 relative">
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
                    </SheetTrigger>
                    <SheetContent className="w-[400px] sm:w-[540px]" side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            <div>
                                {menuOptions}
                            </div>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:inline">
                {menuOptions}
            </div>
        </div>
    )
}
