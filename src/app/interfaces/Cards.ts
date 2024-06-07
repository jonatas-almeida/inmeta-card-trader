import UserCards from "./UserCards";

export default interface Cards {
    list: [UserCards],
    rpp: number,
    page: number,
    more: boolean
}