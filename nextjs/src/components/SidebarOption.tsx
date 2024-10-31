"use client"

import { doc } from 'firebase/firestore'
import Link from 'next/link'
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { db } from '../../firebase'
import { usePathname } from 'next/navigation'

function SidebarOption({ href, id }: {
    href: string,
    id: string
}) {

    const [data, loading, error] = useDocumentData(doc(db, 'documents', id));
    const pathname = usePathname()
    const isActive = href.includes(pathname) && pathname !== '/'

    if (!data) return null
    return (
        <div
            key={id}
            className={`border border-black p-2 rounded-md ${isActive ? 'bg-gray-300 font-bold border-2' : 'bg-gray-100'}`}
        >
            <Link href={href}>
                <p className='truncate'>{loading ? 'loading...' : data.title}</p>
            </Link>
        </div>
    )
}

export default SidebarOption