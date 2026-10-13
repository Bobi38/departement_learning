import { useState } from "react";
import {Button, Paper, Box, Container, Typography, TextField} from "@mui/material";
import France from "@socialgouv/react-departements";
import {pattern, departement, questions} from "./data.js"

const COLOR = "#74B4FF";
const HIGHLIGHT_COLOR = "#b3ff75";
const PETITE_COURONNE = ["75", "92", "93", "94"];

export default function HelloWorld() {
  const [guess, setGuess] = useState("");
  const [selected, setSelected] = useState([]);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(97);

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

  const handleRandom = () => {
    const min = Number(start);
    const max = Number(end);
    const randomDepartement = min + Math.floor(Math.random() * (max - min + 1));
    if(randomDepartement == 20)
      handleRandom();
    else if (randomDepartement == 96)
      setGuess("2A");
    else if (randomDepartement == 97)
      setGuess("2B");
    else
      setGuess(String(randomDepartement));
  }

  const handleResponse = () => {
    setSelected([guess]);
  };

  const handleForm = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const NStart = Number(formData.get("start"));
    const NEnd = Number(formData.get("end"));
    console.log(NEnd, NStart)
    if (NStart < 1 || NStart > 97 || NEnd < 1 || NEnd > 97 || NStart > NEnd) {
      alert("Veuillez entrer des valeurs valides pour le début et la fin (entre 1 et 97, début <= fin).");
      return;
    }
    setStart(NStart);
    setEnd(NEnd);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 2, marginBottom: 2 }}>
        <form onSubmit={handleForm}>
          <TextField
            name="start"
            label="Début"
            type="number"
            defaultValue={start}
            required
          />
          <TextField
            name="end"
            label="Fin"
            type="number"
            defaultValue={end}
            required
          />
          <Button type="submit">Valider</Button>
        </form>
      </Box>
      <Box onClick={handleClick}>
        <France key={selected.join()} color={COLOR} highlightColor={HIGHLIGHT_COLOR} departements={selected} />
        <Typography>Départements à trouver : {guess || "click sur bouton"}</Typography>
        <Button onClick={handleRandom}>Random</Button>
        <Button onClick={handleResponse}>La réponse</Button>
        <Button onClick={() => setSelected([])}>Reset</Button>
      </Box>
    </Container>
  )
}
