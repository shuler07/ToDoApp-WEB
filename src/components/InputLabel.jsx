export default function InputLabel({ label, inputId, autoComplete, placeholder, type, ref }) {
    const styledInputLabel = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '.5rem',
    };

    return (
        <div style={styledInputLabel}>
            <label className='themedText bold' htmlFor={inputId}>
                {label}
            </label>
            <input id={inputId} className='themedInput' autoComplete={autoComplete} placeholder={placeholder} type={type} ref={ref}></input>
        </div>
    );
}
