import React from "react";

interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    name: string;
    className? : string;
};

const InputField: React.FC<ButtonProp> = (props) => {
    const { name, className = "", ...rest } = props;
    return (
     <>
     <button className={`px-6 py-2 rounded-lg text-white transition ${className}`}{...rest}>{name}</button>
     </>
    );
}

export default InputField;