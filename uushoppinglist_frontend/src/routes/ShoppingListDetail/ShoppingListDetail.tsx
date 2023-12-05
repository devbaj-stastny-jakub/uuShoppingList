import {
    Button,
    Container, Skeleton,
    Stack,
    ToggleButton,
    ToggleButtonGroup, useMediaQuery, useTheme,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {useEffect, useLayoutEffect, useState} from "react";
import {ShoppingListItem as ShoppingListItemType} from "../../types";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {ShoppingListItem} from './ShoppingListItem';
import {NewShoppingListItemDialog} from "./NewShoppingListItemDialog";
import {DetailsHeader} from "./DetailsHeader";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {setProfile, setShoppingList} from "../../store/shoppingListSlice";
import {useGetShoppingList} from "../../hooks";
import {useNavigate, useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const ShoppingListDetail = () => {
    const {t}=useTranslation()
    const {id} = useParams()
    const navigate = useNavigate()
    const [shoppingListItems, setShoppingListItems] = useState<ShoppingListItemType[]>([])
    const [openDialog, setOpenDialog] = useState(false);
    const [itemsFilter, setItemsFilter] = useState<"all" | "unsolved">("unsolved")
    const dispatch = useAppDispatch()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const {shoppingList} = useAppSelector(state => state.shoppingList)
    const {shoppingList: sl, error} = useGetShoppingList(id)

    useEffect(() => {
        sl && dispatch(setShoppingList(sl))
    }, [sl]);

    useEffect(() => {
        if(error) navigate("/shoppingLists")
    }, [error]);

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
                        {t("shopping_list_detail.unsolved")}
                    </ToggleButton>
                    <ToggleButton value={"all"}>
                        {t("shopping_list_detail.everything")}
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button onClick={() => {
                    setOpenDialog(true)
                }} startIcon={<AddRoundedIcon/>} disableElevation variant={"contained"}>{t("shopping_list_detail.add_item")}</Button>
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
