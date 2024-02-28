const HintKeyboard = () => {
    return (
        <div className="keyboard">
            <div className="row">
                <button className='danger' onClick={alert('cancelled')}>Cancel</button>
            </div>
        </div>
    );
};

export default HintKeyboard;
