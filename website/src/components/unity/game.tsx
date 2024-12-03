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
        <div style={{ width: '95vw', height: '95vh', margin: 'auto' }}>
            <Unity unityProvider={unityProvider} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}

export default Game;