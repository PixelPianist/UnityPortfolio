import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl'
interface GameProps {
    loaderUrl: string;
    dataUrl: string;
    frameworkUrl: string;
    codeUrl: string;
}

const Game: React.FC<GameProps> = ({ loaderUrl, dataUrl, frameworkUrl, codeUrl }) => {
    const unityContext = new UnityContext({
        loaderUrl,
        dataUrl,
        frameworkUrl,
        codeUrl,
    });

    return (
        <div>
            <Unity unityContext={unityContext} style={{ width: "960px", height: "600px" }} />
        </div>
    );
}

export default Game;
