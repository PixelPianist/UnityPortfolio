import { GetServerSideProps, NextPage } from 'next';
import Game from '@components/unity/game';
import Header from '@components/Header';

const GAMES_BUCKET_URL = 'https://public-unity-builds.s3.us-east-2.amazonaws.com';

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
