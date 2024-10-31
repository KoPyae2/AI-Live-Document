import RoomProvider from "@/components/RoomProvider";
import { auth } from "@clerk/nextjs/server"

export default async function DocLayout({
    children,
    params: { id }
}: Readonly<{
    children: React.ReactNode,
    params: {
        id: string
    }
}>
) {
    auth.protect();
    return (
        <RoomProvider roomId={id}>
            {children}
        </RoomProvider>
    )
}
