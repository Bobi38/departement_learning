// "Provence-Alpes-Côte d'Azur" -> "provence alpes cote d azur" : ignore majuscules, accents, tirets et apostrophes
export const normaliser = (texte) => texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[-'’]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
