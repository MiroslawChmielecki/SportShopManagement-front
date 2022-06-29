import React from "react";
import './ErrorShow.css';

interface Props {
    errorInfo?: string;
    text?: string
}

export const ErrorShow = (props: Props) => {
    return (
        <div className="error">
            <p>{props.text}{props.errorInfo}</p>
        </div>
    )
}