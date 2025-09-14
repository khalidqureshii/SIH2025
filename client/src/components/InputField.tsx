import React from "react";

interface InputProp {
    id: string;
    value?: string
    placeHolder: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputProp> = (props) => {
    const {id, placeHolder, value, onChange} = props;
    return (
     <>
      <input onChange={onChange} id={id} value={value} type="text" placeholder={placeHolder} className="w-full max-w-xs px-4 py-2 rounded-lg border border-blue-400 placeholder:text-slate-400 bg-white"></input>
     </>
    );
}

export default InputField;