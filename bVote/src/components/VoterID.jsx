
import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { useGlobalContext } from "../context";

import { VscTrash } from "react-icons/vsc";
import {VIDModal} from "./ModalDialog";


// import Box from '@mui/material/Box';
// import {Button} from '../styles/Button';

// import DashBoard from "./DashBoard";


const VoterID = () => {

    const { updateHomePage, contractInfo } = useGlobalContext();

    const { account,contract, getvoterInfo,getvoterInfoId,stopVoting, getowner, getcandidateInfo,getcandidateInfoId, getcandidateInfoAddr, getvoterInfoAddr,getEndTime,timestamp, getcandidateList,getStartTime } = contractInfo;
    const current = timestamp;
   
    const boolCandidature = account[0].toUpperCase() === getcandidateInfoAddr.toUpperCase();
    const boolVoter = account[0].toUpperCase() === getvoterInfoAddr.toUpperCase();

    const deleteVoter = async() => {
      try {
        console.log("This is delete Voter func")
        const val = await getvoterInfoId;
        console.log(val.toNumber())
        const tx = await contract.deleteVoter(val);
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
                    Your VID(Voter Enrollment ID)
                  </div>
          <div className="card">
                 
                  <div className="card-data" style={{ paddingBottom: '20px'}}> 
                  { getStartTime!=0 && getStartTime <=current ? <div style={{paddingBottom:'20px'}}></div>: 
                    <div style={{ display: 'flex', color: 'black', fontSize: '1.9rem', justifyContent: 'end', marginTop: '12px'}}>
                      <sup><VIDModal/></sup>
                      <sup onClick={deleteVoter}><VscTrash /></sup></div>}
                    <h3 style={{ margin: 'auto' }}>{getvoterInfo[0]}</h3>
                    <hr style={{margin:'7px 0 '}}/>
                    <p style={{}}>Age : {getvoterInfo[5].toNumber()}</p>
                    <p>Gender : {getvoterInfo[4]}</p>
                    <p>Voter ID : {getvoterInfo[3].toNumber()}</p>
                    <p>Address : {getvoterInfo[2]}</p>

                  </div>
                </div>
                </div>

    </div>
  )
}

export default VoterID