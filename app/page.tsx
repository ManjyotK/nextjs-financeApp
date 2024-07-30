import { Button } from "@nextui-org/button"
import Link from "next/link"


/**
 * The main page of the Faia Finance App.
 *
 * This component renders the main page of the Faia Finance App. It displays a title, a description,
 * a button to navigate to the dashboard, and an embedded UXPin prototype.
 *
 * @returns {JSX.Element} The main page component.
 */
export default async function Page() {
  return (
    <>
      {/* Container for the main page content */}
      <div className="flex flex-col items-center justify-center p-4">
        {/* Title of the app */}
        <h1 className="pb-4 text-7xl font-bold bg-gradient-to-r from-blue-500 to-yellow-500 bg-clip-text text-transparent">
          Faia Finance App
        </h1>
        {/* Description of the app */}
        <p className="pb-4 text-2xl">Track all your expenses in one place.</p>

        {/* Button to navigate to the dashboard */}
        <Link href="/dashboard">
          <Button size="lg" color="primary" className="text-lg">
            Get Started
          </Button>
        </Link>

        {/* Embedded UXPin prototype */}
        <iframe
          className="my-8 py-8 h-96 w-auto min-w-96"
          src="https://my.spline.design/untitled-959339a248af249c19006a488587033e/">
        </iframe>
      </div>
    </>
  );
}
