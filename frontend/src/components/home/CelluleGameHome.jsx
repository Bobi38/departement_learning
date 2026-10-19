import {Paper, Box, Typography, Button} from "@mui/material"
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

const CelluleGameHome = ({url, titre, description}) =>
{
	const navigate = useNavigate()

	return (
		<Paper variant="gradient" sx={{ flexDirection: 'column', gap: 1 }}>
			<Button
				type="button"
				variant="contained"
				onClick={() => navigate(url)}
				sx={{
					bgcolor: 'rgba(0, 0, 0, 0.35)',
					color: '#ffffff',
					fontWeight: 'bold',
					'&:hover': { bgcolor: 'rgba(0, 0, 0, 0.5)' },
				}}
			>
				{titre}
			</Button>
			<Typography>{description}</Typography>
		</Paper>
	)
}

export default CelluleGameHome