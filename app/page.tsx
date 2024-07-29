import { Button } from "@nextui-org/button"
import Link from "next/link"


export default async function Page() {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="pb-4 text-7xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">Faia Finance App</h1>
        <p className="pb-4 text-2xl ">Track all your expenses in one place.</p>
        
        <Link href="/dashboard"><Button size="lg" color="primary" className="text-lg">Get Started</Button></Link>

        <iframe className="my-8 py-8 h-96 w-auto min-w-96" src='https://my.spline.design/untitled-959339a248af249c19006a488587033e/'></iframe>
      </div>


      
    </>
)};