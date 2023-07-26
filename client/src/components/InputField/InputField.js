import './InputField.css';

const InputField = ({value, setValue, required}) => {


    return (
        <div className="input-field">
                <input
                    type="text"
                    value={value}
                    required={required}
                    onChange={(e) => setValue(e.target.value)}
                />
        </div>
    )
}

export default InputField;