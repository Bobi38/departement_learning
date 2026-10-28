import { TableHead, TableRow, TableCell } from "@mui/material";

const colonnes = ["Code", "Région", "Département", "Chef-lieu"]

const ListLearnHeader = () =>
{
    return (
        <TableHead>
            <TableRow>
                {colonnes.map((titre) => (
                    <TableCell key={titre} sx={{ fontWeight: 'bold' }}>{titre}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default ListLearnHeader
