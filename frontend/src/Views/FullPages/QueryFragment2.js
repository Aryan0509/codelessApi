import { useEffect, useState } from "react";
import Tuple from "../Tuples/tuple";
import axios from "axios";

const QueryFragment2 =(props)=>{
    const {testSuitName}=props;
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



    

      return(
        <div>
            
      {(showTuple && data.api) ? (
        <div>

          {data.api.map((api, index) => (
            <Tuple testSuitName={data.testSuitName} apiname={api.apiname} Description={api.parameters.Description} />
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
      ) : null}
        </div>
      )

}
export default QueryFragment2;