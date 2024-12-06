import { GetServerSidePropsContext, NextPage } from 'next';
import Game from '@components/unity/game';
import Header from '@components/Header';
import { fetchGameDirectories } from '@utils/s3utils';

const GAMES_BUCKET_URL = process.env.NEXT_PUBLIC_GAMES_BUCKET_URL;

interface GamePageProps {
    game: string;
}

const GamePage: NextPage<GamePageProps> = ({ game }) => {
    return (
        <div>
            <Header
                title={game}
                subtitle="This text will be replaced by the game's description."
            />

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
        </div>
    );
};

export const getServerSideProps: (context: GetServerSidePropsContext) => Promise<{ notFound: boolean } | {
    props: { game: string }
}> = async (context) => {
    const { game } = context.params as { game: string };

    // Validate the game directory
    const gameDirectories = await fetchGameDirectories();
    if (!gameDirectories.includes(game)) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            game,
        },
    };
};

export default GamePage;