import './navbar.css'
import axios from 'axios';

function Navbar({toggleDbConnection,toggleQueryTestCaseConnection,toggleUpdateTestCaseConnection,toggleNewTestCaseConnection,toggleUpdateRunableConnection,toggleHomePageCaseConnection}){

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

    return(

        <nav>
    <ul>
      {/* <li><a onClick={toggleHomePageCaseConnection}>Home</a></li> */}
      <li><a onClick={toggleUpdateRunableConnection}>Home</a></li>
      <li><a onClick={toggleNewTestCaseConnection}>New Test Case</a></li>
      <li><a onClick={toggleUpdateTestCaseConnection}>Update Test Case</a></li>
      <li><a onClick={toggleQueryTestCaseConnection}>Query</a></li>
      <li><button onClick={HandleReset}>Reset Config</button></li>
      {/* <li><button onClick={toggleDbConnection}>Excecute</button></li> */}
    </ul>
  </nav>

    );

}

export default Navbar;