import { Suspense, useMemo } from 'react'
import { BrowserRouter, useRoutes } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Toaster } from 'sonner'
import routes from '~react-pages'
import { colorZustand } from './zustand/colorZustand.js'
import theme from './style/theme.js'

const AppRoutes = () => useRoutes(routes)

export default function App() {
    const mode = colorZustand((state) => state.mode)
    const currentTheme = useMemo(() => theme(mode), [mode])

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Toaster theme={mode} richColors />
            <BrowserRouter>
                <Suspense fallback={null}>
                    <AppRoutes />
                </Suspense>
            </BrowserRouter>
        </ThemeProvider>
    )
}
