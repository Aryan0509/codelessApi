import './CurlParser.css'
// import parseCurl from '../../helpers/sample'
function CurlParser({setCurlAdded,showCurlAdded,setParseCurlButtonClickedStatus}){
    const handleChange=(eventname)=>{
            setCurlAdded(eventname.target.value)
    }

    const PrintValue=(eventname)=>{
       console.log(showCurlAdded+"----------------")
    }

return(    


<div class="form">
    <div class="form-group">
      <label for="enterCurl">Enter Curl (bash) :</label>
      <textarea type="text" id="enterCurl" name="enterCurl" onChange={handleChange}/>
    </div>
    <button type="submit" onClick={() =>{PrintValue();setParseCurlButtonClickedStatus(true)}}>Parse Curl</button>
  </div>

    );
}

export default CurlParser;