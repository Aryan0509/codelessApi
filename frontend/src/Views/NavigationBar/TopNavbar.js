import axios from 'axios';
import React from 'react';
import './navbar2.css'

const TopNavbar = () => {

    const HandleReset=async()=>{
        try{
          await axios.delete('/delete-config');
          console.log("deleted");
          window.location.reload();
        }
        catch(err)
        {
          console.log(err);
        }
    
      }

  return (
    <nav className="top-navbar">
      <div className="app-name">CodeLess Api Testing</div>
      <button className="logout-button" onClick={HandleReset}>Reset Config</button>
    </nav>
  );
};

export default TopNavbar;
