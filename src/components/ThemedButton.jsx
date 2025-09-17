import './ThemedButton.css'

export default function ThemedButton({ text, event }) {
    return (
        <div className='themedButton' onClick={event}>
            <p className='themedText'>{text}</p>
        </div>
    )
};