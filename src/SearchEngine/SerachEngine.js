import './SearchEngine.css'
import ResultBox from '../ResultBox/ResultBox'
import {useState} from 'react'
import axios from 'axios'
// import { useEffect } from 'react'
import districtsData from '../District.json'


function SearchEngine(){

    const [language,setlanguage]=useState('');
    const [location,setlocation]=useState('');
    const [experience,setexperience]=useState(0);
    const [Information,setInformation]=useState([])
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [districts, setDistricts] = useState([]);
    const [KeySkills,setKeySkills]=useState([]);
  
    function GetData(){

        const queryParams = {
            language,
            location,
            experience,
            KeySkills
          };
          console.log(queryParams);
        axios.get('http://localhost:5000/JobList',{ params: queryParams }).then((response)=>{
            console.log(response.data.result);
            setInformation(response.data.result);
            console.log(Information,'information')
    }).catch(error=>console.log(error))
    }
        
//    useEffect(()=>{
//     GetData()
//    },[])


// Extract states from the JSON data
const states = districtsData.states.map((stateData) => stateData.state);

// Function to handle state change
const handleStateChange = (event) => {
  const newState = event.target.value;
  setSelectedState(newState);

  // Find the selected state's districts from the JSON data
  const stateData = districtsData.states.find((stateData) => stateData.state === newState);
  if (stateData) {
    setDistricts(stateData.districts);
  } else {
    setDistricts([]);
  }

  setSelectedDistrict('');
};

// Function to handle district change
const handleDistrictChange = (event) => {
  setlocation(event.target.value);
//   setlocation(selectedDistrict)
//     console.log(selectedDistrict)
    console.log(location)
};


function HandleKeySkills(e){
    // if(KeySkills!=='undefined'){
    //     setKeySkills(`${KeySkills},${e.target.value}`)
    // }

    let value=e.target.value;
    console.log(value);
    if(e.target.checked){
        setKeySkills([...KeySkills,value])
    }else{
        setKeySkills(KeySkills.filter(skills=>skills!==value))
    }
    console.log(KeySkills)
}


    return <>
        <h1>Search Job</h1>
        <div id='dropdiv'> 
            <form>
            <div className='rowdiv'>
                <div className='dropdowndiv'>
                    <label htmlFor="language">Language: </label>
                    <select id = "language" style={{ width: '15rem', height: '2rem' }} onChange={(e) => setlanguage(e.target.value)}>
                        <option value="selectlanguage">Select Language</option>
                        <option value="Java">Java</option>
                        <option value="JS">JS</option>
                        <option value="C++">C++</option>
                        <option value="C">C</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Golang">Golang</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Python">Python</option>
                        <option value="Php">PHP</option>
                        <option value="Other">Other</option>
                    </select>
                    </div>
                    <div className='dropdowndiv'>
                        <label htmlFor="state">Select State: </label>
                        <select id="state" value={selectedState} style={{ width: '15rem', height: '2rem' }} onChange={handleStateChange}>
                            <option value="">Select a state</option>
                                {states.map((state, index) => (
                            <option key={index} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                </div>   
                <div className='rowdiv'>
                    <div className='dropdowndiv'>
                        <label htmlFor="district">Select District: </label>
                        <select id="district" value={location} style={{ width: '15rem', height: '2rem' }} onChange={handleDistrictChange}>
                            <option value="">Select a district</option>
                                {districts.map((district, index) => (
                            <option key={index} value={district}>{district}</option>
                                ))}
                        </select>
                    </div>
                    <div className='dropdowndiv'>
                        <label htmlFor="experience">Experience: </label>
                        <select id = "experience" style={{ width: '15rem', height: '2rem' }} onChange={(e) => setexperience(e.target.value)}>
                            <option value="selectexperience">Select Experience</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </div>
                </div>
                <div className='rowdiv'>
                    <div className='dropdowndiv' id='keydrop'>
                        <p>KeySkills</p>
                        <label htmlFor="node.js">Node.JS</label>
                        <input type="checkbox" id="node.js" name="node.js" value="Node.JS" onChange={HandleKeySkills}/>
                        <label htmlFor="react.js">React.JS</label>
                        <input type="checkbox" id="react.js" name="react.js" value="React.JS" onChange={HandleKeySkills}/>
                        <label htmlFor="express.js">Express.JS</label>
                        <input type="checkbox" id="express.js" name="express.js" value="Express.JS" onChange={HandleKeySkills}/>
                        <label htmlFor="mongodb">MongoDB</label>
                        <input type="checkbox" id="mongodb" name="mongodb" value="MongodDB" onChange={HandleKeySkills}/>
                        <label htmlFor="python">Python</label>
                        <input type="checkbox" id="python" name="python" value="Python" onChange={HandleKeySkills}/>
                        <label htmlFor="c++">C++</label>
                        <input type="checkbox" id="c++" name="c++" value="C++" onChange={HandleKeySkills}/>
                            {/* <select id='keyskills' style={{ width: '15rem', height: '2rem' }} onChange={HandleKeySkills}>
                                <option value="selectkeyskills">Select KeySkills</option>
                                <option value='node.js'>Node.JS</option>
                                <option value='react.js'>React.JS</option>
                                <option value='mongodb'>MongoDB</option>
                                <option value='express.js'>Express.JS</option>
                                <option value='python'>Python</option>
                                <option value='c++'>C++</option>
                            </select> */}
                    </div>
                </div>
               
           </form>
        <button id='searchbutton' onClick={GetData}>Search</button>
        </div>
        {Information.map((val,i)=>{
            return     <ResultBox val={val} key={i}/>   
            // <Card val={val} key={i}/>
        })}
        
    </>
}

export default SearchEngine