import about from "../../assets/Group 50 (1).png";
import { motion } from "framer-motion";


export default function About() {
    return (
        <>
            <title>ABOUT</title>
            <div id="about" className="flex items-end gap-3 px-10 text-whitee text-4xl bg-blackk">
                <span>#</span>
                <span>About</span>
                <div className="w-[50px] h-[2px] bg-primarytt"></div>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-blackk  justify-items-center  align-items-center">
                <div className="flex items-end gap-3 px-10 text-whitee text-4xl bg-blackk">


                </div>
                <div className="flex items-end gap-3 px-10 text-whitee text-2xl bg-blackk pt-5 pr-3">

                    <h3 >Who am i ?</h3>
                </div>
                <motion.div className="w1/2 hidden md:block  align-self-start"
                    initial={{ x: -300, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    viewport={{ once: true }}

                >
                    <img src={about} alt="react ,reactjs ,nextjs , portofolio,tailwindcss ,bootstrap ,html ,css ,javascript ,typescript ,git ,github ,figma ,vscode" />
                </motion.div>


                <motion.div
                    className="text-whitee p-5 text-sm md:text-lg mix-blend-luminosity min-w-72 leading-8   "
                    initial={{ x: 300, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <p className="text-justify">
                        From my first line of HTML to my first interactive JavaScript app, I’ve always been fascinated by the power of the web to bring ideas to life. My journey as a Junior Web Developer started with mastering HTML, CSS, and JavaScript, building hands-on projects like a Todo List, Calculator, and full CRUD applications. Each project taught me not just how to code, but how to write clean, maintainable code and manage versions effectively using Git and GitHub.

                        As I grew I became passionate about building modern and responsive web applications diving into React.js to create dynamic and scalable user interfaces. Recently, I’ve been exploring Next.js, combining server-side rendering and API routes to build fast, SEO-friendly applications that feel seamless to users.

                        I’m continuously learning and evolving eager to apply my skills to real-world projects and I’m excited to contribute as a junior developer or intern while growing alongside a team of innovators.
                    </p>
                </motion.div>

            </section>




        </>
    )
}
