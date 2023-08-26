import './InputField.css';

const InputField = ({value, setValue, required, placeholder}) => {

    return (
        <div className="input-field">
                <input
                    type="text"
                    value={value}
                    required={required}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={placeholder}
                />
        </div>
    )
}

export default InputField;