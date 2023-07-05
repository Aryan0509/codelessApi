import { useEffect, useState } from "react";
import Tuple from "../Tuples/tuple";
import axios from "axios";

const QueryFragment2 =(props)=>{
    const {testSuitName,toggleQuery ,changeState}=props;
    const [apiChoices, setApiChoices] = useState([]);
    const [data, setData] = useState(null);
    const [showTuple, setTuple] = useState(false);

    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response =  await axios.post('/all-data', {
            testSuitName: testSuitName,
          }
          ); // Replace '/api/data' with your backend API endpoint
          console.log('Entry Found:', response.data.api);
          setTuple(true);
          setData(response.data);
      } catch (error) {
        // Handle error
        console.error(error);

      }
    };
    fetchData();
  }, []);

  const updateArray=(apiname)=>{
    try{
      const index = data.api.findIndex(item => item.apiname === apiname);

      // If the index is found, remove the object from the array
      if (index !== -1) {
        const newData = {...data};
        console.log("Before update");
        console.log(newData);
        newData.api.splice(index, 1);
        setData(newData);
        console.log("After update");
        console.log(newData);
        setTuple(false);
        setTuple(true);
      }
    }
    catch(err)
    {
        console.log(err);
    }
    
  }

  const addTestCase=()=>{
    changeState('newCase',testSuitName);
  }
    

      return(
        <div>
        <button onClick={toggleQuery}>back</button>
        <span style={{ margin: '0 20px' }}></span> 
        <button onClick={addTestCase}>Add a new Test Case</button>
      {(showTuple && data.api) ? (
        <div>

          {data.api.map((api, index) => (
            <Tuple testSuitName={data.testSuitName} apiname={api.apiname} Description={api.parameters.Description} updateArray={updateArray} changeState={changeState}/>
          ))}
         
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
      ) : 
      (
        <div>
            No TestCases to show.
        </div>
      )
      
      }
        </div>
      )

}
export default QueryFragment2;