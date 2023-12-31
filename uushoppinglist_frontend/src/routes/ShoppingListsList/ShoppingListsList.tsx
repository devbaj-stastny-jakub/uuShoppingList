import {
    Button,
    Container, Skeleton,
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
import {useAppDispatch, useAppSelector, useCreateShoppingList, useGetShoppingLists} from "../../hooks";
import {setShoppingLists} from "../../store/shoppingListsListSlice";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const ShoppingListsList = () => {
    const {t}=useTranslation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [itemsFilter, setItemsFilter] = useState<"active" | "archived">("active")

    const {shoppingLists: sls, loading} = useGetShoppingLists()
    const {data, create, loading: loadingCreate} = useCreateShoppingList()

    useEffect(() => {
        dispatch(setShoppingLists(sls))
    }, [sls]);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const {shoppingLists} = useAppSelector(state => state.shoppingListsList)
    const filteredShoppingLists = useMemo(() => {
        return shoppingLists.filter(shoppingList => {
            const archived = itemsFilter === "archived"
            return shoppingList.isArchived === archived;
        })
    }, [shoppingLists, itemsFilter])
    const handleCreateList = async ()=>{
        create()
    }
    useEffect(() => {
        if(data?.id) {
            navigate(`/shoppingList/${data.id}`)
        }
    }, [data]);
    return (
        <Container maxWidth={"md"}>
            <Stack direction={{xs: "column", sm: "row"}} mt={3} spacing={2} justifyContent={"space-between"}>
                <ToggleButtonGroup fullWidth={matches} exclusive onChange={(e, state) => {
                    setItemsFilter(state)
                }} value={itemsFilter} color={"primary"}>
                    <ToggleButton value={"active"}>
                        {t("shopping_lists.active")}
                    </ToggleButton>
                    <ToggleButton value={"archived"}>
                        {t("shopping_lists.archived")}
                    </ToggleButton>
                </ToggleButtonGroup>
                <Button onClick={handleCreateList} startIcon={<AddRoundedIcon/>} disableElevation variant={"contained"}>{t("shopping_lists.add_list")}</Button>
            </Stack>
            <Grid container mt={2} spacing={2}>
                {!loading && filteredShoppingLists.map(shoppingList => (
                    <ShoppingListTile key={shoppingList.id} itemsCount={shoppingList.items.length} id={shoppingList.id} name={shoppingList.name}
                                      ownerId={shoppingList.ownerId} membersIds={shoppingList.membersIds}
                                      image={shoppingList.image}/>
                ))}
                {loading && [1, 1, 1, 1, 1, 1].map(()=>(
                    <Grid xs={12} sm={6} md={4} sx={{cursor: "pointer"}}>
                        <Skeleton variant={"rounded"} height={212} width={"100%"} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
