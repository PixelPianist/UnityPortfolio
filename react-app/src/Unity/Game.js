// src/UnityGame.js
import React from 'react';
import Unity, { UnityContext } from 'react-unity-webgl';

const unityContext = new UnityContext({
    loaderUrl: "UnityBuild/Build/UnityLoader.js",
    dataUrl: "UnityBuild/Build/Build.data",
    frameworkUrl: "UnityBuild/Build/Build.framework.js",
    codeUrl: "UnityBuild/Build/Build.wasm",
});

function Game() {
    return (
        <div>
            <Unity unityContext={unityContext} style={{ width: "960px", height: "600px" }} />
        </div>
    );
}

export default Game;
