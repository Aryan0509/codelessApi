import '../NavigationBar/navbar.css'
const MoreDetailInfo=(props)=>{
  const {toggleModal}=props;
  return (
<div id="modal" class="modal">
<div class="modal-content">
  <span class="close" onClick={toggleModal}>&times;</span>
  
  <h2>Auth_service_01</h2>
  <form>
    <label for="suiteName">Suite Name</label>
    <input type="text" id="suiteName" name="suiteName" disabled/>

    <label for="description">Description</label>
    <input type="text" id="description" name="description" disabled/>

    <label for="headers">Headers</label>
    <input type="text" id="headers" name="headers" disabled/>

    <label for="cookies">Cookies</label>
    <input type="text" id="cookies" name="cookies" disabled/>

    <label for="validations">Validations</label>
    <input type="text" id="validations" name="validations" disabled/>

    </form>
  </div>
  </div>
  );
}

export default MoreDetailInfo;