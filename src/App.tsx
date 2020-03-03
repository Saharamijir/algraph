import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import { Media } from './models';
import MediaCarousel from './components/MediaCarousel';
import * as AnilistService from './services/AnilistService';

function App() {
  const [media, setMedia] = useState([] as Media[]);
  useEffect(() => {
    AnilistService.getAllRelatedMedia({ Id: 1, Title: "" }).then(x => setMedia(x))
  }, [setMedia]);
  return (
    <div className="App">
      <MediaCarousel mediaList={media} />
    </div>
  );
}

export default App;
