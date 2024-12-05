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
    const { unityProvider, isLoaded, loadingProgression } = useUnityContext({
        loaderUrl,
        dataUrl,
        frameworkUrl,
        codeUrl,
        streamingAssetsUrl,
    });

    return (
        <div className="relative w-full h-[95vh] mx-auto bg-gray-900">
            {/* Unity Component is always mounted, just hidden until fully loaded */}
            {unityProvider && (
                <Unity
                    unityProvider={unityProvider}
                    style={{
                        visibility: isLoaded ? 'visible' : 'hidden',
                        width: '100%',
                        height: '100%',
                    }}
                />
            )}

            {/* Loading overlay that sits on top of Unity until it's fully loaded */}
            {!isLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
                    <p className="text-white font-semibold text-xl mb-4">
                        Loading Application... {Math.round(loadingProgression * 100)}%
                    </p>
                    <div className="w-64 h-4 bg-gray-700 rounded overflow-hidden">
                        <div
                            className="h-full bg-blue-600 transition-all duration-200"
                            style={{ width: `${Math.round(loadingProgression * 100)}%` }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;
