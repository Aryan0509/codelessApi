import './App.css';
import Navbar from './Views/NavigationBar/Navbar';  
import MoreDetailInfo from './Views/Tuples/MoreDetailsModal'; 
import FragmentUI from './Views/FullPages/FragmentUI'; 
import { useEffect, useState } from 'react';
import DbConnectionWidget from './Views/Tuples/dbconnectionWidget';
import NewTestForm from './Views/FullPages/NewTestForm';
import CurlParser from './Views/FullPages/CurlParser';
import QueryFragment from './Views/FullPages/QueryFragment';
import axios from 'axios';
import Modal from './Views/FullPages/Modal';
import UpdateRunable from './Views/FullPages/UpdateRunable';
import UpdateRunable2 from './Views/FullPages/UpdateRunable2';
import HomePage from './Views/FullPages/HomePage';
import TopNavbar from './Views/NavigationBar/TopNavbar';
import SecondaryNavbar from './Views/NavigationBar/SecondaryNavbar';
import NewCase from './Views/FullPages/NewCase';

function App() {

  const [showModal, setModal] = useState(false);
  const [showDbModal,setDbModal] = useState(false);
  const [showStateName,setPageName]=useState('runable')
  const [showNewCurrentState,setNewCurrentState]=useState('fillDetails')
  const [showCurlAdded,setCurlAdded]=useState('')
  const [showParseCurlButtonClickedStatus,setParseCurlButtonClickedStatus]=useState(false)
  const [configData, setConfigData] = useState(null);
  const [suitName,setSuitName]=useState(null);
  const [apiname,setApiname]=useState(null);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const toggleModal = () => {
    setModal(!showModal);
  }

  const toggleDbConnection = () => {
    setDbModal(!showDbModal);
  }
  const toggleHomePageCaseConnection=()=>{
    setParseCurlButtonClickedStatus(false)
    setPageName('home');
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

const [showmodal, setShowModal] = useState(false);
// const [choice, setChoice] = useState('');
// const [input1, setInput1] = useState('');
// const [input2, setInput2] = useState('');
// const [error, setError] = useState('');


useEffect(() => {
  const checkConfigFile = async () => {
    try {
      const response = await axios.get('/api/config');
      const data = response.data;
      if (Object.keys(data).length === 0) {
        setShowModal(true);
      } else {
        console.log(data);
        setConfigData(data);
        setIsAppLoaded(true);
      }
    } catch (error) {
      // Handle API request error
      console.error('Error fetching config data:', error);
    }
  };

  checkConfigFile();
}, []);


const handleSubmit = async (formData) => {
  try {
    console.log("post called");
    await axios.post('/api/config', formData);
    setConfigData(formData);
    setShowModal(false);
    setIsAppLoaded(true);
  } catch (error) {
    // Handle API request error
    console.error('Error saving config data:', error);
  }
};
  
const changeState=(state,suitName,apiname)=>{
  setPageName(state);
  setSuitName(suitName);
  setApiname(apiname);
}


  return (
    <div >
<div color='black'>
{showmodal && (
        <Modal
          onSubmit={handleSubmit}
        />
      )}
</div>
    <>
    <TopNavbar />
    <SecondaryNavbar toggleDbConnection={toggleDbConnection} toggleNewTestCaseConnection={toggleNewTestCaseConnection} toggleUpdateTestCaseConnection={toggleUpdateTestCaseConnection} toggleQueryTestCaseConnection={toggleQueryTestCaseConnection} toggleUpdateRunableConnection={toggleUpdateRunableConnection} toggleHomePageCaseConnection={toggleHomePageCaseConnection} />
    {/* <Navbar toggleDbConnection={toggleDbConnection} toggleNewTestCaseConnection={toggleNewTestCaseConnection} toggleUpdateTestCaseConnection={toggleUpdateTestCaseConnection} toggleQueryTestCaseConnection={toggleQueryTestCaseConnection} toggleUpdateRunableConnection={toggleUpdateRunableConnection} toggleHomePageCaseConnection={toggleHomePageCaseConnection}/> */}
    {/* {showDbModal?<DbConnectionWidget toggleDbConnection={toggleDbConnection}/> : null} */}
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
      <NewTestForm formType={'update'} testSuitName={suitName} apiname={apiname} />
    </>)
     :null
}
{showStateName=='newCase'?(<NewCase testSuitName={suitName} />):null}


{(showmodal==false && showStateName==='runable') ?(
    <>
      {/* <QueryFragment queryType={'update'}/> */}
      <UpdateRunable2 changeState={changeState} isAppLoaded={isAppLoaded}/>
    </>)
     :null
}


    {showModal ?  <MoreDetailInfo toggleModal={toggleModal}/> : null }
    </>
    </div>
  );
  }
export default App;
