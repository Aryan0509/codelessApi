import '../NavigationBar/navbar.css'
import moreinfo from '../../images/detail.svg';
import MoreDetailInfo from "./MoreDetailsModal.js";
import React, { useState} from 'react';
const Tuple=(props)=>{

  const{testSuitName,apiname,Description}=props;
  const [showModal, setModal] = useState(false);
  const toggleModal = () => {
    setModal(!showModal);
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
  <img src={moreinfo} title="More Details..." className="moredetails" onClick={toggleModal}/>
  </div>
</div>
{showModal ?  <MoreDetailInfo toggleModal={toggleModal}/> : null }
</>
  );
 

}


export default Tuple;