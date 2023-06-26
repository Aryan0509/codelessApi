import React from 'react';

function Modal({
    choice,
    setChoice,
    input1,
    setInput1,
    input2,
    setInput2,
    handleSubmit,
    error
}) {
    const handleChoiceChange = (event) => {
        setChoice(event.target.value);
    };

    const handleInput1Change = (event) => {
        setInput1(event.target.value);
    };

    const handleInput2Change = (event) => {
        setInput2(event.target.value);
    };

    return (
        <div id="modal" class="modal">
            <div class="modal-content">
                <h2>Choose an Option</h2>
                {error && <p className="error">{error}</p>}
                <div>
                    <label>
                        <input
                            type="radio"
                            value="excel"
                            checked={choice === 'excel'}
                            onChange={handleChoiceChange}
                        />
                        Excel
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="mongodb"
                            checked={choice === 'mongodb'}
                            onChange={handleChoiceChange}
                        />
                        MongoDB
                    </label>
                </div>
                <div>
                    <input
                        type="text"
                        value={input1}
                        onChange={handleInput1Change}
                        placeholder="Enter data 1"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        value={input2}
                        onChange={handleInput2Change}
                        placeholder="Enter data 2"
                    />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Modal;
