"use client"

import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Fragment } from "react";

export default function Breadcrumbs() {
    const path = usePathname();
    const segment = path?.split('/');
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {
                    segment?.map((item, index) => {
                        if (!item || index === 1) return null;

                        const href = `/${segment.slice(0, index + 1).join('/')}`;
                        const isLast = index === segment.length - 1;
                        return (
                            <Fragment key={index}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem key={index}>
                                    {
                                        isLast ? (
                                            <BreadcrumbPage>{item}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink href={href}>{item}</BreadcrumbLink>
                                        )
                                    }
                                </BreadcrumbItem>
                            </Fragment>
                        )
                    })
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
