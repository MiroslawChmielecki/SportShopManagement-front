import React from "react";
import './ErrorShow.css';

interface Props {
    text?: string;
    errorInfo?: string;
}

export const ErrorShow = (props: Props) => {
    return (
        <div className="error">
            <p>{props.text}</p>
        </div>
    )
}