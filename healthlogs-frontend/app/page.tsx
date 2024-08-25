import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center w-full">
      <section className="w-full md:w-1/2 bg-[#1E1E1E] h-screen px-10 flex flex-col justify-center relative">
        <header className="flex justify-between absolute top-0 w-full pr-20 pt-8 ">
          <Link href="/" className="text-[#57BCD6]">
            HealthLogs
          </Link>
          <nav className="flex justify-between items-center space-x-6">
            <Link href="/auth/login">
              <Button className="bg-[#57BCD6] text-black hover:text-[#57BCD6]">
                Login
              </Button>
            </Link>
            <Button className="text-[#57BCD6] bg-transparent ring-1 ring-[#57BCD6]">
              Sign Up
            </Button>
          </nav>
        </header>
        <div className=" flex flex-col items-center">
          <p className="text-5xl font-semibold text-[#57BCD6] pr-16 mb-10">
            Lorem ipsum dolor sit amet consect
          </p>
          <p className="text-lg text-[#57BCD6] mr-36">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laborum
            unde ipsa modi iusto maxime temporibus perspiciatis nobis vitae
            molestias
          </p>
          {/* <h2>Health logs</h2> */}
        </div>
        <div className="flex mt-7">
          <Button className="bg-[#57BCD6] text-black hover:text-[#57BCD6]">
            Get Started
          </Button>
        </div>
      </section>
      <section className="bg-[#99E6FA] h-screen md:w-1/2 hidden md:block"></section>
    </main>
  );
}
