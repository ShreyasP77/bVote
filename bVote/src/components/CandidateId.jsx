
import React from "react";
// import styled from "styled-components";
import { useGlobalContext } from "../context";
import {VscTrash} from "react-icons/vsc";
import { CIDModal } from "./ModalDialog";



const CandidateID = () => {

    const { updateHomePage, contractInfo } = useGlobalContext();

    const { account,contract, getvoterInfo, getowner, getcandidateInfo,getcandidateInfoId, getcandidateInfoAddr, getvoterInfoAddr,timestamp,getEndTime,stopVoting, getcandidateList,getStartTime } = contractInfo;
    // const [openVoterID, setopenVoterID] = React.useState(false);
    // const handleopenVoterID = () => setopenVoterID(true);
    // const handleCloseVoterID = () => setopenVoterID(false);
  
    // const [openCID, setopenCID] = React.useState(false);
    // const handleopenCID = () => setopenCID(true);
    // const handleCloseCID = () => setopenCID(false);
    // let navigate = useNavigate();
   const current = timestamp;
    const boolCandidature = account[0].toUpperCase() === getcandidateInfoAddr.toUpperCase();
    const boolVoter = account[0].toUpperCase() === getvoterInfoAddr.toUpperCase();
    const deleteCandidate = async() => {
      try {
        console.log("This is delete Voter func")
        const val = await getcandidateInfoId;
        const tx = await contract.deleteCandidate(val);
        await tx.wait();
        window.location.reload();

        console.log("Transaction succeded");
    } catch (error) {
        if (error.message.includes('revert')) {
            // Extract the revert message from the error message
            const str = error.message.indexOf('revert') + 9;
            const revertMessage = error.message.substr(str);
            const errorString = revertMessage.substring(1, 29);
            // const subString = ["already registered","not eligible"];
            // for (let index = 0; index < subString.length; index++) {
            //   const element = subString[index];
            //   if(errorString.indexOf(element) !== -1){
            alert(errorString);
            navigate('/', { replace: true })
            //   }

            // }

        }
    }
    } 
  
  return (
    <div>
 <div>
                  <div style={{ display: 'flex', color: 'black', fontSize: '1.9rem', justifyContent: 'center', marginBottom: '12px' }}>
                    Your CID(Candidate ID)
                  </div>
                <div className="card">
                 
                  <div className="card-data" style={{ paddingBottom: '20px' }}> 
                  {getStartTime!=0 && getStartTime <=current ? 
                  <div style={{paddingBottom:'20px'}}></div> : 
                  <div style={{ display: 'flex', color: 'black', fontSize: '1.9rem', justifyContent: 'end', marginTop: '12px' }}>
                    <sup><CIDModal/></sup>
                      <sup><VscTrash onClick={deleteCandidate}/></sup></div>}
                    
                    <h3 style={{ margin: 'auto' }}>{getcandidateInfo[0]}</h3>
                    <hr style={{margin:'7px 0 '}}/>
                    <h4 style={{fontSize:'1.7rem', fontFamily:`'Moon Dance',cursive`}}>{getcandidateInfo[1]}</h4>
                    <p>Age : {getcandidateInfo[2].toNumber()}</p>
                    <p>Gender : {getcandidateInfo[3]}</p>
                    <p>Address : {getcandidateInfo[5]}</p>

                  </div>
                </div>
                </div>
    </div>
  )
}

export default CandidateID