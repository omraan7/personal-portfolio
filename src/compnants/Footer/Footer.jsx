import { Link } from "react-router";

export default function Footer() {
    return (
        <>
            <div className="h-14   text-center text-white bg-blackk space-x-6">
                <Link to={"mailto:mohammedommran2000@gmail.com"} className="m-3 icon"><i className="fa-solid fa-envelope text-2xl"></i></Link >
                <Link to={"https://github.com/omraan7"}><i className="fa-brands fa-github  text-2xl"></i></Link>
                <Link to={"https://www.linkedin.com/in/mohamed-omran-02800338a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"}>       <i className="fa-brands fa-linkedin  text-2xl"></i></Link>
                <Link to={"tel:01069635688"} className="m-3 icon"><i className="fa-brands fa-whatsapp text-2xl"></i></Link >
            </div>


            <div className="bg-blackk text-whitee text-center">
                <p>Copyright © Your Website 2026</p>
            </div>


        </>
    )
}
