import home from "../../assets/Group 46.png";
import git from "../../assets/media.png";
import makola from "../../assets/quote (1).png";
import moraba from "../../assets/Rectangle 26.png";
import Framme from "../../assets/Frame 36.png";
import grobe from "../../assets/Group 36.png";
import block from "../../assets/Block.png";
import work from "../../assets/Frame 24.png";
import other from "../../assets/Frame 25.png";
import tools from "../../assets/Frame 26.png";
import cv from "../../assets/Mohamed Omran CV.pdf";

import { motion } from "framer-motion";


import { Link } from "react-router";
import { useEffect, useState } from "react";

export default function Home() {
  const text = "Front-End\u00A0Developer";



  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mobileInitial = { y: 200, opacity: 0 };
  const desktopInitial = {
    work: { y: -200, opacity: 0 },
    other: { y: 200, opacity: 0 },
    tools: { y: -200, opacity: 0 },
    block: { y: 200, opacity: 0 },
  };

  return (
    <>
      <title>HOME</title>

      <section id="home" className="relative min-h-screen bg-blackk overflow-hidden pt-10">
        <div className="absolute bottom-[250px] left-0">
          <img src={Framme} alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode" />
        </div>
        <div className="absolute top-[250px] right-0">
          <img src={moraba} alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode" />
        </div>
        <div className="absolute bottom-0 right-10">
          <img src={makola} alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode" className="w-full" />
        </div>
        <div className="absolute top-0 left-0">
          <a
            href="https://github.com/omraan7"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={git} alt="GitHub Profile portofolio," />
          </a>
        </div>

        <div className="max-w-7xl mx-auto h-screen flex items-center px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center w-full">
            <div className="px-4">
              <div className="flex space-x-3">
                <Link to={"https://www.linkedin.com/in/mohamed-omran-02800338a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>       <i className="fa-brands fa-linkedin text-blue-700 text-2xl"></i></Link>
                <Link to={"https://github.com/omraan7"}> <i className="fa-brands fa-github text-blue-700 text-2xl"></i></Link>
              </div>
              <h2 className="text-whitee text-2xl md:text-3xl mb-4">
                Omran is a
                <span className="text-primarytt text-2xl font-bold flex overflow-hidden">
                  {text.split("").map((char, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, type: "spring", stiffness: 500 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h2>

              <p className="text-grayy mb-8">
                Create responsive websites where technology meets creativity.
              </p>
              <div className="flex flex-col md:flex-row gap-3">
                <a  href={cv} target="_blank" className="p-2.5 mt-6 bg-primarytt border border-primarytt hover:bg-blackk rounded-lg text-whitee md:text-xl">Download CV</a>
                <Link onClick={() => window.open("https://omraan7.github.io/Omran/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=...", "_blank")} className="p-2.5 mt-6 bg-blackk border hover:bg-primarytt border-primarytt rounded-lg text-whitee md:text-xl">Social Media</Link>
              </div>

            </div>

            <div>
              <img src={home} alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode" className="w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blackk pt-5">
        <div id="skills" className="flex items-end gap-3 px-10 text-whitee text-4xl">
          <span>#</span>
          <span>Skills</span>
          <div className="w-[50px] h-[2px] bg-primarytt"></div>
        </div>

        <div className="max-w-7xl mx-auto py-10 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-center hidden md:block">
              <img src={grobe} alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode" />
            </div>

            <div className="relative text-center text-2xl text-whitee/50 py-4 md:h-[500px] flex flex-col items-center gap-4 md:gap-0">
              <motion.img
                src={work}
                alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode"
                className="w-24 md:w-auto md:absolute md:top-0 md:left-0"
                initial={isMobile ? mobileInitial : desktopInitial.work}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />

              <motion.img
                src={other}
                alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode"
                className="w-24 md:w-auto md:absolute md:bottom-0 md:left-0"
                initial={isMobile ? mobileInitial : desktopInitial.other}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />

              <motion.img
                src={tools}
                alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode"
                className="w-24 md:w-auto md:absolute md:top-40 md:right-52"
                initial={isMobile ? mobileInitial : desktopInitial.tools}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />

              <motion.img
                src={block}
                alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode"
                className="w-24 md:w-auto md:absolute md:top-0 md:right-0"
                initial={isMobile ? mobileInitial : desktopInitial.block}
                whileInView={{ x: 0, y: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
