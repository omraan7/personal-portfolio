import { useEffect, useState } from 'react'
import Clarity from '../../assets/Clarity.png'
import Nutriplan from '../../assets/Nutriplan.png'
import games from '../../assets/games.png'

import portifolio from '../../assets/portifolio.png'
import Space from '../../assets/Today in Space.png'
import ux from '../../assets/UI UX Review.png'
import Model from '../model/Model'
import StarDark from '../stardark/StarDark'
import { motion } from "framer-motion";


export default function Portfolio() {


  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileInitial = { y: 200, opacity: 0 };
  const desktopInitial = {


    tools: { y: -200, opacity: 0 },

  };

  const projects = [
    {
      id: 1,
      name: "Nutriplan",
      image: Nutriplan,
      liveLink: "https://omraan7.github.io/Nutriplan/#/home",
      gitLink: "https://github.com/omraan7/Nutriplan",
    },

    {
      id: 2,
      name: "Games Live",
      image: games,
      liveLink: "https://omraan7.github.io/games-web/",
      gitLink: "https://github.com/omraan7/games-web",
    },

    {
      id: 3,
      name: "Today in Space",
      image: Space,
      liveLink: "https://omraan7.github.io/Api-Project/#",
      gitLink: "https://github.com/omraan7/Api-Project/tree/main",
    },
    {
      id: 4,
      name: "Clarity",
      image: Clarity,
      liveLink: "https://omraan7.github.io/-Clarity/",
      gitLink: "https://github.com/omraan7/-Clarity",
    },
    {
      id: 5,
      name: "ux",
      image: ux,
      liveLink: "https://omraan7.github.io/UX-Review/",
      gitLink: "https://github.com/omraan7/UX-Review",
    },
    {
      id: 6,
      name: "portfolio",
      image: portifolio,
      liveLink: "https://omraan7.github.io/Dom-project/",
      gitLink: "https://github.com/omraan7/Dom-project",
    },

  ]



  return (
    <>

      <title>PORTFOLIO</title>

      <section id="portfolio" className=" bg-blackk  ">
        <div className="flex items-end gap-3 px-10 pt-6 pb-6 text-whitee text-4xl">
          <span>#</span>
          <span>Projects</span>
          <div className="w-[50px] h-[2px] bg-primarytt"></div>
        </div>
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-blackk dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                initial={isMobile ? mobileInitial : desktopInitial.tools}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 flex flex-col items-center pb-5">
                  <h3 className="text-lg font-bold mb-4 text-white dark:text-white">
                    {project.name}
                  </h3>

                  <div className="flex space-x-4">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-800 text-white rounded border border-black hover:bg-primarytt/80 transition"
                    >
                      Live Demo
                    </a>
                    <a
                      href={project.gitLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


      </section>







    </>
  )
}
