import React from 'react';
import { Media } from '../models';

export interface MediaComponentProps {
    media: Media,
    onClick?: (media: Media) => void
}

const MediaComponent: React.FC<MediaComponentProps> = (props) => {
    return <div onClick={e => props.onClick && props.onClick(props.media)}>{props.media.Title.UserPrefered}</div>
}

export default MediaComponent;