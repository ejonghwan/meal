
interface Props { 
    attr: {
        type: string;
        value: string;
        placeholder: string;
    }
    handleInputChange: any
    
}


const Input = ({ attr, handleInputChange }: Props) => {
    return (
        <input {...attr} onChange={handleInputChange}/>
    )
}

export default Input;