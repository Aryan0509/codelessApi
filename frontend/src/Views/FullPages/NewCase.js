import './NewTestForm.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QueryFragment from './QueryFragment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { FaInfoCircle } from 'react-icons/fa';

function NewCase({ testSuitName,apiname,type}) {

  
  const [formData, setFormData] = useState({
    testSuitName: testSuitName,
    apiname: '',
    isRunableApi:'',
    DependOnTest: "",
    Description: "",
    RandomValues: "",
    RequestType: "",
    BaseURI: "",
    BasePath: "",
    RequestHeaders: "",
    RequestCookies:"",
    QueryParameters: "",
    PathParameters: "",
    RequestBody: "",
    RequestParameters: "",
    MultiPartData: "",
    ResponseCode:"",
    ResponseType: "",
    ResponseCookiesToBeSaved: "",
    ResponseHeadersToBeSaved: "",
    ResponseBodyFieldToBeSaved: "",
    ResponseCookieValidation: "",
    ResponseCookieExpressionValidation: "",
    ResponseHeaderValidation: "",
    ResponseHeaderExpressionValidation:"",
    ResponseBodySchema: "",
    ResponseBody: "",
    ResponseBodyParameters: "",
    ResponseBodyExpressionValidation: ""
  });
  
  const emptyForm={
    testSuitName: '',
    apiname: '',
    isRunableApi:'',
    DependOnTest: "",
    Description: "",
    RandomValues: "",
    RequestType: "",
    BaseURI: "",
    BasePath: "",
    RequestHeaders: "",
    RequestCookies:"",
    QueryParameters: "",
    PathParameters: "",
    RequestBody: "",
    RequestParameters: "",
    MultiPartData: "",
    ResponseCode:"",
    ResponseType: "",
    ResponseCookiesToBeSaved: "",
    ResponseHeadersToBeSaved: "",
    ResponseBodyFieldToBeSaved: "",
    ResponseCookieValidation: "",
    ResponseCookieExpressionValidation: "",
    ResponseHeaderValidation: "",
    ResponseHeaderExpressionValidation:"",
    ResponseBodySchema: "",
    ResponseBody: "",
    ResponseBodyParameters: "",
    ResponseBodyExpressionValidation: ""
  };
  const [apiChoices, setApiChoices] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
  

  useEffect(() => {

    const fetchData = (async () => {
      try {
        const response = await axios.post('/test-query', {
          testSuitName: testSuitName,
          apiname: apiname,
        });
        console.log('Entry Found:', response.data);
        const currentData = { ...formData, ...response.data.parameters };
        currentData.testSuitName = testSuitName;
        console.log(currentData);
        setFormData(currentData);
      }
      catch (err) {
        console.error('Error submitting form data:', err);
      }

    })

    const fetchData2 = async () => {
      try {
        const response = await axios.post('/get-apis', {
          testSuitName
        }); // Replace '/api/data' with your backend API endpoint
        console.log(response);
        const apis=[...response.data,'NA'];
        setApiChoices(apis);
        setSuggestions(apis);
      } catch (error) {
        // Handle error
        setApiChoices([]);
        console.error(error);

      }
    };

    if (type == 'clone') {
      console.log(testSuitName);
      fetchData();
    }
    fetchData2();
  }, []);


  const handleSearchClick = () => {
    setShowDropdown(!showDropdown);
};

const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
};

const handleSelectSuggestion = (suggestion) => {
    setShowDropdown(false);
    setSearchTerm('');
    console.log(suggestion);
    const fetchData = (async () => {
      try {
        const response = await axios.post('/test-query', {
          testSuitName: testSuitName,
          apiname: suggestion,
        });
        console.log('Entry Found:', response.data);
        const currentData = { ...formData, ...response.data.parameters };
        currentData.testSuitName = testSuitName;
        console.log(currentData);
        setFormData(currentData);
      }
      catch (err) {
        console.error('Error submitting form data:', err);
      }

    })
    fetchData();
   

};

