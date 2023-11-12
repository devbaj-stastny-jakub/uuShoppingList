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
import {useAppDispatch, useAppSelector, useGetShoppingLists} from "../../hooks";
import {setShoppingLists} from "../../store/shoppingListsListSlice";

export const ShoppingListsList = () => {
    const dispatch = useAppDispatch()
    const [itemsFilter, setItemsFilter] = useState<"active" | "archived">("active")
    const {shoppingLists: sls, loading} = useGetShoppingLists()
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
    const handleCreateList = ()=>{
        const newList = {...shoppingLists[0]}
        newList.name = "Nový nákupní seznam"
        const options = "abcdefghijlmnopqrtuvwxyz1234567890"
        let generatedId = ""
        for(let x = 0;x < 24;x++) {
            generatedId += options[Math.floor(Math.random() * options.length)]
        }
        console.debug(generatedId)
        newList.id = generatedId
        dispatch(setShoppingLists([...shoppingLists, newList]))
    }
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
                <Button onClick={handleCreateList} startIcon={<AddRoundedIcon/>} disableElevation variant={"contained"}>Přidat seznam</Button>
            </Stack>
            <Grid container mt={2} spacing={2}>
                {!loading && filteredShoppingLists.map(shoppingList => (
                    <ShoppingListTile key={shoppingList.id} id={shoppingList.id} name={shoppingList.name}
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
