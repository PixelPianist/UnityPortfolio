import React from 'react';
import Game from '@components/unity/game';

const HomePage = () => {
  return (
      <div>
        <h1>Unity Game Integration</h1>
        <Game
            loaderUrl="/Build/Build.loader.js"
            dataUrl="/Build/Build.data"
            frameworkUrl="/Build/Build.framework.js"
            codeUrl="/Build/Build.wasm"
            streamingAssetsUrl="/Build/StreamingAssets"
        />
      </div>
  );
}

export default HomePage;