const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchTerm.toLowerCase())
);
const handleClearSearch = () => {
    setSearchTerm('');
    setShowDropdown(false);
};




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(testSuitName);
  };

  const handleSubmit = async(e) => {
    console.log(formData);
    e.preventDefault();
    // Make Axios request to the backend
      await axios.post('/new-suite', {
        testSuitName: testSuitName,
        apiname: formData.apiname,
        isRunableApi: formData.isRunableApi,
        DependOnTest: formData.DependOnTest,
        Description: formData.Description,
        RequestType: formData.RequestType,
        RandomValues: formData.RandomValues,
        RequestType: formData.RequestType,  
        BaseURI: formData.BaseURI,
        BasePath: formData.BasePath,
        RequestHeaders: formData.RequestHeaders,
        RequestCookies:formData.RequestCookies,
        QueryParameters: formData.QueryParameters,
        PathParameters: formData.PathParameters,
        RequestBody: formData.RequestBody,
        RequestParameters: formData.RequestParameters,
        MultiPartData: formData.MultiPartData,
        ResponseCode:formData.ResponseCode,
        ResponseType: formData.ResponseType,
        ResponseCookiesToBeSaved: formData.ResponseCookiesToBeSaved,
        ResponseHeadersToBeSaved: formData.ResponseHeadersToBeSaved,
        ResponseBodyFieldToBeSaved: formData.ResponseBodyFieldToBeSaved,
        ResponseCookieValidation: formData.ResponseCookieValidation,
        ResponseCookieExpressionValidation: formData.ResponseCookieExpressionValidation,
        ResponseHeaderValidation: formData.ResponseHeaderValidation,
        ResponseHeaderExpressionValidation: formData.ResponseHeaderExpressionValidation,
        ResponseBodySchema: formData.ResponseBodySchema,
        ResponseBody: formData.ResponseBody,
        ResponseBodyParameters: formData.ResponseBodyParameters,
        ResponseBodyExpressionValidation: formData.ResponseBodyExpressionValidation,

      }
      )
        .then((response) => {
          console.log('Form data submitted successfully:', response);
          toast.success("Test Case added successfully");
          setFormData(emptyForm);
          // Do something with the response if needed
        })
        .catch((error) => {
          console.error('Error submitting form data:', error);
          handleDisplayError(error.response.data.message);
        });

  };

 
  const handleDisplayError = (error) => {
    console.log("hi");
    try{

      toast.error(error);
    }
    catch(error)
    {
      console.error(error);
    }
   
  };
  const reqTypes=["GET","POST","PUT","FETCH","DELETE","PATCH","OPTIONS"];

  return (
    <div>
      <div className="search-container">
                    <button onClick={handleSearchClick}>Clone From existing test Cases</button>
                    {showDropdown && (
                        <div className="dropdown">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="Type to search..."
                            />
                            <a className="" onClick={handleClearSearch} >✕</a>
                            <ul>
                                {filteredSuggestions.map((suggestion) => (
                                    <li key={suggestion} onClick={() => handleSelectSuggestion(suggestion)}>
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
    <div class="fill-details-form">
      <form onSubmit={handleSubmit}>
          <label>
            testSuiteName:
        <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content="A test suite name is a descriptive identifier for a collection of test cases designed to verify software functionality."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </span>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="testSuitName"
              value={testSuitName}
              onChange={handleChange}
              required
              disabled
            />
          
          <br />
          <label>
            Test Case Name:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="A test case is a single unit of testing that verifies a specific aspect or behavior of a software system or application."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="apiname"
              value={formData.apiname}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            isRunableApi:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Hello world!"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="isRunableApi"
              value={formData.isRunableApi}
              onChange={handleChange}
            />
          
          <br />
          <label>
            DependOnTest:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Dependency on test refers to the condition where the execution or outcome of one test case relies on the successful execution or outcome of another test case."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
        <select
              type="text"
              name="DependOnTest"
              value={formData.DependOnTest}
              onChange={handleChange}
              required
            >
              {apiChoices.map((choice, index) => (
                    <option key={index} value={choice}>
                      {choice}
                    </option>
                  ))}
            </select>
          
          <br />
          <label>
            Description:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Concise explanation or summary of the purpose, functionality, or behavior of an API endpoint or operation."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="Description"
              value={formData.Description}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            RandomValues:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Random values are unpredictable and arbitrary data generated for various purposes."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="RandomValues"
              value={formData.RandomValues}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            RequestType:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="In API testing, the RequestType refers to the type of HTTP request being made to the API. "
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <select
              type="text"
              name="RequestType"
              value={formData.RequestType}
              onChange={handleChange}
              required
            >
              {reqTypes.map((choice, index) => (
                    <option key={index} value={choice}>
                      {choice}
                    </option>
                  ))}
            </select>
          
          <br />
          <label>
            BaseURI:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="base URI refers to the root URL or endpoint that serves as the starting point for all API requests."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="BaseURI"
              value={formData.BaseURI}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            BasePath:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="initial portion of the URL used to access different API routes or resources."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="BasePath"
              value={formData.BasePath}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            RequestHeaders:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="metadata or attributes sent along with the API request to provide additional details or instructions to the server."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="RequestHeaders"
              value={formData.RequestHeaders}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            RequestCookies:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="Data sent by the client to the server as part of an HTTP request."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="RequestCookies"
              value={formData.RequestCookies}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            QueryParameters:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="QueryParameters"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="QueryParameters"
              value={formData.QueryParameters}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            PathParameters:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="PathParameters"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="PathParameters"
              value={formData.PathParameters}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            RequestBody:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="RequestBody"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="RequestBody"
              value={formData.RequestBody}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            RequestParameters:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="RequestParameters"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="RequestParameters"
              value={formData.RequestParameters}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            MultiPartData:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="MultiPartData"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="MultiPartData"
              value={formData.MultiPartData}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseCode:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="numerical status code returned by the API server in response to a request."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseCode"
              value={formData.ResponseCode}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseType:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content=" format or structure of the data returned by the API in the response."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseType"
              value={formData.ResponseType}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseCookiesToBeSaved:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="identifying and saving specific cookies from the API response for subsequent use in subsequent requests."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseCookiesToBeSaved"
              value={formData.ResponseCookiesToBeSaved}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseHeadersToBeSaved:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="storing specific header values from the API response for further analysis or reference."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseHeadersToBeSaved"
              value={formData.ResponseHeadersToBeSaved}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseBodyFieldToBeSaved:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="saving specific fields or data from the API response body for further use or analysis."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseBodyFieldToBeSaved"
              value={formData.ResponseBodyFieldToBeSaved}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseCookieValidation:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="ResponseCookieValidation"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseCookieValidation"
              value={formData.ResponseCookieValidation}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseCookieExpressionValidation:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="ResponseCookieExpressionValidation"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseCookieExpressionValidation"
              value={formData.ResponseCookieExpressionValidation}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseHeaderValidation:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="ResponseHeaderValidation"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseHeaderValidation"
              value={formData.ResponseHeaderValidation}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseHeaderExpressionValidation:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="ResponseHeaderExpressionValidation"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseHeaderExpressionValidation"
              value={formData.ResponseHeaderExpressionValidation}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseBodySchema:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="expected structure and format of the response body received from the API.s"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseBodySchema"
              value={formData.ResponseBodySchema}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseBody:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="data or content returned by the API in response to a specific request."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseBody"
              value={formData.ResponseBody}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseBodyParameters:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="data or information returned by an API in the response body."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseBodyParameters"
              value={formData.ResponseBodyParameters}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            ResponseBodyExpressionValidation:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="validating specific expressions or patterns within the response body of an API request."
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="ResponseBodyExpressionValidation"
              value={formData.ResponseBodyExpressionValidation}
              onChange={handleChange}
              required
            />
          
          <br />
        
        <button type='submit'>Create Test Case</button>
        <ToastContainer />
      </form>
    </div>
    </div>
  )
}


export default NewCase;