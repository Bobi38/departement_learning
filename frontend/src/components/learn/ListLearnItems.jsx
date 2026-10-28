import { TableBody, TableRow, TableCell } from "@mui/material";

const ListLearnItems = ({data}) =>
{
    return (
        <TableBody>
            {data.map(([code, region, nom, chefLieu]) => (
                <TableRow key={code} hover>
                    <TableCell>{code}</TableCell>
                    <TableCell>{region}</TableCell>
                    <TableCell>{nom}</TableCell>
                    <TableCell>{chefLieu}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

export default ListLearnItems
