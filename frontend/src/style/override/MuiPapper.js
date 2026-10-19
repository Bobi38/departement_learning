const MuiPaper = {
	variants: [
		{
			props: { variant: 'gradient' },
			style: ({ theme }) => ({
				background: theme.palette.gradient.background,
				color: theme.palette.gradient.contrastText,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				padding: theme.spacing(1),
			}),
		},
	],
}

export default MuiPaper
