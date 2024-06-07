export default interface User {
    id: string,
    name: string,
    email: string,
    cards: [
        {
            id: string,
            name: string,
            description: string,
            imageUrl: string
        }
  ]
}