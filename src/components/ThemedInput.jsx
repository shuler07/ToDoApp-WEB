import './ThemedInput.css'

export default function ThemedInput({ hint, type, ref }) {
    return (
        <input className='themedInput' placeholder={hint} type={type} ref={ref}></input>
    );
};