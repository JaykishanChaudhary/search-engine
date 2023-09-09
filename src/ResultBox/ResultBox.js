import './ResultBox.css'


function ResultBox({val}){
return <>
<div id='resultbox'>
    <h3 id='jobtype'>{val.jobtype}</h3>
    <div id="exloc">
        <p>{val.CompanyName}</p>
        <p>experience:{val.experience} years</p>
        <p>location: {val.location}</p>
    </div>
    <p id="jobdescription">Job description:{val.JobDescription}</p>
    <p id="keyskills">KeySkills:{val.KeySkills}</p>
    <button id="applybutton">Apply</button>
</div>

</>


}


export default ResultBox