import React, { useEffect, useState } from 'react';
import axios from 'axios';
const UpdateRunable2 = (() => {

    const [suits, setSuits] = useState([]);
    const[initial,setInitial]=useState([]);

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
        })
            .catch((err) => {
                console.error(err);
            });

    };

    return (
        <div className='divCenter'>
            {suits.map((suit, index) => (
                <div className="tuple-bgg">
                    <div key={suit.testSuitName}>
                        <div className="firstsec">
                            <span>{suit.testSuitName}</span>
                        
                        {/* <div className="secondsec"> */}
                            <input
                                type="checkbox"
                                checked={suit.isRunable.toLowerCase() === "yes"}
                                onChange={handleToggleRunable(index)}
                            />
                        {/* </div> */}
                        </div>
                    </div>
                </div>
            ))}
            <button onClick={handleClickSubmit} >
                Submit
            </button>
        </div>
    );

})
export default UpdateRunable2;