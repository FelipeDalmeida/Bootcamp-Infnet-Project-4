interface ContainerProps {
    content: any;
    type?: "auth" | "small" | "form" | "large" | "small-no-pb";
    className?: string;
}

const Container = ({ content, type = "small", className }: ContainerProps) => {

    if (type === "form") {
        return (<div className={"md:h-auto p-2 grid grid-cols-12 gap-4 "}>
            <form
                className={"sm:relative md:my-10 md:pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
                {content}
            </form>
        </div>)
    } else if (type === "auth") {
        return (<div className={"h-[calc(100vh-80px)] p-2 grid grid-cols-12 gap-4 "}>

            <div className={"bg-opacity-75  bg-white sm:relative self-center my-10 pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
                {content}
            </div>
        </div>)
    } else if (type === "small") {
        return(<div className={"h-auto p-2 grid grid-cols-12 gap-4 "}>
            <div className={"relative my-10 pb-20 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
                {content}
            </div>
        </div>)
    } else if (type === "small-no-pb") {
        return(<div className={"h-auto p-2 grid grid-cols-12 gap-4 "}>
            <div className={"sm:relative my-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border  col-start-0 col-span-12 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4"}>
                {content}
            </div>
        </div>)
    } else if (type === "large") {
        return (<div className={"md:h-auto p-2 grid grid-cols-12 gap-4 "}>
            <div className={"relative my-0 md:my-10 md:pb-10 border border-slate-200 rounded-2xl shadow-2xl shadow-blue-500/50  box-border col-start-0 col-span-12 md:col-start-2 md:col-span-10 lg:col-start-3 lg:col-span-8 xxl:col-start-4 xxl:col-span-6"}>
                {content}
            </div>
        </div>)
    } else {
        return (<div className={className}>
            {content}
        </div>)
    }





}

export default Container