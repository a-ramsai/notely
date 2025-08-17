"use Client";


import { db } from '@/firebase';
import { doc } from 'firebase/firestore';
import  Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { useDocumentData } from 'react-firebase-hooks/firestore';

function SidebarOption({herf,id}:{
    herf : string;
    id :string;
}) {


    const [data,loading,error] = useDocumentData(doc(db,"documents",id));
    const pathname = usePathname();
    const isActive = herf.includes(pathname) && pathname !== "/";

    if(!data) return null;

  return (
    <Link href={herf} className={`border p-2 rounded-md ${
        isActive ? "bg-grey-300 font-bold border-black" : "border-gray-400 "}`} >
            <p className='truncate'>{data.title} </p>
        </Link>
  )
}

export default SidebarOption