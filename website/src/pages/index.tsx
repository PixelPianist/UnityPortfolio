import React from 'react';
import Game from '@components/unity/game';

const IndexPage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <header className="container mx-auto p-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Unity Automation Sample
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Welcome to the Unity Automation Sample, showcasing Unity development,
                    React integration, and CI/CD automation.
                </p>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">
                <section className="flex flex-col items-center">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                        Unity Game Integration
                    </h2>
                    <div className="w-full" style={{ margin: 'auto' }}>
                        <Game
                            loaderUrl="https://public-unity-builds.s3.us-east-2.amazonaws.com/TestProject/build.loader.js"
                            dataUrl="https://public-unity-builds.s3.us-east-2.amazonaws.com/TestProject/build.data"
                            frameworkUrl="https://public-unity-builds.s3.us-east-2.amazonaws.com/TestProject/build.framework.js"
                            codeUrl="https://public-unity-builds.s3.us-east-2.amazonaws.com/TestProject/build.wasm"
                        />
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 p-4">
                <div className="container mx-auto text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Unity Automation Sample. All rights
                    reserved.
                </div>
            </footer>
        </div>
    );
};

export default IndexPage;
