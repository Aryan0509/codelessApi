import '../NavigationBar/navbar.css'
import axios from "axios";
// import { useState,useEffect } from 'react';

function DbConnectionWidget({toggleDbConnection}){
    // const [formData, setFormData] = useState({
    //     testSuitName:"",
    //     isRunable:""
    // });
    // const [choices, setChoices] = useState([]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await axios.get('/return-testSuites'); // Replace '/api/data' with your backend API endpoint
    //         console.log(response);
    //         setChoices(response.data);
    //         console.log(choices);
    //       } catch (error) {
    //         // Handle error
    //         console.error(error);
    //       }
    //     };
    //     fetchData();
    //   }, []);

    const handleSubmitForMongo=async()=>{
        await axios.post("/run-command",{choice:"mongo"}).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.error(error);
        })
    }
    const handleSubmitForExcel=async()=>{
        await axios.post("/run-command",{choice:"excel"}).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.error(error);
        })
    }
    const linkUrl = 'file:///home/aryangupta/react/Testing/Reports/APISummaryReport.html';
  const linkText = 'view report';

    return(
<div class="widget">
<span class="close" onClick={toggleDbConnection}>&times;</span>
<div class="tip">Excecute</div>
    {/* <label for="textbox" class="">Enter Connection String:</label>
    <input type="text" id="textbox" name="textbox"/> */}
    <div class="button-container">
      <button type="button" onClick={handleSubmitForMongo}>Excecute via Mongo</button>
      <button type="button" onClick={handleSubmitForExcel}>Excecute via Excel</button>
      <button type="button" onClick={toggleDbConnection}>Cancel</button>
      <a href={linkUrl} target="_blank" rel="noopener noreferrer">{linkText}</a>
    </div>
</div>

    );

}


export default DbConnectionWidget;