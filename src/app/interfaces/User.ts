import UseCards from "./UserCards";

export default interface User {
    id: string,
    name: string,
    email: string,
    cards: [UseCards]
}