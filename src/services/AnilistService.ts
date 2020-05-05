import { Media, Id, Title } from "../models";
import { getRelatedMediaQuery, getSearchQuery } from "./GraphqlQueriesService";

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
    const resp = await fetch(anilistApi, { ...options, body: getRelatedMediaQuery({ mediaId }) });
    return (await resp.json()).data.Media.relations.edges.map((x: any) => mapNodeToMedia(x.node));

}

export const searchForMedia = async (titleOrId: string | Id): Promise<Media[]> => {
    const mapResponseToMediaArray = (x: any): Media[] => {
        if (!!x.data.Page) {
            return x.data.Page.media.map(mapNodeToMedia);
        }
        return [mapNodeToMedia(x.data.Media)];
    }
    const resp = await fetch(anilistApi, { ...options, body: getSearchQuery({ titleOrId: titleOrId, pageNumber: 1, perPage: 1 }) });
    return mapResponseToMediaArray(await resp.json());
}

const mapNodeToMedia = (x: any) : Media => {
    return {
        Id: x.id,
        Title: {
            UserPrefered: x.title.userPrefered,
            English: x.title.english,
            Native: x.title.native,
            Romaji: x.title.romaji
        }
    };
}