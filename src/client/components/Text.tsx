interface MessageProps {
    type?: string;
    text: string;
    className?: string;
}

const Text = ({ type, text, className }: MessageProps) => {


    if (type === "h1") {
        return <h1 className={className}>{text}</h1>
    }
    if (type === "h2") {
        return <h2 className={className}>{text}</h2>
    }
    if (type === "h3") {
        return <h3 className={className}>{text}</h3>
    }
    if (type === "h4") {
        return <h4 className={className}>{text}</h4>
    }
    if (type === "h5") {
        return <h5 className={className}>{text}</h5>
    }
    if (type === "h6") {
        return <h6 className={className}>{text}</h6>
    }

    return <p className={className}>{text}</p>
}


Text.defaultProps = {
    style: "",
    text: "",
    type: "p",
}

export default Text;