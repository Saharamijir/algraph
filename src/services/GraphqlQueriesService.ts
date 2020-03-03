import RelatedMediaQuery from "./queries/RelatedMedia.txt!raw";
interface GetRelatedMediaQueryVariables{
    mediaId: number
}
export const getRelatedMediaQuery = (variables: GetRelatedMediaQueryVariables) => {
    console.log(RelatedMediaQuery);
    const query = RelatedMediaQuery;
    return JSON.stringify({
        query: query,
        variables: variables
    });
}