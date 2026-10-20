import { useState } from "react";
import {Button, Paper, Box, Container, Typography, TextField} from "@mui/material";
import France from "@socialgouv/react-departements";
import {pattern, departement, questions} from "../../pages/data.js"

const COLOR = "#74B4FF";
const HIGHLIGHT_COLOR = "#b3ff75";
const PETITE_COURONNE = ["75", "92", "93", "94"];

const CelluleCarte = ({ guessDepartement, onAnswer }) =>
{

  const [selected, setSelected] = useState([]);

  const handleClick = (event) => {
    if (!event.target.id) return;
    let departement = event.target.id.slice(4);
    if (departement < 10)
      departement = departement.slice(1)
    setSelected([departement])
    onAnswer(departement === String(guessDepartement[0]), departement)
  };

  const handleResponse = () => {
    setSelected([guess]);
  };


  return (
    <Box>
      <Typography variant="h6">Carte — code {guessDepartement[0]}</Typography>
      <Box onClick={handleClick} sx={{ '& svg': { width: '100%', height: 'auto', maxHeight: '70vh' } }}>
        <France key={selected.join()} color={COLOR} highlightColor={HIGHLIGHT_COLOR} departements={selected} />
      </Box>
    </Box>
  )
}


export default CelluleCarte