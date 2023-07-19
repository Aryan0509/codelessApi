import React, { useState } from 'react';
import "./WelcomePage.css"
// import FileInput from 'react-file-input';


function Modal({
    onSubmit
}) {

    const [filePath, setFilePath] = useState('');
    const [formData, setFormData] = useState({
        // Initialize the form data state with appropriate fields
        // For example:
        choice: "excel",
        input1: "",
        input2: ""
        // ...
    });
    const [folderPath, setFolderPath] = useState('');

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
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const path = URL.createObjectURL(file);
        setFilePath(path);
      };

    return (
        <div id="modal" class="modal">
            <div class="modal-content">

                <h1>Welcome to our Automated API Testing Software!</h1>
                <p>
                    Our cutting-edge software is designed to make your API testing process seamless and efficient.
                    Whether you're a developer, tester, or quality assurance professional, our tool is here to simplify your workflow and enhance your productivity.
                </p>
                <p>
                    With our software, you can say goodbye to manual testing and repetitive tasks.
                    Harness the power of automation to accelerate your testing cycles, detect bugs early on, and ensure the reliability and functionality of your APIs.
                </p>
                <p>
                    Start automating your API testing today and experience the efficiency and reliability our software brings to your development process.
                    Welcome to a new era of API testing excellence!
                </p>
                <h3>Choose an Option to Continue with</h3>
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
                        File System
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
                {formData.choice === 'excel' ? (<div>
                    <div>
                        <p>
                            If you are using the app for the first time, then please follow the following steps:
                            <ol>
                                <li>Create a new Blank Excel workbook</li>
                                <li>Enter the file path of the workbook below</li>
                            </ol>
                        </p>
                    </div>
                    <div>
                    <input
                        name="input1"
                        type="text"
                        value={formData.input1}
                        onChange={handleChange}
                        placeholder="Enter The absolute file Path of the workbook you want to use."
                    />
                </div>
               
                </div>) : (<div><div>
                    <input
                        name="input1"
                        type="text"
                        value={formData.input1}
                        onChange={handleChange}
                        placeholder="Enter Mongodb Server address. eg: mongodb://localhost:27017"
                    />
                </div>
                    <div>
                        <input
                            name="input2"
                            type="text"
                            value={formData.input2}
                            onChange={handleChange}
                            placeholder="Enter Database Name"
                        />
                    </div></div>)}
                <button onClick={handleSubmit}>Submit</button>
                <h2>Key Features:</h2>
                <ol>
                    <li>Streamlined API Testing: Our software empowers you to automate the testing of your APIs, saving you valuable time and effort. Execute complex test scenarios with ease and gain comprehensive insights into your API's performance.</li>
                    <li>Intuitive Test Creation: Create and manage test cases effortlessly using our user-friendly interface. Define requests, set assertions, and configure test parameters in a few simple steps. Our software supports a wide range of APIs, making it suitable for diverse application landscapes.</li>
                    <li>Robust Test Execution: Run your API tests seamlessly across different environments and platforms. Our software offers compatibility with popular frameworks and libraries, ensuring seamless integration into your existing development ecosystem.</li>
                    <li>Comprehensive Reporting: Get detailed and actionable reports on test results, enabling you to identify issues quickly. Track metrics, monitor performance, and gain valuable insights to improve the quality and reliability of your APIs.</li>
                </ol>


                {/* </div> */}
            </div>
        </div>
    );
}

export default Modal;
