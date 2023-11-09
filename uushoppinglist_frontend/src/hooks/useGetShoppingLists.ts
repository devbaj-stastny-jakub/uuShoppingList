import {useEffect, useState} from "react";
import {ShoppingList} from "../types";

export const useGetShoppingLists = (id: string) => {
    const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([])
    useEffect(() => {
        const sls = [
            {
                id: "1",
                name: "Můj nákupní seznam 1",
                archived: false,
                ownerId: "auth0|653e6369ee4bf4a8960f49e4",
                membersIds: ["auth0|653e66f0b40aed8716e540bb"],
                description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In rutrum. Fusce aliquam vestibulum ipsum. Praesent dapibus. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.",
                image: "https://as1.ftcdn.net/v2/jpg/03/47/73/42/1000_F_347734248_edieDn4jeXvvCfGpwrY6rHZofZanW2M1.jpg",
                items: [
                    {
                        id: "1",
                        name: "Ledový salát 4ks (max 30kč)",
                        solved: false
                    },
                    {
                        id: "2",
                        name: "Ledový salát 3ks (max 30kč)",
                        solved: false
                    },
                    {
                        id: "3",
                        name: "Ledový salát 2ks (max 30kč)",
                        solved: false
                    },
                    {
                        id: "4",
                        name: "Ledový salát 1ks (max 30kč)",
                        solved: true
                    }
                ]
            },
            {
                id: "2",
                name: "Můj nákupní seznam 2",
                archived: false,
                ownerId: "auth0|653e6369ee4bf4a8960f49e3",
                membersIds: ["auth0|653e66f0b40aed8716e540bc"],
                description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In rutrum. Fusce aliquam vestibulum ipsum. Praesent dapibus. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.",
                image: "https://as1.ftcdn.net/v2/jpg/03/47/73/42/1000_F_347734248_edieDn4jeXvvCfGpwrY6rHZofZanW2M1.jpg",
                items: [
                    {
                        id: "1",
                        name: "Ledový salát 4ks (max 30kč)",
                        solved: false
                    },
                    {
                        id: "2",
                        name: "Ledový salát 3ks (max 30kč)",
                        solved: false
                    },
                    {
                        id: "3",
                        name: "Ledový salát 2ks (max 30kč)",
                        solved: false
                    },
                    {
                        id: "4",
                        name: "Ledový salát 1ks (max 30kč)",
                        solved: true
                    }
                ]
            }
        ]
        setShoppingLists(sls)
    }, []);
    return {shoppingLists}
}
