
import { useState } from 'react'
import './App.css'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import UploadSection from './components/UploadSection'
import PredictionCard from './components/PredictionCard'
import AnalysisSection from './components/AnalysisSection'

function App() {

  const [result, setResult] = useState({
  prediction: null as string | null,
  confidence: null as number | null,
  original_image: null as string | null,
  ela_image: null as string | null,
});


  return <>
     <Navbar />
     <div className='bg-purple-50 min-h-screen'>
     <HeroSection />
     <UploadSection result={result} setResult={setResult} />
     <PredictionCard prediction={result.prediction} confidence={result.confidence} />
     <AnalysisSection original_image={result.original_image} ela_image={result.ela_image} />
     </div>

      
    </>
}

export default App
