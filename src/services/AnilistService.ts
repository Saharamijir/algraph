import { Media } from "../models";
import { getRelatedMediaQuery } from "./GraphqlQueriesService";

const anilistApi = 'https://graphql.anilist.co';
const options: RequestInit = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    mode: "cors"
};



export const getAllRelatedMedia = async (media: Media) => {
    const relatedMedia = [media];
    const addRelatedMedia = (m: Media) => {
        if (!relatedMedia.some(x => x.Id === m.Id)) {
            relatedMedia.push(m);
        }
    };
    for (const m of relatedMedia) {
        const relations = await getRelatedMedia(m.Id);
        relations.forEach(x => addRelatedMedia(x));
    }
    return relatedMedia;
}

export const getRelatedMedia = async (mediaId: number): Promise<Media[]> => {
    const mapNodeToMedia = (x: any) : Media => {
        return {
            Id: x.id,
            Title: x.title.romaji
        };
    }
    console.log(getRelatedMediaQuery({ mediaId }));
    const resp = await fetch(anilistApi, { ...options, body: getRelatedMediaQuery({ mediaId }) });
    console.log(resp);
    return (await resp.json()).data.Media.relations.edges.map((x: any) => mapNodeToMedia(x.node));

}

export const searchForMedia = async (title: string) => {

}