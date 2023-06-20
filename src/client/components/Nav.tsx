import Img from "./Img";
import Logo from "../assets/img/logo.png"
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

interface NaVProps {

    className?: string;
    anchor?: any;
    anchor2?: any

}

const anchor = [<a>{"Titulo 1"}</a>, <a>{"Titulo 2"}</a>, <a>{"Titulo 3"}</a>]
const anchor2 = [<a>{"Titulo 4"}</a>, <a>{"Titulo 5"}</a>]



const Nav = ({ className, anchor, anchor2 }: NaVProps) => {

    const [navMobile, setNavMobile] = useState(false)

    const changeState = () => {
        setNavMobile(!navMobile)
    }

    className = `${className} h-20 border-b border-y-slate-200`
    return <div className={"bg-white"}> <nav className={className}>
        <div className={"md:mx-4  flex justify-between md:justify-end items-center"}>
            <span className={"h-20 pl-2 py-1 md:w-1/3 lg:w-2/4 xl:w-2/3"}><Img img={Logo} /></span>
            <div className={"hidden md:flex justify-around md:w-2/4 lg:w-1/3 xl:w-1/4 [&>a]:text-orange-500  [&>a]:cursor-pointer text-lg"}>{anchor}</div>
            <span className={"items-center border-l border-y-slate-500 hidden md:flex justify-around p-2 md:w-1/3 lg:w-1/4 xl:w-1/5 [&>a]:text-orange-500  [&>a]:cursor-pointer text-lg"}>{anchor2}</span>
            <button className={"md:hidden px-6"}>{<FaBars className={"text-orange-500  h-10 w-5"} onClick={changeState} />}</button>

        </div>
        <div className={`${navMobile ? "fixed" : "hidden"}  inset-0 z-50 overflow-hidden md:hidden`}>
            <div className={"absolute inset-0 bg-slate-900/25 backdrop-blur-sm transition-opacity opacity-100"}>
                <div className={"fixed inset-0 flex items-start justify-end overflow-y-auto translate-x-0"}>
                    <div className={"h-full w-[min(20rem,calc(100vw-theme(spacing.10)))] bg-white shadow-2xl ring-1 ring-black/10 transition flex flex-col "}>
                        <button className={"md:hidden px-6"}>{<FaTimes className={"text-orange-500 h-10 w-5"} onClick={changeState} />}</button>
                        <div className={"flex flex-col  items-center self-center [&>a]:p-6 [&>a]:w-full [&>a]:text-orange-500 [&>a]:cursor-pointer text-lg [&>a]:text-center"} onClick={changeState}>{anchor}</div>
                        <span className={"border-t border-y-slate-200 flex flex-col self-center [&>a]:p-6 [&>a]:w-full items-center [&>a]:text-orange-500 [&>a]:cursor-pointer text-lg [&>a]:text-center"} onClick={changeState}>{anchor2}</span>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </div>
}

export default Nav