import React from 'react';
import Link from 'next/link';

const IndexPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="container mx-auto p-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Unity Automation Sample
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Welcome to my Unity Portfolio, showcasing Unity development,
                    React integration, AWS infrastructure as code, and CI/CD automation.
                </p>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">
                <section className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                        View Available Games
                    </h2>
                    <Link
                        href="/games"
                        className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded text-white"
                    >
                        Browse Games
                    </Link>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 p-4">
                <div className="container mx-auto text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Unity Portfolio. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export default IndexPage;
