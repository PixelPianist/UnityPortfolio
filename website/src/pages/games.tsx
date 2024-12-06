import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import Header from '@components/Header'; 

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
                
                const response = await axios.get(`${process.env.NEXT_PUBLIC_GAMES_BUCKET_URL}`);
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
            <Header
                title="Available Unity Games"
                subtitle="Browse and select a Unity game hosted on S3."
            />

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
