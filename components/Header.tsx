"use client"
import { SignedIn, SignedOut, SignInButton, UserButton,useUser} from "@clerk/nextjs";
import Breadcrums from "./Breadcrums";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ 
subsets: ['latin'],
weight: '700' // Bold version 
});

function Header() {

    const {user} = useUser();

  return (
    <div className="flex items-center justify-between p-5">
    {user && (
        <h1 className={`text-3xl ${dancingScript.className} text-primary`}>
            {user?.firstName}{`'s`} Space
        </h1>
    )}

    {/* Breadcrums */}
    <Breadcrums/>

    <div >
        <SignedOut>
            <SignInButton/>
        </SignedOut>

        <SignedIn>
            <UserButton />
        </SignedIn>

    </div>

    </div>
  )
}

export default Header
