import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './UpdateTable.css'
import QueryFragment2 from './QueryFragment2';
import Modal from 'react-modal';

Modal.setAppElement('#root')
const UpdateRunable2 = ((props) => {
    const {changeState, isAppLoaded}=props;

    const [suits, setSuits] = useState([]);
    const [initial, setInitial] = useState([]);
    const [showQuery, setShowQuery] = useState([]);
    const [suitName, setSuitName] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState("Your Test is being excecuted...");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/testAndRuns'); // Replace '/api/data' with your backend API endpoint
                console.log(response);
                setSuits(response.data);
                const extractedValues = response.data.map((obj) => obj.testSuitName);
                setSuggestions(extractedValues);
                console.log(suits);
                // console.log(response.data);
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };
        if(isAppLoaded)
        {
            fetchData();
        }
    }, [isAppLoaded]);

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
    const toggleQuery = () => {
        setShowQuery(!showQuery);
    }

    const handleSelectAll = async () => {
        const updatedSuits = suits.map((suit) => ({ ...suit, isRunable: 'yes' }));
        setSuits(updatedSuits);
    }

    const handleDisableAll = async () => {
        const updatedSuits = suits.map((suit) => ({ ...suit, isRunable: 'no' }));
        setSuits(updatedSuits);
    }

    const openQueryFragment = (e) => {
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

    const handleExecute = async () => {
        try {
            setIsOpen(true);
            const response = await axios.post("/run-command");
            setData(response.data);
        }
        catch (err) {
            console.error(err.message);
        }
    }
    const handleClose = () => {
        setIsOpen(false);
        setData("Your Test is being excecuted...");
    };

    const handleSearchClick = () => {
        setShowDropdown(!showDropdown);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
    };

    const handleSelectSuggestion = (suggestion) => {
        setSearchTerm('');
        setShowQuery(true);
        setSuitName(suggestion);
        setShowDropdown(false);
    };

    const filteredSuggestions = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handleClearSearch = () => {
        setSearchTerm('');
        setShowDropdown(false);
    };

    const handleClickOutside = (event) => {
        if (showDropdown==true) {
          setShowDropdown(false);
        }
      };

    const handleAdd=()=>{
        changeState("new");
    }
    const linkUrl = 'file:///home/aryangupta/react/Testing/Reports/APISummaryReport.html';
    const linkText = 'view report';

    return (
        <div className=''>

            
            {showQuery == false ? (<div>
                <button onClick={handleAdd}>Add a New Test Suite</button>
                <div className="search-container">
                <button onClick={handleSearchClick}>Search</button>
                {showDropdown && (
                    <div className="dropdown">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleInputChange}
                            placeholder="Type to search..."
                        />
                        <a className=""onClick={handleClearSearch} >✕</a>
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
                <table style={tableStyle}>
                    <caption><h3>List of All the Test Suits</h3></caption>
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

                            <tr key={suit.testSuitName}>

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
                <div className="button-container">
                    <button className="left-button" onClick={handleSelectAll}>Select All</button>
                    <button className="left-button" onClick={handleDisableAll}>Disable All</button>
                    <button className="right-button" onClick={handleClickSubmit}>Update Runables</button>
                    <button className="right-button" onClick={handleExecute}>Excecute Test</button>
                    <a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</a>

                </div>
                <Modal
                    isOpen={isOpen}
                    onRequestClose={handleClose}
                    style={
                        {
                            overlay: { backgroundColor: 'grey', zIndex: 1000 }, // add a zIndex here
                            content: { color: 'black' },
                        }
                    }
                    contentLabel="Example Modal"
                >
                    <button onClick={handleClose}>Close</button>
                    {data && <div>{JSON.stringify(data)}</div>}
                </Modal>



            </div>) : <QueryFragment2 testSuitName={suitName} toggleQuery={toggleQuery} changeState={changeState}/>}
            <ToastContainer />

        </div>
    );

})
export default UpdateRunable2;