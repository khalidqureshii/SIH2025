import React from "react";

interface LabelProp  {
    htmlFor : string;
    labelName: string;
}

const InputField: React.FC<LabelProp> = (props) => {
    const {htmlFor, labelName} = props;
    return (
     <>
      <label htmlFor={htmlFor} className="text-base font-semibold text-cyan-800">{labelName}</label>
     </>
    );
}

export default InputField;