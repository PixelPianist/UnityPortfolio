// src/pages/videos.tsx
import React from 'react';
import Link from 'next/link';
import Header from '@components/Header';

type VideoData = {
    name: string;
    description: string;
    videoUrl: string;
};

const videos: VideoData[] = [
    {
        name: 'Zombie Nightmare VR',
        description: 'A Unity project made at UCSD as a final project for a VR class.',
        videoUrl: 'https://www.youtube.com/embed/5tyggUuwI1Y?si=DzNic2DOW9RPN3TA'
    },
    {
        name: 'Miroiri Test Scene',
        description: 'A test scene for a game concept where the player must solve puzzles using mirrors.',
        videoUrl: 'https://www.youtube.com/embed/HRu4BEyXX44?si=Vb-wnXj7bHdU7KIV'
    },
    {
        name: 'Faces of War Demo',
        description: 'A demo of an RTS game concept where the player uses facial expressions to spawn units with different abilities.',
        videoUrl: 'https://www.youtube.com/embed/0eXedvBEDPQ?si=5f225NynoxFOR93Z'
    },
    {
        name: 'Twinjas',
        description: 'A 2D platformer game made in LibGDX',
        videoUrl: 'https://www.youtube.com/embed/9s68AR7Ckr4?si=44-heaEt_QZt6KPu'
    },
    {
        name: 'Space Switch',
        description: 'A top down space ship shooter where the player switches between ship colors to match enemy colors.',
        videoUrl: 'https://www.youtube.com/embed/WnXyvFXmc_E?si=cJsH8VU7EPsufP4X'
    }
];

const VideosPage = () => {
    return (
        <div>
            <Header
                title="Videos"
                subtitle="Browse and watch videos of various projects I've worked on."
            />

            <main className="flex-grow container mx-auto p-6">
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {videos.map((video, index) => (
                        <div key={index} className="border border-gray-700 rounded p-4 text-center bg-gray-800">
                            <h2 className="text-xl font-semibold mb-2 text-white">
                                {video.name}
                            </h2>
                            <iframe
                                src={video.videoUrl}
                                className="mx-auto max-w-xs w-full h-auto mb-2 rounded shadow-md"
                                allowFullScreen
                            />
                            <p className="text-gray-300 text-sm mb-3 whitespace-pre-line">
                                {video.description}
                            </p>
                            <Link
                                href={video.videoUrl}
                                className="inline-block px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded text-white text-sm"
                            >
                                Watch {video.name}
                            </Link>
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
};

export default VideosPage;