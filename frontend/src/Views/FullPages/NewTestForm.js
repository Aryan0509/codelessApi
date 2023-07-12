import './NewTestForm.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QueryFragment from './QueryFragment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { FaInfoCircle } from 'react-icons/fa';

function NewTestForm({ formType, testSuitName, apiname }) {


  const [formData, setFormData] = useState({
    testSuitName: '',
    apiname: '',
    isRunableApi: '',
    DependOnTest: "",
    Description: "",
    RandomValues: "",
    RequestType: "",
    BaseURI: "",
    BasePath: "",
    RequestHeaders: "",
    RequestCookies: "",
    QueryParameters: "",
    PathParameters: "",
    RequestBody: "",
    RequestParameters: "",
    MultiPartData: "",
    ResponseCode: "",
    ResponseType: "",
    ResponseCookiesToBeSaved: "",
    ResponseHeadersToBeSaved: "",
    ResponseBodyFieldToBeSaved: "",
    ResponseCookieValidation: "",
    ResponseCookieExpressionValidation: "",
    ResponseHeaderValidation: "",
    ResponseHeaderExpressionValidation: "",
    ResponseBodySchema: "",
    ResponseBody: "",
    ResponseBodyParameters: "",
    ResponseBodyExpressionValidation: ""
  });

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
        currentData.apiname = apiname;
        console.log(currentData);
        setFormData(currentData);
      }
      catch (err) {
        console.error('Error submitting form data:', err);
      }

    })
    if (formType == 'update') {
      console.log(testSuitName);
      fetchData();
    }
  }, []);



  const emptyForm = {
    testSuitName: '',
    apiname: '',
    isRunableApi: '',
    DependOnTest: "",
    Description: "",
    RandomValues: "",
    RequestType: "",
    BaseURI: "",
    BasePath: "",
    RequestHeaders: "",
    RequestCookies: "",
    QueryParameters: "",
    PathParameters: "",
    RequestBody: "",
    RequestParameters: "",
    MultiPartData: "",
    ResponseCode: "",
    ResponseType: "",
    ResponseCookiesToBeSaved: "",
    ResponseHeadersToBeSaved: "",
    ResponseBodyFieldToBeSaved: "",
    ResponseCookieValidation: "",
    ResponseCookieExpressionValidation: "",
    ResponseHeaderValidation: "",
    ResponseHeaderExpressionValidation: "",
    ResponseBodySchema: "",
    ResponseBody: "",
    ResponseBodyParameters: "",
    ResponseBodyExpressionValidation: ""
  };
  const reqTypes=["GET","POST","PUT","FETCH","DELETE","PATCH","OPTIONS"];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    // Make Axios request to the backend
    if (formType === 'create') {
      axios.post('/new-suite', {
        testSuitName: formData.testSuitName,
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
        RequestCookies: formData.RequestCookies,
        QueryParameters: formData.QueryParameters,
        PathParameters: formData.PathParameters,
        RequestBody: formData.RequestBody,
        RequestParameters: formData.RequestParameters,
        MultiPartData: formData.MultiPartData,
        ResponseCode: formData.ResponseCode,
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
    }
    else {
      axios.post('/update-suite', {
        testSuitName: formData.testSuitName,
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
        RequestCookies: formData.RequestCookies,
        QueryParameters: formData.QueryParameters,
        PathParameters: formData.PathParameters,
        RequestBody: formData.RequestBody,
        RequestParameters: formData.RequestParameters,
        MultiPartData: formData.MultiPartData,
        ResponseCode: formData.ResponseCode,
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
          toast.success("Test Case updated successfully");
          // Do something with the response if needed
        })
        .catch((error) => {
          console.error('Error submitting form data:', error);
          handleDisplayError(error.response.data.message);
        });
    }


  };

  const handleFormSubmit = (response) => {
    setFormData(response);
  };

  const handleDisplayError = (error) => {
    console.log("hi");
    try {

      toast.error(error);
    }
    catch (error) {
      console.error(error);
    }

  };

  return (
    <div class="fill-details-form">
        <form onSubmit={handleSubmit}>
          <label>
            testSuitName:
        <span
            data-tooltip-id="my-tooltip"
            data-tooltip-content="testSuite Detail"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </span>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="testSuitName"
              value={formType=="create"?formData.testSuitName:testSuitName}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            apiname:
        <a
            data-tooltip-id="my-tooltip"
            data-tooltip-content="api detail"
            data-tooltip-place="top"
        >
          <FaInfoCircle className="icon" />
        </a>
        </label>
        <Tooltip id="my-tooltip" />
            <input
              type="text"
              name="apiname"
              value={formType=="create"?formData.apiname:apiname}
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
              required
            />
          
          <br />
          <label>
            DependOnTest:
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
              name="DependOnTest"
              value={formData.DependOnTest}
              onChange={handleChange}
              required
            />
          
          <br />
          <label>
            Description:
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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
            data-tooltip-content="Hello world!"
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

          <button type='submit'>{formType === 'create' ? 'Create Test Case' : 'Update Test Case'}</button>
          <ToastContainer />
        </form>
    
    </div>
  )
}


export default NewTestForm;