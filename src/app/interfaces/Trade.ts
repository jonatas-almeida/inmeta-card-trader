export default interface Trade {
    list: [
        {
            id: string;
            userId: string;
            createdAt: string;
            user: {
                name: string
            },
            tradeCards: [
                {
                    id: string;
                    cardId: string;
                    tradeId: string;
                    type: string;
                    card: {
                        id: string;
                        name: string;
                        description: string;
                        imageUrl: string;
                    }
                },
                {
                    id: string;
                    cardId: string;
                    tradeId: string;
                    type: string;
                    card: {
                        id: string;
                        name: string;
                        description: string;
                        imageUrl: string;
                        createdAt: string;
                    }
                }
            ]
        }
    ],
    rpp: number;
    page: number,
    more: boolean
}