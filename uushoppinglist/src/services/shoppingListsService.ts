import {ShoppingList} from "../types";

class ShoppingListsService {
    getShoppingList(id: string): ShoppingList {
        return {
            id: id,
            name: "Můj nákupní seznam",
            description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. In rutrum. Fusce aliquam vestibulum ipsum. Praesent dapibus. Etiam dui sem, fermentum vitae, sagittis id, malesuada in, quam.",
            image: "https://as1.ftcdn.net/v2/jpg/03/47/73/42/1000_F_347734248_edieDn4jeXvvCfGpwrY6rHZofZanW2M1.jpg"
        }
    }
}

export const _shoppingListsService = new ShoppingListsService()
