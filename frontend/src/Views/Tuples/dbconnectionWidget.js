import '../NavigationBar/navbar.css'
import axios from "axios";
import { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { useState,useEffect } from 'react';
Modal.setAppElement('#root')

function DbConnectionWidget({ toggleDbConnection }) {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState("Your Test is being excecuted...");


    const handleSubmit = async () => {
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
    const linkUrl = 'file:///home/aryangupta/react/Testing/Reports/APISummaryReport.html';
    const linkText = 'view report';

    return (
        <div>
        <div class="widget">
            <span class="close" onClick={toggleDbConnection}>&times;</span>
            <div class="tip">Excecute</div>
            {/* <label for="textbox" class="">Enter Connection String:</label>
    <input type="text" id="textbox" name="textbox"/> */}
            <div class="button-container">
                <button type="button" onClick={handleSubmit}>Excecute</button>
                {/* <button type="button" onClick={handleSubmitForExcel}>Excecute via Excel</button> */}
                <button type="button" onClick={toggleDbConnection}>Cancel</button>
                <a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</a>
            </div>
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
     </div>

    );

}


export default DbConnectionWidget;