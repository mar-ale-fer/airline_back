export type CommentType = {
    id: number | null
    text: string
    tags: string
    FlightId: number
    UserId: number
    AirlineId: number
}

export const EmptyComment: CommentType = {
    id: 0,
    text: '',
    tags: '',
    FlightId: 0,
    UserId: 0,
    AirlineId: 0
}