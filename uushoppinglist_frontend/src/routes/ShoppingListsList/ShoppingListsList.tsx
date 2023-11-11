import {
    Button,
    Container,
    Stack,
    ToggleButton,
    ToggleButtonGroup,
    useMediaQuery,
    useTheme
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {useEffect, useMemo, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {ShoppingListTile} from "./ShoppingListTile";
import {useAppDispatch, useAppSelector, useGetShoppingLists} from "../../hooks";
import {setShoppingLists} from "../../store/shoppingListsListSlice";

export const ShoppingListsList = () => {
    const dispatch = useAppDispatch()
    const [itemsFilter, setItemsFilter] = useState<"active" | "archived">("active")
    const {shoppingLists: sls} = useGetShoppingLists()
    useEffect(() => {
        dispatch(setShoppingLists(sls))
    }, [sls]);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const {shoppingLists} = useAppSelector(state => state.shoppingListsList)
    const filteredShoppingLists = useMemo(() => {
        return shoppingLists.filter(shoppingList => {
            const archived = itemsFilter === "archived"
            if (shoppingList.archived === archived) {
                return true
            } else {
                return false
            }
        })
    }, [shoppingLists, itemsFilter])

    return (
        <Container maxWidth={"md"}>
            <Stack direction={{xs: "column", sm: "row"}} mt={3} spacing={2} justifyContent={"space-between"}>
                <ToggleButtonGroup fullWidth={matches} exclusive onChange={(e, state) => {
                    setItemsFilter(state)
                }} value={itemsFilter} color={"primary"}>
                    <ToggleButton value={"active"}>
                        Aktuální
                    </ToggleButton>
                    <ToggleButton value={"archived"}>
                        Archivované
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button startIcon={<AddRoundedIcon/>} disableElevation variant={"contained"}>Přidat seznam</Button>
            </Stack>
            <Grid container mt={2} spacing={2}>
                {filteredShoppingLists.map(shoppingList => (
                    <ShoppingListTile key={shoppingList.id} id={shoppingList.id} name={shoppingList.name}
                                      ownerId={shoppingList.ownerId} membersIds={shoppingList.membersIds}
                                      image={shoppingList.image}/>
                ))}
            </Grid>
        </Container>
    )
}
