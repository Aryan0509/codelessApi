import './App.css';
import Navbar from './Views/NavigationBar/Navbar';  
import MoreDetailInfo from './Views/Tuples/MoreDetailsModal'; 
import FragmentUI from './Views/FullPages/FragmentUI'; 
import { useState } from 'react';
import DbConnectionWidget from './Views/Tuples/dbconnectionWidget';
import NewTestForm from './Views/FullPages/NewTestForm';
import CurlParser from './Views/FullPages/CurlParser';
import QueryFragment from './Views/FullPages/QueryFragment';
import axios from 'axios';
import Modal from './Views/FullPages/Modal';
import UpdateRunable from './Views/FullPages/UpdateRunable';
import UpdateRunable2 from './Views/FullPages/UpdateRunable2';

function App() {

  const [showModal, setModal] = useState(false);
  const [showDbModal,setDbModal] = useState(false);
  const [showStateName,setPageName]=useState('new')
  const [showNewCurrentState,setNewCurrentState]=useState('fillDetails')
  const [showCurlAdded,setCurlAdded]=useState('')
  const [showParseCurlButtonClickedStatus,setParseCurlButtonClickedStatus]=useState(false)
  const toggleModal = () => {
    setModal(!showModal);
  }

  const toggleDbConnection = () => {
    setDbModal(!showDbModal);
  }
  const toggleNewTestCaseConnection = () => {
    setParseCurlButtonClickedStatus(false)
    setPageName('new');
  }
  const toggleUpdateTestCaseConnection = () => {
    setParseCurlButtonClickedStatus(false)
    setPageName('update');
  }
  const toggleQueryTestCaseConnection = () => {
    setParseCurlButtonClickedStatus(false)
    setPageName('query');
  }
  const toggleUpdateRunableConnection=()=>{
    setParseCurlButtonClickedStatus(false)
    setPageName('runable');
  }
const changeStateofNewFragment=(data)=>{
    setParseCurlButtonClickedStatus(false)
  setNewCurrentState(data);
  
}

const [showmodal, setShowModal] = useState(true);
const [choice, setChoice] = useState('');
const [input1, setInput1] = useState('');
const [input2, setInput2] = useState('');
const [error, setError] = useState('');

const handleSubmit = async () => {
  if (choice === '' || input1 === '' || input2 === '') {
    setError('All fields are required');
    return;
  }

  try {
    // Make the Axios call to send the data to the backend
    await axios.post('/get-server', {
      choice,
      input1,
      input2
    });

    // Once the call is successful, hide the modal
    setShowModal(false);
  } catch (error) {
    console.error(error);
  }
};


  const names = ['shubhm',""];
  var tuples;
  return (
    <div >
<div color='black'>
{showmodal && (
        <Modal
          choice={choice}
          setChoice={setChoice}
          input1={input1}
          setInput1={setInput1}
          input2={input2}
          setInput2={setInput2}
          handleSubmit={handleSubmit}
        />
      )}
</div>
    <>

    <Navbar toggleDbConnection={toggleDbConnection} toggleNewTestCaseConnection={toggleNewTestCaseConnection} toggleUpdateTestCaseConnection={toggleUpdateTestCaseConnection} toggleQueryTestCaseConnection={toggleQueryTestCaseConnection} toggleUpdateRunableConnection={toggleUpdateRunableConnection}/>
    {showDbModal?<DbConnectionWidget toggleDbConnection={toggleDbConnection}/> : null}
    {/* {showStateName==='query' ? names.map(name=>(
      <Tuple toggleModal={toggleModal}/>
    )) :null} */}
{showStateName==='new' ?(
  
  <>
      <FragmentUI
       optionSelected={showNewCurrentState} 
       changeStateofNewFragment={changeStateofNewFragment}
       />
      {showNewCurrentState==='parseFromCurl' ? 
      <>
      <CurlParser setCurlAdded={setCurlAdded} showCurlAdded={showCurlAdded} setParseCurlButtonClickedStatus={setParseCurlButtonClickedStatus}/>
      {showParseCurlButtonClickedStatus ? <NewTestForm formType={'create'}/> : null}
      
      </> : null}
      {showNewCurrentState==='fillDetails' ? <><NewTestForm formType={'create'}/>
      </> : null}
     </>)
     :null
}
{showStateName==='query' ?(
    <>
      <QueryFragment queryType={'query'}/>
      {/* <Tuple toggleModal={toggleModal}/> */}
    </>)
     :null
}

{showStateName==='update' ?(
    <>
      {/* <QueryFragment queryType={'update'}/> */}
      <NewTestForm formType={'update'}/>
    </>)
     :null
}
{showStateName==='runable' ?(
    <>
      {/* <QueryFragment queryType={'update'}/> */}
      <UpdateRunable2 />
    </>)
     :null
}



    {showModal ?  <MoreDetailInfo toggleModal={toggleModal}/> : null }
    </>
    </div>
  );
  }
export default App;
