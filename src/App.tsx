import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import { Media } from './models';
import MediaCarousel from './components/MediaCarousel';
import * as AnilistService from './services/AnilistService';
import SearchComponent from './components/SearchComponent';

function App() {
  const [media, setMedia] = useState([] as Media[]);
  useEffect(() => {
    AnilistService.getAllRelatedMedia({ Id: 1, Title: { UserPrefered: "" } }).then(x => setMedia(x))
  }, [setMedia]);
  return (
    <div className="App">
      <SearchComponent onResultSelected={x => console.log(x)}/>
      {/* <MediaCarousel mediaList={media} /> */}
    </div>
  );
}

export default App;
