import './FragmentUI.css'
function FragmentUI({optionSelected,changeStateofNewFragment}){

return(    
<div class="fragment_header">
    <div class="options">
    <div class="option" className={optionSelected === 'fillDetails'? 'option-active' : 'option'}>
        <button onClick={() => changeStateofNewFragment('fillDetails')}>Fill Details</button>
      </div>
      <div class="option" className={optionSelected === 'parseFromCurl'? 'option-active' : 'option'}>
        <button onClick={() => changeStateofNewFragment('parseFromCurl')}>Parse from CURL</button>
      </div>
    </div>
      
</div>


    );

}


export default FragmentUI;