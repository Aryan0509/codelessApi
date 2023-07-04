import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateTable.css'
import QueryFragment2 from './QueryFragment2';

const UpdateRunable2 = ((props) => {

    const [suits, setSuits] = useState([]);
    const[initial,setInitial]=useState([]);
    const [showQuery,setShowQuery]=useState([]);
    const [suitName,setSuitName]=useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/testAndRuns'); // Replace '/api/data' with your backend API endpoint
                console.log(response);
                setSuits(response.data);
                // setInitial(response.data);
                console.log(suits);
                // console.log(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const handleToggleRunable = (index) => (event) => {
        const newSuits = [...suits];
        if (event.target.checked) {
            newSuits[index].isRunable = "yes";
        }
        else {
            newSuits[index].isRunable = "no";
        }
        setSuits(newSuits);
    };

    const handleClickSubmit = async () => {

        // const lowerCaseArray1 = initial.map(item => ({
        //     testSuitName: item.testSuitName.toLowerCase(),
        //     isRunable: item.isRunable
        //   }));
        
        //   const lowerCaseArray2 = suits.map(item => ({
        //     testSuitName: item.testSuitName.toLowerCase(),
        //     isRunable: item.isRunable
        //   }));
        
        //   // Filter array2 based on whether the item exists in array1
        //   const difference = lowerCaseArray2.filter(a2Item => {
        //     return !lowerCaseArray1.some(a1Item => {
        //       return (
        //         a1Item.testSuitName === a2Item.testSuitName &&
        //         a1Item.isRunable === a2Item.isRunable
        //       );
        //     });
        //   });
        // console.log(suits);
        // console.log(initial);
        // console.log(difference);

        await axios.post('update-runables', {
            projectArray: suits
        }).then((response) => {
            console.log(response);
            toast.success("Runables updated successfully")
        })
            .catch((err) => {
                console.error(err);
            });

    };

    const handleSelectAll=async()=>{
        const updatedSuits = suits.map((suit) => ({ ...suit, isRunable: 'yes' }));
        setSuits(updatedSuits);
    }

    const handleDisableAll=async()=>{
        const updatedSuits = suits.map((suit) => ({ ...suit, isRunable: 'no' }));
        setSuits(updatedSuits);
    }

    const openQueryFragment=(e)=>{
        setShowQuery(true);
        setSuitName(e.target.name);
        console.log(e.target.name);
    }

    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
      };
    
      const thStyle = {
        background: '#f2f2f2',
        padding: '8px',
      };
    
      const tdStyle = {
        border: '1px solid #ddd',
        padding: '8px',
      };

    return (
        <div className=''>
            {showQuery==false?(<div>
                <table style={tableStyle}>
            <caption>List of All the Test Suits</caption>
            <thead>
              <tr >
                <th style={thStyle}>Test Suit Name</th>
                <th style={thStyle}>No. of APIs</th>
                {/* <th>Edit</th> */}
                <th style={thStyle}>Checkbox</th>
              </tr>
            </thead>
            <tbody>
            {suits.map((suit, index) => (
               
                    <tr  key={suit.testSuitName}>
                       
                            <td style={tdStyle}><a name={suit.testSuitName} onClick={openQueryFragment}>{suit.testSuitName}</a></td>
                            <td style={tdStyle}>{suit.apiLength}</td>
                        
                        {/* <div className="secondsec"> */}
                        <td style={tdStyle}>
                            <input
                                type="checkbox"
                                checked={suit.isRunable.toLowerCase() === "yes"}
                                onChange={handleToggleRunable(index)}
                            />
                        {/* </div> */}
                        </td>
                        
                    </tr>
               
            ))}
            </tbody>
            </table>
            <button onClick={handleClickSubmit} >
                Submit
            </button>
            <button onClick={handleSelectAll}>Select All</button>
            <button onClick={handleDisableAll}>Disable All</button>
            <ToastContainer />

            </div>):<QueryFragment2 testSuitName={suitName}/>}
            
        </div>
    );

})
export default UpdateRunable2;