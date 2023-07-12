import '../NavigationBar/navbar.css'
import moreinfo from '../../images/detail.svg';
import MoreDetailInfo from "./MoreDetailsModal.js";
import React, { useState} from 'react';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { RiEdit2Fill } from 'react-icons/ri';
import { FaClone } from 'react-icons/fa';

const Tuple=(props)=>{

  const{testSuitName,apiname,Description,updateArray,changeState}=props;
  const [showModal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!showModal);
  }
  const HandleDelete=async()=>{
  const confirmed = window.confirm('Are you sure you want to delete?');
  if (confirmed) {
    try{
      await axios.post("/delete",{
        testSuitName:testSuitName,
        apiname:apiname
      });
      console.log("deleted");
      updateArray(apiname);
    }
    catch(err){
      console.log(err);
    }
  }
}
  const handleEdit=()=>{
    changeState("update",testSuitName,apiname);
  }

  const handleClone=()=>{
    changeState("clone",testSuitName,apiname);
  }

return(
<>      
<div className="tuple-bg">
  <div className ="firstsec">
    <h5>{apiname}</h5>
    <p>{Description}</p>
  </div>
  <div className ="secondsec">{"Suite -"+ testSuitName}</div>
  <div className ="thirdsec">
  <a onClick={handleEdit}> <RiEdit2Fill /></a>
  <span style={{ margin: '0 20px' }}></span> 
  <a onClick={HandleDelete}><FaTrash /></a>
  <span style={{ margin: '0 20px' }}></span> 
  <a onClick={handleClone}> <FaClone /></a>
  </div>
</div>
{showModal ?  <MoreDetailInfo testSuitName={testSuitName} apiname={apiname} toggleModal={toggleModal}/> : null }
</>
  );
 

}


export default Tuple;