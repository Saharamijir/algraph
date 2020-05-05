import RelatedMediaQuery from "./queries/RelatedMedia.gql";
import SearchMediaById from "./queries/SearchMediaById.gql";
import SearchMediaByTitle from "./queries/SearchMediaByTitle.gql";
import { Title, Id } from "../models";

interface GetRelatedMediaQueryVariables {
    mediaId: number
}
export const getRelatedMediaQuery = (variables: GetRelatedMediaQueryVariables) => {
    const query = RelatedMediaQuery;
    return JSON.stringify({
        query: query,
        variables: variables
    });
}
interface SearchQueryVariables {
    titleOrId: string | Id,
    perPage?: number,
    pageNumber?: number
}
export const getSearchQuery = (variables: SearchQueryVariables) => {
    const query = (isTitle(variables.titleOrId) ? SearchMediaByTitle : SearchMediaById);
    return JSON.stringify({
        query: query,
        variables: variables
    });
}
const isTitle = (object: any): object is Title => <Title>object !== undefined;