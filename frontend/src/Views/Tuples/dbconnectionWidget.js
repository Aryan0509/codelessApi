import '../NavigationBar/navbar.css'
// import axios from "axios";
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

    return(
<div class="widget">
<div class="tip">Edit Run Status</div>
    <label for="textbox" class="">Enter Connection String:</label>
    <input type="text" id="textbox" name="textbox"/>
    <div class="button-container">
      <button type="button">OK</button>
      <button type="button" onClick={toggleDbConnection}>Cancel</button>
    </div>
</div>

    );

}


export default DbConnectionWidget;