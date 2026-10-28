import { Table, TableContainer } from "@mui/material";
import ListLearnHeader from "./ListLearnHeader.jsx";
import ListLearnItems from "./ListLearnItems.jsx";

const ListLearn = ({data, setData}) =>
{
    return (
        <TableContainer sx={{ maxHeight: '70vh' }}>
            <Table stickyHeader size="small">
                <ListLearnHeader />
                <ListLearnItems data={data} />
            </Table>
        </TableContainer>
    )
}

export default ListLearn
