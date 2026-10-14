import { createTheme } from '@mui/material/styles'
import { getPalette } from './palette'
import MuiPaper from './override/MuiPapper'

const theme = (mode) => 
{
	const palette = getPalette(mode)

	return createTheme({
		palette,
		typography:{
			h1:{
				fontFamily: '"Nunito", sans-serif',
				fontWeight: 800
			},
			h2:{
				fontFamily: '"Nunito", sans-serif',
				fontWeight: 800,
			},
			h3:{
				fontFamily: '"Nunito", sans-serif',
				fontWeight: 800,
			},
			h4:{
				fontFamily: '"Nunito", sans-serif',
				fontWeight: 800
			},
			h5:{
				fontFamily: '"Nunito", sans-serif',
				fontWeight: 800
			},
			h6:{
				fontFamily: '"Nunito", sans-serif',
				fontWeight: 800
			}
		},
		components: {
			MuiPaper,
		},
	})
}

export default theme
