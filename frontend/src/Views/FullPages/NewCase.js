import './NewTestForm.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QueryFragment from './QueryFragment';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewCase({ testSuitName }) {

  
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

  return (
    <div>
    <div class="fill-details-form">
      <div>
      
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          testSuitName:
          <input
            type="text"
            name="testSuitName"
            value={testSuitName}
            onChange={handleChange}
          />
        </label>
        <br />
        {/* <label>
          isRunable:
          <input
            type="text"
            name="isRunable"
            value={formData.isRunable}
            onChange={handleChange}
          />
        </label>
        <br /> */}
        <label>
          apiname:
          <input
            type="text"
            name="apiname"
            value={formData.apiname}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          isRunableApi:
          <input
            type="text"
            name="isRunableApi"
            value={formData.isRunableApi}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
        DependOnTest:
          <input
            type="text"
            name="DependOnTest"
            value={formData.DependOnTest}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
        Description:
          <input
            type="text"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RandomValues:
          <input
            type="text"
            name="RandomValues"
            value={formData.RandomValues}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RequestType:
          <input
            type="text"
            name="RequestType"
            value={formData.RequestType}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          BaseURI:
          <input
            type="text"
            name="BaseURI"
            value={formData.BaseURI}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          BasePath:
          <input
            type="text"
            name="BasePath"
            value={formData.BasePath}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RequestHeaders:
          <input
            type="text"
            name="RequestHeaders"
            value={formData.RequestHeaders}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RequestCookies:
          <input
            type="text"
            name="RequestCookies"
            value={formData.RequestCookies}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          QueryParameters:
          <input
            type="text"
            name="QueryParameters"
            value={formData.QueryParameters}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          PathParameters:
          <input
            type="text"
            name="PathParameters"
            value={formData.PathParameters}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RequestBody:
          <input
            type="text"
            name="RequestBody"
            value={formData.RequestBody}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          RequestParameters:
          <input
            type="text"
            name="RequestParameters"
            value={formData.RequestParameters}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          MultiPartData:
          <input
            type="text"
            name="MultiPartData"
            value={formData.MultiPartData}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseCode:
          <input
            type="text"
            name="ResponseCode"
            value={formData.ResponseCode}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseType:
          <input
            type="text"
            name="ResponseType"
            value={formData.ResponseType}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseCookiesToBeSaved:
          <input
            type="text"
            name="ResponseCookiesToBeSaved"
            value={formData.ResponseCookiesToBeSaved}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseHeadersToBeSaved:
          <input
            type="text"
            name="ResponseHeadersToBeSaved"
            value={formData.ResponseHeadersToBeSaved}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseBodyFieldToBeSaved:
          <input
            type="text"
            name="ResponseBodyFieldToBeSaved"
            value={formData.ResponseBodyFieldToBeSaved}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseCookieValidation:
          <input
            type="text"
            name="ResponseCookieValidation"
            value={formData.ResponseCookieValidation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseCookieExpressionValidation:
          <input
            type="text"
            name="ResponseCookieExpressionValidation"
            value={formData.ResponseCookieExpressionValidation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseHeaderValidation:
          <input
            type="text"
            name="ResponseHeaderValidation"
            value={formData.ResponseHeaderValidation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
        ResponseHeaderExpressionValidation:
          <input
            type="text"
            name="ResponseHeaderExpressionValidation"
            value={formData.ResponseHeaderExpressionValidation}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseBodySchema:
          <input
            type="text"
            name="ResponseBodySchema"
            value={formData.ResponseBodySchema}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseBody:
          <input
            type="text"
            name="ResponseBody"
            value={formData.ResponseBody}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseBodyParameters:
          <input
            type="text"
            name="ResponseBodyParameters"
            value={formData.ResponseBodyParameters}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          ResponseBodyExpressionValidation:
          <input
            type="text"
            name="ResponseBodyExpressionValidation"
            value={formData.ResponseBodyExpressionValidation}
            onChange={handleChange}
          />
        </label>
        <br />
        
        <button type='submit'>Create Test Case</button>
        <ToastContainer />
      </form>
    </div>
    </div>
  )
}


export default NewCase;