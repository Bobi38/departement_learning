import { useState } from "react";
import { Paper, Box, Typography, Popover } from "@mui/material";
import France from "@socialgouv/react-departements";
import { departement } from "../../data";

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

// "01" -> "1", "2a" -> "2A" : même format que les codes de data/departement
const normaliserCode = (code) => /^\d+$/.test(code) ? String(Number(code)) : code.toUpperCase()

// "75-92-93-94" -> ["75", "92", "93", "94"]
const codesDe = (valeur) => String(valeur).split("-").map(normaliserCode)

// valeur attendue pour chaque étape (Carte, Région, Département, Chef-lieu) : même ordre que les colonnes
const bonneReponse = (index, guessDepartement) => {
    return guessDepartement[index]
}

const CelluleResultat = ({ guessDepartement, partie }) =>
{
    const [infoAnchor, setInfoAnchor] = useState(null)
    const [infoCodes, setInfoCodes] = useState([])

    const etapes = partie.slice(0, -1)
    const score = etapes.filter((etape) => etape.answerBool).length
    const carte = partie[0]
    const idReponseFausse = carte.answer && !carte.answerBool ? idDepartement(carte.answer) : null
    const codesFausse = idReponseFausse ? codesDe(carte.answer) : []
    const codesBonne = [normaliserCode(String(guessDepartement[0]))]

    // Clic sur la carte : n'ouvre la bulle que sur la mauvaise réponse ou la bonne
    const handleClick = (event) => {
        const forme = event.target.closest('[id^="dpt-"]')
        if (!forme) return
        const codesClic = codesDe(forme.id.slice(4))
        const codes = [...codesFausse, ...codesBonne].filter((code) => codesClic.includes(code))
        if (codes.length === 0) return
        setInfoCodes(codes)
        setInfoAnchor(forme)
    }

    const infos = infoCodes
        .map((code) => departement.find((d) => d[0] === code))
        .filter(Boolean)

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Résultat — code {guessDepartement[0]}</Typography>
            <Typography sx={{ mb: 2 }}>Score : {score} / {etapes.length}</Typography>
            <Box
                onClick={handleClick}
                sx={(theme) => ({
                    '& svg': { width: '100%', height: 'auto', maxHeight: '50vh' },
                    [`& #dpt-${idDepartement(guessDepartement[0])}`]: { cursor: 'pointer' },
                    ...(idReponseFausse && {
                        [`& #dpt-${idReponseFausse}, & #dpt-${idReponseFausse} *`]: {
                            fill: theme.palette.error.main,
                            cursor: 'pointer',
                        },
                    }),
                })}
            >
                <France color={COLOR} highlightColor={HIGHLIGHT_COLOR} departements={[String(guessDepartement[0])]} />
            </Box>
            <Popover
                open={Boolean(infoAnchor)}
                anchorEl={infoAnchor}
                onClose={() => setInfoAnchor(null)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Box sx={{ p: 1.5 }}>
                    {infos.map(([code, region, nom, chefLieu]) => (
                        <Box key={code} sx={{ '& + &': { mt: 1 } }}>
                            <Typography
                                fontWeight="bold"
                                sx={{ color: codesBonne.includes(code) ? "success.main" : "error.main" }}
                            >
                                {code} — {nom}
                            </Typography>
                            <Typography variant="body2">Chef-lieu : {chefLieu}</Typography>
                            <Typography variant="body2">Région : {region}</Typography>
                        </Box>
                    ))}
                </Box>
            </Popover>
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
