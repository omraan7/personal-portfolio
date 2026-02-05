import { useEffect, useState } from "react"
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi"

export default function NavBar({ scrollToSection }) {
    const [hightNav, setHightNav] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [active, setActive] = useState("home")

    useEffect(() => {
        const handleScroll = () => {
            setHightNav(window.scrollY > 100)

            // Active section
            const sections = ["home", "skills", "portfolio", "about"]

            sections.forEach(id => {
                const el = document.getElementById(id)
                if (!el) return

                const rect = el.getBoundingClientRect()
                if (rect.top <= 120 && rect.bottom >= 120) {
                    setActive(id)
                }
            })
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const links = [
        { name: "Home", id: "home" },
        { name: "Skills", id: "skills" },
        { name: "About", id: "about" },
        { name: "Projects", id: "portfolio" },
    ]

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 
      ${hightNav ? "h-[70px]" : "h-[100px]"} bg-blackk`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-full">
                <div
                    onClick={() => scrollToSection("home")}
                    className="cursor-pointer text-primarytt font-bold text-2xl md:text-3xl"
                >
                    OMRAN . . .
                </div>

                {/* Desktop */}
                <ul className="hidden md:flex space-x-6">
                    {links.map(link => (
                        <li key={link.id} className="relative group">
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className={`
                  font-semibold text-lg transition-colors duration-300
                  ${active === link.id ? "text-primarytt" : "text-whitee"}
                `}
                            >
                                <span>#</span>{link.name}
                            </button>

                            <span
                                className={`
                  absolute left-0 -bottom-1 h-[2px] bg-primarytt
                  transition-all duration-300
                  ${active === link.id
                                        ? "w-full"
                                        : "w-0 group-hover:w-full"
                                    }
                `}
                            ></span>
                        </li>
                    ))}
                </ul>

                <button
                    className="md:hidden text-whitee text-3xl"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                </button>
            </div>

            <div
                className={`md:hidden bg-blackk overflow-hidden transition-all
        ${mobileOpen ? "max-h-screen" : "max-h-0"}`}
            >
                <ul className="flex flex-col text-center space-y-6 py-6">
                    {links.map(link => (
                        <li key={link.id}>
                            <button
                                onClick={() => {
                                    scrollToSection(link.id)
                                    setMobileOpen(false)
                                }}
                                className={`
                  text-xl font-semibold transition-colors duration-300
                  ${active === link.id ? "text-primarytt" : "text-whitee"}
                `}
                            >
                                <span>#</span>{link.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}
