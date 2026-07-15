import Hero from './components/Hero'
import Navbar from './components/Navbar/Navbar'
import Skills from './components/Skills/Skills'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import Projects from './components/Project/Projects'

function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Footer />
    </div>
  )
}

export default App
