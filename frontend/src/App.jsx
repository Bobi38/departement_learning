import { useMemo } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Toaster } from 'sonner'
import HomePage from './pages/home/index.jsx'
import CartePage from './pages/carte/index.jsx'
import RegionPage from './pages/region/index.jsx'
import ChronoPage from './pages/chrono/index.jsx'
import { colorZustand } from './zustand/colorZustand.js'
import theme from './style/theme.js'

export default function App() {
    const mode = colorZustand((state) => state.mode)
    const currentTheme = useMemo(() => theme(mode), [mode])

    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Toaster theme={mode} richColors />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/carte" element={<CartePage />} />
                    <Route path="/region" element={<RegionPage />} />
                    <Route path="/chrono" element={<ChronoPage />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}
