import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@components/Header';
import { fetchGameDirectories } from "@utils/s3utils";

type GameData = {
    name: string;
    description: string;
    previewUrl: string;
};

const GamesPage = () => {
    const [games, setGames] = useState<GameData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGamesData = async () => {
            try {
                const gameDirectories = await fetchGameDirectories();
                const baseURL = process.env.NEXT_PUBLIC_GAMES_BUCKET_URL;

                const gameDataPromises = gameDirectories.map(async (game: string) => {
                    const descriptionUrl = `${baseURL}/${encodeURIComponent(game)}/description.txt`;
                    const previewUrl = `${baseURL}/${encodeURIComponent(game)}/preview.jpg`;

                    let descriptionText = '';
                    try {
                        const descResponse = await fetch(descriptionUrl);
                        if (descResponse.ok) {
                            descriptionText = await descResponse.text();
                        }
                        else {
                            descriptionText = 'No description available';
                        }
                    }
                    catch (err) {
                        console.error(`Error fetching description for ${game}:`, err);
                        descriptionText = 'No description available';
                    }

                    return {
                        name: game,
                        description: descriptionText,
                        previewUrl: previewUrl
                    };
                });

                const gamesData = await Promise.all(gameDataPromises);
                setGames(gamesData);
            }
            catch (error) {
                console.error('Error fetching games:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchGamesData();
    }, []);

    return (
        <div>
            <Header
                title="Available Unity Games"
                subtitle="Browse and select a Unity game to play."
            />

            <main className="flex-grow container mx-auto p-6">
                {loading ? (
                    <p className="text-gray-300">Loading games...</p>
                ) : (
                    <section
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {games.map((game, index) => (
                            <div key={index} className="border border-gray-700 rounded p-4 text-center bg-gray-800">
                                <h2 className="text-xl font-semibold mb-2 text-white">
                                    {game.name}
                                </h2>
                                {game.previewUrl && (
                                    <img
                                        src={game.previewUrl}
                                        alt={`${game.name} preview`}
                                        className="mx-auto max-w-xs w-full h-auto mb-2 rounded shadow-md"
                                    />
                                )}
                                <p className="text-gray-300 text-sm mb-3 whitespace-pre-line">
                                    {game.description}
                                </p>
                                <Link
                                    href={`/games/${encodeURIComponent(game.name)}`}
                                    className="inline-block px-3 py-1 bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded text-white text-sm"
                                >
                                    Play {game.name}
                                </Link>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
};

export default GamesPage;
