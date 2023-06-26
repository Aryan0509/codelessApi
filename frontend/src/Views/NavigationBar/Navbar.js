import './navbar.css'

function Navbar({toggleDbConnection,toggleQueryTestCaseConnection,toggleUpdateTestCaseConnection,toggleNewTestCaseConnection,toggleUpdateRunableConnection}){
    return(

        <nav>
    <ul>
      <li><a onClick={toggleNewTestCaseConnection}>New Test Case</a></li>
      <li><a onClick={toggleUpdateTestCaseConnection}>Update Test Case</a></li>
      <li><a onClick={toggleQueryTestCaseConnection}>Query</a></li>
      <li><a onClick={toggleUpdateRunableConnection}>Update Runables</a></li>
      <li><button onClick={toggleDbConnection}>Excecute</button></li>
    </ul>
  </nav>

    );

}

export default Navbar;