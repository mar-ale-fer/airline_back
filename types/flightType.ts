
export type flightType = {
    id: number | null
    name: string
    AirlineId: number
}

export const EmptyFlight: flightType = {
    id: 0,
    name: "",
    AirlineId: 0
}