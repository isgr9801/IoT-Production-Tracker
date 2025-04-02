"use client";
import { useAuth } from "../../../components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaUserTie } from 'react-icons/fa';

export default function ContactUsPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        if (user === undefined) return;

        if (!user) {
            router.push("/dashboard");
        } else {
            setAuthChecked(true);
        }
    }, [user, router]);

    if (!authChecked) return <p className="text-center">Loading...</p>;

    // Admin contact details
    const adminContacts = [
        {
            name: "Yuvraj Mane",
            email: "yuvrajmane2157@gmail.com",
            role: "Administrator"
        },
        {
            name: "Rushikesh",
            email: "chrushikesh28@gmail.com",
            role: "Administrator"
        }
    ];

    // Developer contact details
    const developerInfo = {
        name: "Sagar Parab",
        linkedin: "https://www.linkedin.com/in/sagar-parab-7356472bb?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        github: "https://github.com/isgr9801/IoT-Production-Tracker.git",
        email: "sgrp9801@gmail.com",
        phone: "+91 8956002275"
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="flex items-center space-x-2 mb-6">
                <Link href="/dashboard" className="text-xl md:text-2xl font-semibold text-blue-600 underline dark:text-blue-400 hover:no-underline">
                    dashboard
                </Link>
                <span className="text-xl md:text-2xl dark:text-gray-300">/</span>
                <span className="text-xl md:text-2xl font-semibold dark:text-gray-300">contact us</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Contact Information</h1>

            {/* Admin Contacts Section */}
            <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center">
                    <FaUserTie className="mr-2" /> Admin Contacts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {adminContacts.map((admin, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{admin.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{admin.role}</p>
                            <div className="flex items-center text-blue-600 dark:text-blue-400">
                                <FaEnvelope className="mr-2" />
                                <a href={`mailto:${admin.email}`} className="hover:underline">{admin.email}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Developer Information Section */}
            <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">Developer Information</h2>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">This website was developed by {developerInfo.name}</h3>
                    
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <FaLinkedin className="text-blue-600 dark:text-blue-400 mr-3 text-xl" />
                            <a href={developerInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                LinkedIn Profile
                            </a>
                        </div>
                        
                        <div className="flex items-center">
                            <FaGithub className="text-gray-800 dark:text-gray-200 mr-3 text-xl" />
                            <a href={developerInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                                GitHub Profile
                            </a>
                        </div>
                        
                        <div className="flex items-center">
                            <FaEnvelope className="text-gray-600 dark:text-gray-300 mr-3 text-xl" />
                            <a href={`mailto:${developerInfo.email}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                                {developerInfo.email}
                            </a>
                        </div>
                        
                        <div className="flex items-center">
                            <FaPhone className="text-gray-600 dark:text-gray-300 mr-3 text-xl" />
                            <span className="text-gray-800 dark:text-gray-200">{developerInfo.phone}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}