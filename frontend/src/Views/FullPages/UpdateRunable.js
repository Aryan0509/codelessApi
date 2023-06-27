import React, { useEffect, useState } from 'react';
import axios from 'axios';


const UpdateRunable = (() => {
    const [choices, setChoices] = useState([]);
    const [formData, setFormData] = useState({
        testSuitName: "",
        isRunable: ""
    });
    const [showModel, setShowModel] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/return-testSuites'); // Replace '/api/data' with your backend API endpoint
                console.log(response);
                setChoices(response.data);
                console.log(choices);
            } catch (error) {
                // Handle error
                console.error(error);
                // handleDisplayError(error.response.data.message);
            }
        };
        fetchData();
    }, []);

    const toggleModal = () => {
        setShowModel(!showModel);
    }

    const handleChangeForTest = (e) => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });

    };
    const handleChoiceChange = (e) => {
        // setRunable(event.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        console.log(formData.testSuitName + formData.isRunable);
        try {
            await axios.post("/update-runable",
                {
                    testSuitName: formData.testSuitName,
                    isRunable: formData.isRunable
                })
            setFormData({
                testSuitName: "",
                isRunable: ""
            })
        }
        catch (error) {
            console.error('Error submitting form data:', error);
        }


    };


    return (
        <div>
            {showModel ? (<div id="modal" class="modal">
                <div class="modal-content">
                    <span class="close" onClick={toggleModal}>&times;</span>

                    <label>
                        Select a testSuitName    :
                    </label>
                    <select name="testSuitName" value={formData.testSuitName} onChange={handleChangeForTest} style={{
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        boxShadow: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
                    }}>
                        <option value="">Choose an option</option>
                        {choices.map((choice, index) => (
                            <option key={index} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </select>
                    <div>
                        <h2>Select IsRunable?</h2>
                        <label>
                            <input
                                name="isRunable"
                                type="radio"
                                value="yes"
                                checked={formData.isRunable === 'yes'}
                                onChange={handleChoiceChange}
                            />
                            yes
                        </label>
                        <label>
                            <input
                                name="isRunable"
                                type="radio"
                                value="no"
                                checked={formData.isRunable === 'no'}
                                onChange={handleChoiceChange}
                            />
                            no
                        </label>
                    </div>
                    <button onClick={handleSubmit}>Submit</button>

                </div>

            </div>) : null
            }

        </div>
    )
});
export default UpdateRunable;