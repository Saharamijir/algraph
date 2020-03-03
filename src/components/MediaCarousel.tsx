import React, { useMemo } from 'react';
import { Media } from "../models";
import MediaComponent from './MediaComponent';

export interface MediaCarouselProps {
    mediaList: Media[]
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({mediaList}) => {
    const media = useMemo(() => mediaList.map(m => <MediaComponent media={m} key={m.Id}/>), [mediaList]);
    return <>
        {media}
    </>;
}

export default MediaCarousel;