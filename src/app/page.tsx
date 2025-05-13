import { Activity } from 'lucide-react'
import Image from 'next/image'
import { redirect } from 'next/navigation';

export default function Home() {

   redirect('/home');

  return (
    <>
    {/* <div className='text-primeborder'>for border</div>
    <div className='text-ternary'>ternery</div>
    <div className='text-secondary'>secondary</div>
    <div className='text-primary'>Primary</div>
    <Activity size={20}/> */}
    </>
  )
}
