import { Paper, Box, Typography } from "@mui/material";
import France from "@socialgouv/react-departements";

const COLOR = "#74B4FF";
const HIGHLIGHT_COLOR = "#b3ff75";

const PETITE_COURONNE = ["75", "92", "93", "94"];

const idDepartement = (code) => {
    const valeur = String(code)
    const nombre = Number(valeur)
    if (isNaN(nombre)) return valeur.toUpperCase()
    if (PETITE_COURONNE.includes(valeur)) return "75-92-93-94"
    return nombre < 10 ? "0" + nombre : valeur
}

// valeur attendue pour chaque étape (Carte, Région, Département, Chef-lieu)
const bonneReponse = (index, guessDepartement) => {
    return [guessDepartement[0], guessDepartement[3], guessDepartement[1], guessDepartement[2]][index]
}

const CelluleResultat = ({ guessDepartement, partie }) =>
{
    const etapes = partie.slice(0, -1)
    const score = etapes.filter((etape) => etape.answerBool).length
    const carte = partie[0]
    const idReponseFausse = carte.answer && !carte.answerBool ? idDepartement(carte.answer) : null

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Résultat — code {guessDepartement[0]}</Typography>
            <Typography sx={{ mb: 2 }}>Score : {score} / {etapes.length}</Typography>
            <Box
                sx={(theme) => ({
                    '& svg': { width: '100%', height: 'auto', maxHeight: '50vh' },
                    ...(idReponseFausse && {
                        [`& #dpt-${idReponseFausse}, & #dpt-${idReponseFausse} *`]: {
                            fill: theme.palette.error.main,
                        },
                    }),
                })}
            >
                <France color={COLOR} highlightColor={HIGHLIGHT_COLOR} departements={[String(guessDepartement[0])]} />
            </Box>
            <Box sx={{ mt: 2 }}>
                {etapes.map((etape, index) => (
                    <Typography
                        key={etape.titre}
                        sx={{ color: etape.answerBool ? "success.main" : "error.main" }}
                    >
                        {etape.titre} : {etape.answer ?? "pas de réponse"}
                        {!etape.answerBool && ` (réponse : ${bonneReponse(index, guessDepartement)})`}
                    </Typography>
                ))}
            </Box>
        </Paper>
    )
}

export default CelluleResultat
