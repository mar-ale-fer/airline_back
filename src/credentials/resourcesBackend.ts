
type flightResource = 'FLIGHTS' | 'FLIGHT_BY_ID' | 'FLIGHT_CREATE' | 'FLIGHT_UPDATE' |
    'FLIGHT_DELETE' | 'FLIGHT_ADD_COMMENT' | 'FLIGHT_REMOVE_COMMENT';

type userResource = 'USERS' | 'USER_BY_ID' | 'USER_CREATE' | 'USER_UPDATE' |
    'USER_DELETE' | 'USER_CHANGE_PASSWORD';

type userOwnResource = 'USER_OWN_CHANGE_PASSWORD' | 'LOGGED_USER';

type commentResource = 'COMMENTS' | 'COMMENT_BY_ID' | 'COMMENT_CREATE' | 'COMMENT_UPDATE' |
    'COMMENT_DELETE';

export type resource =
    flightResource
    | userResource
    | userOwnResource
    | commentResource;

export const flightCRUDResources: flightResource[] = ['FLIGHT_CREATE', 'FLIGHT_UPDATE', 'FLIGHT_DELETE',
    'FLIGHT_ADD_COMMENT', 'FLIGHT_REMOVE_COMMENT'];
export const flightAllResources: flightResource[] = [...flightCRUDResources, 'FLIGHTS', 'FLIGHT_BY_ID'];

export const userCRUDResources: userResource[] = ['USER_CREATE', 'USER_UPDATE', 'USER_DELETE', 'USER_CHANGE_PASSWORD'];
export const userOwnResources: userOwnResource[] = ['USER_OWN_CHANGE_PASSWORD', 'LOGGED_USER'];
export const userAllResources: userResource[] = [...userCRUDResources, 'USERS', 'USER_BY_ID'];

export const commentCRUDResources: commentResource[] = ['COMMENT_CREATE', 'COMMENT_UPDATE', 'COMMENT_DELETE'];
export const commentAllResources: commentResource[] = [...commentCRUDResources, 'COMMENTS', 'COMMENT_BY_ID'];