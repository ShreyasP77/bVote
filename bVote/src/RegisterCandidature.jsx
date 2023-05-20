import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { Ellipsis } from "react-awesome-spinners";

import { Button } from "./styles/Button";
import CandidateRegister from "./components/CandidateRegister";
const RegisterCandidature = () => {
  const Wrapper = styled.section`
    padding: 12rem 0 7rem 0;
    // position:sticky;
    // z-index:-2;
    .container {
      margin-top: 6rem;
      text-align: center;
     
    }
  `;


  let navigate = useNavigate();

  const { contractInfo } = useGlobalContext();
  // let navigate = useNavigate();
  const { contract, account, verifyCandidate, timestamp, getcandidateList, getvoterList, getresult, getvoterInfo, stopVoting, getcandidateInfo, getcandidateInfoAddr, getowner, getStartTime, getEndTime } = contractInfo;

  console.log(verifyCandidate)

  const boolCandidature = account[0].toUpperCase() === getcandidateInfoAddr.toUpperCase();
  const current = timestamp;
  return (
    <Wrapper>
      {!getcandidateInfoAddr ? <div className="container" style={{ height: '23vh' }}>

        <Ellipsis style={{ width: '600px' }} /></div> : <>
                       
            {getStartTime != 0 && getStartTime <= current && getEndTime > current && stopVoting != true ? <div className="container" style={{ marginBottom: '13.8rem' }}>
              <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily: 'Raleway', textAlign: 'center' }}>Elections have been started, cannot register now
              </div></div>
              : <>
                {getEndTime!=0 && getEndTime <= current || stopVoting == true ? <div className="container" style={{ marginBottom: '13.8rem' }}>
                  <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily: 'Raleway', textAlign: 'center' }}>Elections Completed.
                  </div></div>
                  : <>
                  {!verifyCandidate ? <div className="container" style={{ marginBottom: '13.8rem' }}>
          <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily: 'Raleway', textAlign: 'center' }}>Couldn't find your account
          </div></div>
          : <> 
                    {boolCandidature ?
                      <div className="container grid grid-two-column" style={{ marginBottom: '9rem' }}>
                        <div className="common-heading" style={{ fontSize: '2.5rem' }}>You've Already registered</div>
                        <div><NavLink to='/' ><Button className='btn'>Goback</Button></NavLink></div> </div>
                      :
                      <>
                        <CandidateRegister decision={false} />
                      </>}

                    {boolCandidature ? <></> :
                      <div className="container" style={{ marginTop: '3rem', fontFamily: 'cursive', fontSize: '1.7rem' }}>
                        Not a candidate ,please go <NavLink to='/register'>back</NavLink>
                      </div>}
                  </>}
              </>}
          </>}
      </>}
    </Wrapper>
  );
};

export default RegisterCandidature;