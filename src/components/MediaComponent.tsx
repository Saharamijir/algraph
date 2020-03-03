import React from 'react';
import { Media } from '../models';

export interface MediaComponentProps {
    media: Media
}

const MediaComponent: React.FC<MediaComponentProps> = (props) => {
    return <div>{props.media.Title}</div>
}

export default MediaComponent;