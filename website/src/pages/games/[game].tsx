import { GetServerSideProps, NextPage } from 'next';
import Game from '@components/unity/game';

const GAMES_BUCKET_URL = 'https://public-unity-builds.s3.us-east-2.amazonaws.com';

interface GamePageProps {
    game: string;
}

const GamePage: NextPage<GamePageProps> = ({ game }) => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col">
            <header className="container mx-auto p-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{game}</h1>
                <p className="text-gray-300 max-w-2xl mx-auto">
                    Enjoy the game hosted on our S3 bucket.
                </p>
            </header>

            <main className="flex-grow container mx-auto p-6">
                <section className="flex flex-col items-center">
                    <div className="w-full" style={{ margin: 'auto' }}>
                        <Game
                            loaderUrl={`${GAMES_BUCKET_URL}/${game}/build.loader.js`}
                            dataUrl={`${GAMES_BUCKET_URL}/${game}/build.data`}
                            frameworkUrl={`${GAMES_BUCKET_URL}/${game}/build.framework.js`}
                            codeUrl={`${GAMES_BUCKET_URL}/${game}/build.wasm`}
                        />
                    </div>
                </section>
            </main>

            <footer className="bg-gray-800 p-4">
                <div className="container mx-auto text-center text-gray-400">
                    &copy; {new Date().getFullYear()} Unity Automation Sample. All rights reserved.
                </div>
            </footer>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { game } = context.params as { game: string };

    // TODO: Validate game directory exists in S3 bucket

    return {
        props: {
            game,
        },
    };
};

export default GamePage;
