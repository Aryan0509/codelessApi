import React, { useState } from 'react';

function Modal({
    onSubmit
})

{

    const [formData, setFormData] = useState({
        // Initialize the form data state with appropriate fields
        // For example:
        choice:"",
        input1:"",
        input2:""
        // ...
      });
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
      };

    return (
        <div id="modal" class="modal">
            <div class="modal-content">
                <h2>Choose an Option</h2>
                {/* {error && <p className="error">{error}</p>} */}
                <div>
                    <label>
                        <input
                            name="choice"
                            type="radio"
                            value="excel"
                            checked={formData.choice === 'excel'}
                            onChange={handleChange}
                        />
                        Excel
                    </label>
                    <label>
                        <input
                            name="choice"
                            type="radio"
                            value="mongodb"
                            checked={formData.choice === 'mongodb'}
                            onChange={handleChange}
                        />
                        MongoDB
                    </label>
                </div>
                <div>
                    <input
                        name="input1"
                        type="text"
                        value={formData.input1}
                        onChange={handleChange}
                        placeholder="Enter data 1"
                    />
                </div>
                <div>
                    <input
                        name="input2"
                        type="text"
                        value={formData.input2}
                        onChange={handleChange}
                        placeholder="Enter data 2"
                    />
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Modal;
