import React from 'react';
import Game from '@components/unity/game';

const HomePage = () => {
  return (
      <div>
        <h1>Unity Game Integration</h1>
        <Game
            loaderUrl="/Build/public.loader.js"
            dataUrl="/Build/public.data"
            frameworkUrl="/Build/public.framework.js"
            codeUrl="/Build/public.wasm"
        />
      </div>
  );
}

export default HomePage;
