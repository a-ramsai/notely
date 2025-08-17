"use client";

import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from 'next/navigation'
import Link from 'next/link';


function Breadcrums() {

    const path = usePathname();
    const id = path.split("/")[2];
  return (
    <Breadcrumb>
  <BreadcrumbList>
   <BreadcrumbItem>
  <BreadcrumbLink asChild>
    <Link className="breadcrumb-link" href="/">Home</Link>
  </BreadcrumbLink>
</BreadcrumbItem>

    <BreadcrumbSeparator />
   
   <BreadcrumbItem>
      {/* <BreadcrumbLink href={`/doc/${id}`}>{id}</BreadcrumbLink> */}
    <BreadcrumbPage>{id}</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
  )
}

export default Breadcrums;