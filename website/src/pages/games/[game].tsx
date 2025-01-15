import {GetServerSidePropsContext, NextPage} from 'next';
import Game from '@components/unity/game';
import Header from '@components/Header';
import {fetchGameDirectories} from '@utils/s3utils';

const GAMES_BUCKET_URL = process.env.NEXT_PUBLIC_GAMES_BUCKET_URL;

interface GamePageProps {
    game: string;
    description: string;
    instructions: string;
}

interface FullscreenableElement extends HTMLElement {
    mozRequestFullScreen?: () => Promise<void> | void;
    webkitRequestFullscreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
}

const GamePage: NextPage<GamePageProps> = ({game, description, instructions}) => {
    // A small helper function to request fullscreen.
    // Note: We check for multiple vendor-prefixed versions to support older browsers.
    const handleFullScreen = () => {
        const gameContainer = document.getElementById('gameContainer') as FullscreenableElement;
        if (!gameContainer) {
            return;
        }

        if (gameContainer.requestFullscreen) {
            gameContainer.requestFullscreen();
        } else if (gameContainer.mozRequestFullScreen) { // Firefox
            gameContainer.mozRequestFullScreen();
        } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari, Opera
            gameContainer.webkitRequestFullscreen();
        } else if (gameContainer.msRequestFullscreen) { // IE/Edge
            gameContainer.msRequestFullscreen();
        }
    };

    return (
        <div>
            <Header
                title={game}
                subtitle={description}
                instructions={instructions}
            />

            <main className="flex-grow container mx-auto p-6">
                <section className="flex flex-col items-center">
                    <button
                        onClick={handleFullScreen}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Go Fullscreen
                    </button>
                    
                    <div id="gameContainer" className="w-full" style={{margin: 'auto'}}>
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

export const getServerSideProps: (context: GetServerSidePropsContext) => Promise<
    { notFound: boolean } | { props: { game: string; description: string; instructions: string } }
> = async (context) => {
    const {game} = context.params as { game: string };

    // Validate the game directory
    const gameDirectories = await fetchGameDirectories();
    if (!gameDirectories.includes(game)) {
        return {notFound: true};
    }

    // Fetch the game description
    const descriptionUrl = `${GAMES_BUCKET_URL}/${game}/description.txt`;
    let descriptionText = '';
    try {
        const descResponse = await fetch(descriptionUrl);
        if (descResponse.ok) {
            descriptionText = await descResponse.text();
        } else {
            descriptionText = 'No description available';
        }
    } catch (err) {
        console.error(`Error fetching description for ${game}:`, err);
        descriptionText = 'No description available';
    }

    // Fetch the game instructions
    const instructionsUrl = `${GAMES_BUCKET_URL}/${game}/instructions.txt`;
    let instructionsText = '';
    try {
        const instructionsResponse = await fetch(instructionsUrl);
        if (instructionsResponse.ok) {
            instructionsText = await instructionsResponse.text();
        } else {
            instructionsText = 'No instructions available';
        }
    } catch (err) {
        console.error(`Error fetching instructions for ${game}:`, err);
        instructionsText = 'No instructions available';
    }

    return {
        props: {
            game,
            description: descriptionText,
            instructions: instructionsText,
        },
    };
};

export default GamePage;
