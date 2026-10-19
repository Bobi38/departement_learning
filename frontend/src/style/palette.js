const lightPalette = {
    mode: 'light',
    background: {
        default: '#fafafa',
        paper: '#ffffff',
    },
    primary: { main: '#1565c0' },
    secondary: { main: '#c62828' },
    gradient: {
        background: 'linear-gradient(135deg, #1976d2, #d32f2f)',
        contrastText: '#ffffff',
    },
}

const darkPalette = {
    mode: 'dark',
    background: {
        default: '#121212',
        paper: '#1e1e1e',
    },
    primary: { main: '#90caf9' },
    secondary: { main: '#ef9a9a' },
    gradient: {
        background: 'linear-gradient(135deg, #1976d2, #d32f2f)',
        contrastText: '#ffffff',
    },
}


export const getPalette = (mode) =>
{
	return mode === 'dark' ? darkPalette : lightPalette
}