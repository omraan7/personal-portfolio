import { useRef } from "react"
import NavBar from "../NavBar/NavBar"
import Home from "../Home/Home"
import About from "../About/About"
import Portfolio from "../Portfolio/Portfolio"
import Contact from "../Contact/Contact"
import Footer from "../Footer/Footer"

export default function Layout() {
  const homeRef = useRef(null)
  const aboutRef = useRef(null)
  const portfolioRef = useRef(null)
  const contactRef = useRef(null)

  const scrollToSection = (section) => {
    const options = { behavior: "smooth", block: "start" }

    // Sections as components
    if (section === "home" && homeRef.current)
      return homeRef.current.scrollIntoView(options)

    if (section === "about" && aboutRef.current)
      return aboutRef.current.scrollIntoView(options)

    if (section === "portfolio" && portfolioRef.current)
      return portfolioRef.current.scrollIntoView(options)

    if (section === "contact" && contactRef.current)
      return contactRef.current.scrollIntoView(options)

    // Sections inside Home (like Skills)
    const innerSection = document.getElementById(section)
    if (innerSection) {
      innerSection.scrollIntoView(options)
    }
  }

  return (
    <>
      <NavBar scrollToSection={scrollToSection} />

      {/* offset for fixed navbar */}
      <div className="mt-[100px]">
        <div ref={homeRef}>
          <Home />
        </div>

        <div ref={aboutRef}>
          <About />
        </div>

        <div ref={portfolioRef}>
          <Portfolio />
        </div>

        <Footer/>
      </div>
    </>
  )
}
