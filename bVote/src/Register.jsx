import React from "react";
import { Ellipsis } from "react-awesome-spinners";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import VoterRegister from "./components/VoterRegisterForm";
import { useGlobalContext } from "./context";
import { Button } from "./styles/Button";
// import Countdown from 'react-countdown';
const Register = () => {
  const Wrapper = styled.section`
  // position:sticky;
  //   z-index:-2;
    padding: 12rem 0 7rem 0;
    .container {
      margin-top: 6rem;
      text-align: center;
     
    }
  `;

  const { contractInfo } = useGlobalContext();

  // let navigate = useNavigate();
  const { contract, account,
    getcandidateList,
    getvoterList,
    getresult,
    getvoterInfo,
    getvoterInfoAddr,
    getcandidateInfo,
    getcandidateInfoAddr,
    getowner,
    stopVoting,
    getStartTime,timestamp,
    getEndTime,verifyCandidate } = contractInfo;

  console.log(verifyCandidate);
  const boolCandidature = account[0].toUpperCase() === getcandidateInfoAddr.toUpperCase();
  const boolVoter = account[0].toUpperCase() === getvoterInfoAddr.toUpperCase();

const current = timestamp;
// let diffEnd  =( getEndTime-current) *1000;
// let diffStart = ( getStartTime-current) *1000;
// console.log(getStartTime,getEndTime,current,diffStart)
  return (
    <Wrapper>
      {!getvoterInfoAddr ? <div className="container" style={{ height: '23vh' }}>

        <Ellipsis style={{ width: '600px' }} /></div> : <>
        {getStartTime != 0 && getStartTime <= current && getEndTime > current && stopVoting != true ? <div className="container" style={{ marginBottom: '13.8rem' }}>
          <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily: 'Raleway', textAlign: 'center' }}>Elections have been started, cannot register now
          
   </div></div>
          : <>
            {getEndTime!=0 && getEndTime <= current || stopVoting == true ? <div className="container" style={{ marginBottom: '13.8rem' }}>
              <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily: 'Raleway', textAlign: 'center' }}>Elections Completed.
              </div></div>
              : <>
            

                {boolVoter ?
                  <div className="container grid grid-two-column" style={{ marginBottom: '9rem' }}>
                    <div className="common-heading" style={{ fontSize: '2.5rem' }}>You've Already registered</div>
                    <div><NavLink to='/' ><Button className='btn'>Goback</Button></NavLink></div> </div>
                  :
                  <>
                    <VoterRegister decision={false} />
                  </>
                }
                {verifyCandidate ?   <div className='container' style={{ marginTop: '3rem', fontFamily: 'cursive', fontSize: '1.7rem' }}>
                  {boolCandidature ? "" : <>Are you a candidate, go on to register <NavLink to='/candidate_register'>here</NavLink></>}
                </div> :<></>
              }
              </>}
          </>}
      </>}
    </Wrapper>
  );
};

export default Register;