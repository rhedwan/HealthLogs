"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Activity,
  BarChart3,
  Brain,
  Facebook,
  FileHeart,
  Globe,
  HardDriveDownload,
  HeartPulse,
  Hospital,
  Instagram,
  Linkedin,
  Lock,
  Mail,
  Menu,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center lg:text-left">
              Ready to elevate your healthcare data?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="bg-[#E91E63] hover:bg-[#C2185B] text-white text-lg py-4 px-6 sm:py-6 sm:px-8">
                Sign up for free
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2">
              <FileHeart className="h-8 w-8 sm:h-10 sm:w-10 text-[#7457D3]" />
              <span className="text-2xl sm:text-3xl font-bold">HealthLogs</span>
            </div>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              Empowering healthcare in Africa with innovative digital solutions.
            </p>
          </div>
          <nav className="text-center lg:text-left">
            <h3 className="text-xl font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-base sm:text-lg text-gray-300 hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="text-base sm:text-lg text-gray-300 hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#team"
                  className="text-base sm:text-lg text-gray-300 hover:text-white"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-base sm:text-lg text-gray-300 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          <nav className="text-center lg:text-left">
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-base sm:text-lg text-gray-300 hover:text-white"
                >
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base sm:text-lg text-gray-300 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base sm:text-lg text-gray-300 hover:text-white"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </nav>
          <div className="text-center lg:text-left">
            <h3 className="text-xl font-semibold mb-4">Let's chat!</h3>
            <p className="text-base sm:text-lg text-gray-300 mb-4">
              info@healthlogs.com
            </p>
            <div className="flex justify-center lg:justify-start space-x-4">
              <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-gray-800 pt-8">
          <p className="text-base sm:text-lg text-gray-300 text-center">
            &copy; {new Date().getFullYear()} HealthLogs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const teamMembers = [
    {
      name: "John Doe",
      role: "Chief Medical Officer",
      bio: "Dr. John Doe is a highly experienced medical professional with a passion for improving patient care.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Jane Smith",
      role: "Head of Technology",
      bio: "Jane Smith is a tech-savvy leader with a proven track record of driving innovation in healthcare.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <FileHeart className="h-8 w-8 sm:h-10 sm:w-10 text-[#7457D3]" />
            <span className="text-2xl sm:text-3xl font-bold text-gray-800">
              HealthLogs
            </span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link
              href="#about"
              className="text-lg lg:text-xl text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="#why-healthlogs"
              className="text-lg lg:text-xl text-gray-600 hover:text-gray-900"
            >
              Why HealthLogs
            </Link>
            <Link
              href="#features"
              className="text-lg lg:text-xl text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link
              href="#team"
              className="text-lg lg:text-xl text-gray-600 hover:text-gray-900"
            >
              Team
            </Link>
            <Link
              href="#contact"
              className="text-lg lg:text-xl text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
          </nav>
          <div className="hidden md:block">
            <Link href="/auth/login">
              <Button className="bg-[#7457D3] text-white hover:bg-[#5E45A8] text-lg lg:text-xl py-2 px-4 lg:py-3 lg:px-5">
                Sign In
              </Button>
            </Link>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4">
            <nav className="flex flex-col space-y-4 px-4">
              <Link
                href="#about"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                About
              </Link>
              <Link
                href="#why-healthlogs"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                Why HealthLogs
              </Link>
              <Link
                href="#features"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                Features
              </Link>
              <Link
                href="#team"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                Team
              </Link>
              <Link
                href="#contact"
                className="text-lg text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>
              <Link href="/auth/login">
                <Button className="bg-[#7457D3] text-white hover:bg-[#5E45A8] w-full text-lg">
                  Sign In
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="African healthcare professionals"
            width={1600}
            height={600}
            className="object-cover w-full h-[400px] sm:h-[500px] md:h-[600px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8">
                Empowering Healthcare in Africa with Smart Records
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl mb-8 sm:mb-12">
                Streamline patient care, enhance data accuracy, and drive
                healthcare innovation with HealthLogs.
              </p>
              <Button className="bg-[#E91E63] hover:bg-[#C2185B] text-white text-xl sm:text-2xl px-8 sm:px-12 py-4 sm:py-5 rounded-full">
                Get Started
              </Button>
            </div>
            <div className="flex flex-wrap justify-center mt-16 sm:mt-20 space-y-8 sm:space-y-0 sm:space-x-12">
              <div className="text-center w-full sm:w-auto">
                <BarChart3 className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 sm:mb-6" />
                <p className="text-xl sm:text-2xl">Patient Analytics</p>
              </div>
              <div className="text-center w-full sm:w-auto">
                <HardDriveDownload className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 sm:mb-6" />
                <p className="text-xl sm:text-2xl">Secure Data Storage</p>
              </div>
              <div className="text-center w-full sm:w-auto">
                <Hospital className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-4 sm:mb-6" />
                <p className="text-xl sm:text-2xl">Hospital Efficiency</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 sm:py-24 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-12">
              About HealthLogs
            </h2>
            <p className="text-xl sm:text-2xl text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
              HealthLogs addresses the specific healthcare challenges in Africa
              by improving patient data management, supporting medical
              professionals with easy access to records, and ensuring data
              security and compliance with international standards.
            </p>
          </div>
        </section>

        {/* Why HealthLogs Section */}
        <section
          id="why-healthlogs"
          className="py-20 sm:py-24 md:py-28 bg-gray-100"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16">
              Why HealthLogs is Needed in All Sectors
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    Government Healthcare
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Activity className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Centralized patient data management for better resource
                        allocation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <BarChart3 className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Improved public health monitoring and epidemic control
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Lock className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Enhanced data security and compliance with national
                        regulations
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    Private Healthcare
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <HeartPulse className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Streamlined patient care and reduced administrative
                        burden
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Brain className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        AI-driven insights for personalized treatment plans
                      </span>
                    </li>
                    <li className="flex items-start">
                      <HardDriveDownload className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Efficient data sharing between healthcare providers
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg sm:col-span-2 lg:col-span-1">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    NGOs and International Organizations
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <Hospital className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Improved coordination of healthcare initiatives across
                        regions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <BarChart3 className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Data-driven decision making for resource allocation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Activity className="h-6 w-6 mr-3 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span className="text-lg">
                        Enhanced monitoring and evaluation of health programs
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 sm:py-24 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-12 sm:mb-16">
              Features
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-14">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <Brain className="h-12 w-12 mb-6 text-[#7457D3] mx-auto" />
                  <h3 className="text-2xl font-semibold mb-4 text-center">
                    Innovative Technology
                  </h3>
                  <p className="text-lg text-center">
                    Leverage cutting-edge AI-driven insights and predictive
                    analytics to enhance patient outcomes and streamline
                    healthcare delivery.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <FileHeart className="h-12 w-12 mb-6 text-[#7457D3] mx-auto" />
                  <h3 className="text-2xl font-semibold mb-4 text-center">
                    Customization
                  </h3>
                  <p className="text-lg text-center">
                    Flexible system adaptable to different types of healthcare
                    facilities across Africa, from small clinics to large
                    hospitals.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white shadow-lg sm:col-span-2 lg:col-span-1">
                <CardContent className="p-8">
                  <Lock className="h-12 w-12 mb-6 text-[#7457D3] mx-auto" />
                  <h3 className="text-2xl font-semibold mb-4 text-center">
                    Security and Compliance
                  </h3>
                  <p className="text-lg text-center">
                    Robust data security measures ensuring patient data
                    protection and compliance with local and international
                    regulations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section id="team" className="py-20 sm:py-24 md:py-28 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl sm:text-2xl text-center text-gray-600 mb-12 sm:mb-16">
              Get to know the experts behind HealthLogs.
            </p>
            <div className="grid sm:grid-cols-2 gap-10 sm:gap-14 max-w-4xl mx-auto">
              {teamMembers.map((member, index) => (
                <Card key={index} className="bg-white shadow-lg">
                  <CardContent className="p-8 text-center">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={160}
                      height={160}
                      className="rounded-full mx-auto mb-6 w-32 h-32 object-cover"
                    />
                    <h3 className="text-2xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg text-gray-600 mb-4">{member.role}</p>
                    <p className="text-lg mb-6">{member.bio}</p>
                    <div className="flex justify-center space-x-6">
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-[#7457D3]"
                      >
                        <Linkedin className="h-6 w-6" />
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-[#7457D3]"
                      >
                        <Twitter className="h-6 w-6" />
                      </Link>
                      <Link
                        href="#"
                        className="text-gray-600 hover:text-[#7457D3]"
                      >
                        <Globe className="h-6 w-6" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Request Demo Section */}
        <section id="request-demo" className="py-20 sm:py-24 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl sm:text-5xl font-bold text-center mb-8 sm:mb-12">
              Experience HealthLogs in Action
            </h2>
            <div className="max-w-lg mx-auto">
              <Card className="bg-white shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-center">
                    Request a Demo
                  </h3>
                  <form className="space-y-6">
                    <Input
                      type="text"
                      placeholder="Your Name"
                      className="text-lg py-3"
                    />
                    <Input
                      type="email"
                      placeholder="Your Email"
                      className="text-lg py-3"
                    />
                    <Input
                      type="text"
                      placeholder="Organization"
                      className="text-lg py-3"
                    />
                    <Button className="w-full bg-[#7457D3] text-white hover:bg-[#5E45A8] text-lg py-3">
                      Request Demo
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
