export default function InputMezo({ label, type, value, setValue, placeholder }){
    return(
        <div className="mb-3 mx-5 mt-3">
            <label className="mb-1">{label}</label>
            <input  
                className="form-control custom-input"
                style={{ color: '#FF305D'}}
                type={type} 
                value={value}
                onChange={(e)=>setValue(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    )
}