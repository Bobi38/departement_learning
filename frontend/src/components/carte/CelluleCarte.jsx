import { useState } from "react";
import {Button, Paper, Box, Container, Typography, TextField} from "@mui/material";
import France from "@socialgouv/react-departements";
import {pattern, departement, questions} from "../../pages/data.js"

const COLOR = "#74B4FF";
const HIGHLIGHT_COLOR = "#b3ff75";
const PETITE_COURONNE = ["75", "92", "93", "94"];

const CelluleCarte = () =>
{
  const [guess, setGuess] = useState("");
  const [selected, setSelected] = useState([]);

  const handleClick = (event) => {
    console.log("event.target:", event.target.id);
    if (!event.target.id) return;
    const departement = event.target.id.slice(4);
    console.log("departement:", departement);
    if (departement === String(guess))
      alert("good")
    else
      alert("bad")
  };

  const handleResponse = () => {
    setSelected([guess]);
  };


  return (
    <Paper>
      <Box onClick={handleClick} sx={{ '& svg': { width: '100%', height: 'auto', maxHeight: '70vh' } }}>
        <France key={selected.join()} color={COLOR} highlightColor={HIGHLIGHT_COLOR} departements={selected} />
        <Typography>Départements à trouver : {guess || "click sur bouton"}</Typography>
        <Button onClick={handleResponse}>La réponse</Button>
        <Button onClick={() => setSelected([])}>Reset</Button>
      </Box>
    </Paper>
  )
}


export default CelluleCarte