import {
    Button,
    Container,
    Stack,
    ToggleButton,
    ToggleButtonGroup, useMediaQuery, useTheme,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {_shoppingListsService} from "../../services";
import {useEffect, useLayoutEffect, useState} from "react";
import {ShoppingListItem as ShoppingListItemType} from "../../types";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {ShoppingListItem} from './ShoppingListItem';
import {NewShoppingListItemDialog} from "./NewShoppingListItemDialog";
import {DetailsHeader} from "./DetailsHeader";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setShoppingList} from "../../store/shoppingListSlice";
import axios from "axios";
import {useAuth0} from "@auth0/auth0-react";

export const ShoppingListDetail = () => {
    const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItemType[]>([])
    const [openDialog, setOpenDialog] = useState(false);
    const [itemsFilter, setItemsFilter] = useState<"all" | "unsolved">("unsolved")
    const dispatch = useAppDispatch()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const {shoppingList} = useAppSelector(state => state.shoppingList)

    useEffect(() => {
        const sl = _shoppingListsService.getShoppingList("12")
        dispatch(setShoppingList(sl))
    }, []);

    useEffect(() => {
        if(!shoppingList) return;
    }, [shoppingList?.membersIds]);

    useLayoutEffect(() => {
        if (!shoppingList) return;
        setShoppingListItems(shoppingList.items.filter(shoppingListItem => {
            return itemsFilter === "all" ? true : !shoppingListItem.solved
        }))
    }, [itemsFilter, shoppingList]);

    return (
        <Container maxWidth={"md"}>
            <DetailsHeader
                name={shoppingList?.name}
                description={shoppingList?.description}
                image={shoppingList?.image}
            />
            <Stack direction={{xs:"column", sm: "row"}} mt={3} spacing={2} justifyContent={"space-between"}>
                <ToggleButtonGroup fullWidth={matches} exclusive onChange={(e, state) => {
                    setItemsFilter(state)
                }} value={itemsFilter} color={"primary"}>
                    <ToggleButton value={"unsolved"}>
                        Nevyřešené
                    </ToggleButton>
                    <ToggleButton value={"all"}>
                        Všechny
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button onClick={() => {
                    setOpenDialog(true)
                }} startIcon={<AddRoundedIcon/>} disableElevation variant={"contained"}>Přidat položku</Button>
            </Stack>
            <Grid container mt={3} spacing={2}>
                {shoppingListItems && shoppingListItems.map(shoppingListItem => (
                    <ShoppingListItem
                        key={shoppingListItem.id}
                        id={shoppingListItem.id}
                        name={shoppingListItem.name}
                        solved={shoppingListItem.solved}
                    />
                ))}
            </Grid>
            <NewShoppingListItemDialog
                open={openDialog}
                handleClose={setOpenDialog}
            />
        </Container>
    )
}
