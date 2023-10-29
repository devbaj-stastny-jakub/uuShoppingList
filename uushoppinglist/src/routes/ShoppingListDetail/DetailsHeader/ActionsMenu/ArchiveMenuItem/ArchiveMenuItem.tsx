import {MenuItem} from "@mui/material";
import {useAppDispatch} from "../../../../../hooks";
import {editShoppingListValues} from "../../../../../store/shoppingListSlice";

export const ArchiveMenuItem = ()=>{
    const dispatch = useAppDispatch()
    const handleArchive = ()=>{
        dispatch(editShoppingListValues([{key: "archived", value: true}]))
    }
    return (
        <MenuItem onClick={handleArchive}>Archivovat</MenuItem>
    )
}
