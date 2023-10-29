import {Container} from "@mui/material";
import {DetailsHeader} from "./DetailsHeader";
import {_shoppingListsService} from "../../services";
import {useEffect, useState} from "react";
import {ShoppingList} from "../../types";

export const ShoppingListDetail = () => {
    const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null)
    useEffect(() => {
        const sl = _shoppingListsService.getShoppingList("12")
        setShoppingList(sl)
    }, []);

    return (
        <Container maxWidth={"md"}>
            <DetailsHeader
                name={shoppingList?.name}
                description={shoppingList?.description}
                image={shoppingList?.image}
            />
        </Container>
    )
}
