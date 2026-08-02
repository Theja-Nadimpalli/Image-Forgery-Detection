
import { useState } from 'react'
import './App.css'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import UploadSection from './components/UploadSection'
import PredictionCard from './components/PredictionCard'
import ResultImages from './components/ResultImages'

function App() {

  const [result, setResult] = useState({
  prediction: null as string | null,
  verdict: null as string | null,
  confidence: null as number | null,
  threshold: null as number | null,
  tampered_area_percent: null as number | null,
  p_forged: null as number | null,
  ela_png_base64: null as string | null,
  mask_png_base64: null as string | null,
  overlay_png_base64: null as string | null,
});


  return <>
     <Navbar />
     <div className='bg-black min-h-screen pt-20 py-10'>
     <HeroSection />
     <UploadSection result={result} setResult={setResult} />
     <PredictionCard result={result} />
      {result.prediction && (
      <ResultImages result={result} />
    )}
     </div>
    
    </>
}

export default App
