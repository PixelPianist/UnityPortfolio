import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import Link from 'next/link'; // Import Link from next/link

const GAMES_BUCKET_URL = 'https://public-unity-builds.s3.us-east-2.amazonaws.com';

const GamesPage = () => {
    const [games, setGames] = useState<string[]>([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                interface S3ListBucketResult {
                    ListBucketResult: {
                        Contents: {
                            Key: string[];
                        }[];
                    };
                }
                
                const response = await axios.get(`${GAMES_BUCKET_URL}`);
                const result = await parseStringPromise(response.data) as S3ListBucketResult;


                const gameDirectories = result.ListBucketResult.Contents
                    .map(content => content.Key[0].split('/')[0])
                    .filter((value, index, self) => self.indexOf(value) === index && value);
                setGames(gameDirectories);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div>
            <header className="container mx-auto p-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Available Unity Games
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Browse and select a Unity game hosted on our S3 bucket.
                </p>
            </header>

            <main className="flex-grow container mx-auto p-6">
                <section className="flex flex-col items-center">
                    {games.length > 0 ? (
                        games.map((game, index) => (
                            <div key={index} className="w-full mb-8 text-center">
                                <h2 className="text-2xl md:text-3xl font-semibold mb-2">
                                    {game}
                                </h2>
                                <Link href={`/games/${encodeURIComponent(game)}`}
                                    className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded">
                                        Play {game}
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-300">Loading games...</p>
                    )}
                </section>
            </main>
        </div>
    );
};

export default GamesPage;
