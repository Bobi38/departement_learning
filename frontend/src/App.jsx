import { BrowserRouter, Route, Routes } from 'react-router'
import HelloWorld from './pages/HelloWorld.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HelloWorld />} />
      </Routes>
    </BrowserRouter>
  )
}
