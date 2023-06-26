import './FragmentUI.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tuple from '../Tuples/tuple';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const QueryFragment = (props) => {
  const { queryType, onFormSubmit } = props
  // const choices = ['FolderApi1', 'Option 2', 'Option 3', 'Option 4']; // Replace with your array of choices

  const [choices, setChoices] = useState([]);
  const [apiChoices, setApiChoices] = useState([]);
  const [data, setData] = useState(null);
  const [showTuple, setTuple] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataa, setDataa] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/return-testSuites'); // Replace '/api/data' with your backend API endpoint
        console.log(response);
        setChoices(response.data);
        console.log(choices);
        localStorage.setItem("testSuites",JSON.stringify(response.data));
      } catch (error) {
        // Handle error
        console.error(error);
        
      }
    };
    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    testSuitName: '',
    isRunable: '',
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

  const handleChangeForTest = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const fetchData = async () => {
      try {
        const response = await axios.post('/get-apis', {
          testSuitName: e.target.value
        }); // Replace '/api/data' with your backend API endpoint
        console.log(response);
        setApiChoices(response.data);
      } catch (error) {
        // Handle error
        console.error(error);
        
      }
    };

    if (queryType === 'update') {
      fetchData();
    }

  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make Axios request to the backend

    if (queryType === 'update') {
      axios.post('/test-query', {
        testSuitName: formData.testSuitName,
        apiname: formData.apiname,
      }
      )
        .then((response) => {
          console.log('Entry Found:', response.data);
          setFormData((formData) => ({
            ...formData,
            ...response.data.parameters,
          }));
          onFormSubmit(formData);
          // Do something with the response if needed
        })
        .catch((error) => {
          console.error('Error submitting form data:', error);
          
        });
    }
    else {
      axios.post('/all-data', {
        testSuitName: formData.testSuitName,
      }
      )
        .then((response) => {
          console.log('Entry Found:', response.data.api);
          setTuple(true);
          setDataa(response.data.api);
          setData(response.data);

          handlePagination(currentPage);
        })
        .catch((error) => {
          console.error('Error submitting form data:', error);
          
        });
      console.log(data);

    }
  };

  function handlePagination(pageNumber) {
    // Calculate the starting and ending indices of the data for the current page
    const startIndex = (pageNumber - 1) * 2;
    const endIndex = startIndex + 2;

    // Extract the data for the current page from the original array
    const pageData = dataa.slice(startIndex, endIndex);

    // Update the state with the new data and current page number
    setDataa(pageData);
    console.log(data);
    console.log(currentPage);
    setCurrentPage(pageNumber);
  }

  // const handleDisplayError = (error) => {
  //   console.log("hi");
  //   try{

  //     toast.error(error);
  //   }
  //   catch(error)
  //   {
  //     console.error(error);
  //   }
   
  // };


  return (
    <>
      <div class="fragment_header_query">
        <form onSubmit={handleSubmit}>
          <div class="options">
            <div class="option-query">
              <div class="section">
                <label>
                  Select a testSuitName    :
                </label>
                <select name="testSuitName" value={formData.testSuitName} onChange={handleChangeForTest}>
                  <option value="">Choose an option</option>
                  {choices.map((choice, index) => (
                    <option key={index} value={choice}>
                      {choice}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {queryType === 'update' && (
              <div class="option-query">
                <div class="section">
                  <label>
                    Select an Apiname  :
                  </label>
                  <select name="apiname" value={formData.apiname} onChange={handleChange}>
                    <option value="">Choose an option</option>
                    {apiChoices.map((choice, index) => (
                      <option key={index} value={choice}>
                        {choice}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

            )}

            <div class="option-query">
              <div class="section">
                <label for="queryButton"></label>
                <button name='queryButton' style={{ backgroundColor: '#333', marginTop: '6px' }} type='submit'> {queryType === 'update' ? 'Update' : 'Query'}</button>
              </div>
            </div>

          </div>
        </form>
      </div>
      <div class="lineseperator"></div>

      {(showTuple && data.api) ? (
        <div>

          {data.api.map((api, index) => (
            <Tuple testSuitName={data.testSuitName} apiname={api.apiname} Description={api.parameters.Description} />
          ))}
           <ToastContainer />
          {/* <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === Math.ceil(dataa.length / 2)}
      >
        Next
      </button> */}
        </div>
      ) : null}
      {/* {showTuple? <Tuple toggleModal={toggleModal} /> :null} */}

    </>
  );

}


export default QueryFragment;