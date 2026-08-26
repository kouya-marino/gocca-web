import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Services from './pages/Services'
import CorporateGifting from './pages/CorporateGifting'
import Team from './pages/Team'
import WorkWithUs from './pages/WorkWithUs'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="corporate-gifting" element={<CorporateGifting />} />
        <Route path="team" element={<Team />} />
        <Route path="work-with-us" element={<WorkWithUs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
