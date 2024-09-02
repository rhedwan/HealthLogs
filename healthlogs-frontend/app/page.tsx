import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Activity,
  BarChart3,
  Brain,
  FileHeart,
  HardDriveDownload,
  HeartPulse,
  Hospital,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <FileHeart className="h-8 w-8 text-[#7457D3]" />
            <span className="text-2xl font-bold text-gray-800">HealthLogs</span>
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#about" className="text-gray-600 hover:text-gray-900">
              About
            </Link>
            <Link
              href="#why-healthlogs"
              className="text-gray-600 hover:text-gray-900"
            >
              Why HealthLogs
            </Link>
            <Link
              href="#features"
              className="text-gray-600 hover:text-gray-900"
            >
              Features
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </Link>
          </nav>
          <Button className="bg-[#7457D3] text-white hover:bg-[#5E45A8]">
            Sign In
          </Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gray-900 text-white">
          <Image
            src="/placeholder.svg?height=600&width=1600"
            alt="African healthcare professionals"
            width={1600}
            height={600}
            className="object-cover w-full h-[600px]"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Empowering Healthcare in Africa with Smart Records
              </h1>
              <p className="text-xl mb-8">
                Streamline patient care, enhance data accuracy, and drive
                healthcare innovation with HealthLogs.
              </p>
              <Button className="bg-[#7457D3] text-white text-lg px-8 py-3 rounded-full hover:bg-[#5E45A8]">
                Get Started
              </Button>
            </div>
            <div className="flex justify-center mt-12 space-x-8">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                <p>Patient Analytics</p>
              </div>
              <div className="text-center">
                <HardDriveDownload className="h-12 w-12 mx-auto mb-2" />
                <p>Secure Data Storage</p>
              </div>
              <div className="text-center">
                <Hospital className="h-12 w-12 mx-auto mb-2" />
                <p>Hospital Efficiency</p>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              About HealthLogs
            </h2>
            <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
              HealthLogs addresses the specific healthcare challenges in Africa
              by improving patient data management, supporting medical
              professionals with easy access to records, and ensuring data
              security and compliance with international standards.
            </p>
          </div>
        </section>

        {/* Why HealthLogs Section */}
        <section id="why-healthlogs" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why HealthLogs is Needed in All Sectors
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Government Healthcare
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Activity className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Centralized patient data management for better resource
                        allocation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <BarChart3 className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Improved public health monitoring and epidemic control
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Lock className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Enhanced data security and compliance with national
                        regulations
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Private Healthcare
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <HeartPulse className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Streamlined patient care and reduced administrative
                        burden
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Brain className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        AI-driven insights for personalized treatment plans
                      </span>
                    </li>
                    <li className="flex items-start">
                      <HardDriveDownload className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Efficient data sharing between healthcare providers
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    NGOs and International Organizations
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <Hospital className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Improved coordination of healthcare initiatives across
                        regions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <BarChart3 className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Data-driven decision making for resource allocation
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Activity className="h-5 w-5 mr-2 mt-1 text-[#7457D3] flex-shrink-0" />
                      <span>
                        Enhanced monitoring and evaluation of health programs
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Request Demo Section */}
        <section id="request-demo" className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              Experience HealthLogs in Action
            </h2>
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Request a Demo</h3>
                  <form className="space-y-4">
                    <Input type="text" placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                    <Input type="text" placeholder="Organization" />
                    <Button className="w-full bg-[#7457D3] text-white hover:bg-[#5E45A8]">
                      Request Demo
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6">
                  <Brain className="h-12 w-12 mb-4 text-[#7457D3]" />
                  <h3 className="text-xl font-semibold mb-2">
                    Innovative Technology
                  </h3>
                  <p>
                    Leverage cutting-edge AI-driven insights and predictive
                    analytics to enhance patient outcomes and streamline
                    healthcare delivery.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <FileHeart className="h-12 w-12 mb-4 text-[#7457D3]" />
                  <h3 className="text-xl font-semibold mb-2">Customization</h3>
                  <p>
                    Flexible system adaptable to different types of healthcare
                    facilities across Africa, from small clinics to large
                    hospitals.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Lock className="h-12 w-12 mb-4 text-[#7457D3]" />
                  <h3 className="text-xl font-semibold mb-2">
                    Security and Compliance
                  </h3>
                  <p>
                    Robust data security measures ensuring patient data
                    protection and compliance with local and international
                    regulations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
