import { getServerSession } from "next-auth"
import Image from 'next/image'

import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import LoginComp from '@/components/Login'
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/ui/mode-toggler";

export default async function SignIn() {

  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard')
  }


  return (
    <div className="w-full h-full min-h-[95vh] flex items-center justify-center">
        <div className="fixed top-2 left-10 focus-visible:ring-[0px!important]">
          <ModeToggle />
        </div>
        <div className='w-[400px] h-full block rounded-md px-10 pt-10 py-4 shadow-sm shadow-slate-800 mt-4'>
          <Image src='/main.png' alt='logo' width={400} height={400} />
          <LoginComp />
      </div>
    </div>
  )
}
