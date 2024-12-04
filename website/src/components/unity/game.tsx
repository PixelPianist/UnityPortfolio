'use client';

import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

interface GameProps {
    loaderUrl: string;
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
    streamingAssetsUrl?: string;
}

const Game: React.FC<GameProps> = ({ loaderUrl, dataUrl, frameworkUrl, codeUrl, streamingAssetsUrl }) => {
    const { unityProvider } = useUnityContext({
        loaderUrl,
        dataUrl,
        frameworkUrl,
        codeUrl,
        streamingAssetsUrl,
    });

    return (
        <div className={"w-[95vw] h-[95vh] mx-auto"}>
            <Unity 
                unityProvider={unityProvider} 
                className={"w-full h-full"}
            />
        </div>
    );
}

export default Game;