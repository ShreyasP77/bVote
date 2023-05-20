import moment from "moment";
import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";

import { Button } from "../styles/Button";

const SetTimer = () => {
    const Wrapper = styled.section`
    // padding: 12rem 0 7rem 0;
    .container {
      margin-bottom: 6rem;
      text-align: center;
      .contact-form {
        max-width: 50rem;
        margin: auto;
        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          .btn {
            max-width: 12rem;
            
      height:4.76rem;
      font-size:1.6rem;
          }
        }
      }
    }}
  `;



  const { contractInfo } = useGlobalContext();

  let navigate = useNavigate();
  const { contract, account, getowner, stopVoting, getStartTime, getEndTime, getcandidateList, getvoterList, timestamp, balance, votingStatus } = contractInfo;
  const boolowner = account[0].toUpperCase() === getowner.toUpperCase();
//   console.log(getcandidateList, getvoterList, getStartTime, getEndTime, stopVoting)
  const setTime = async (event) => {

    try {
      event.preventDefault();

      const start = document.querySelector("#start").value;
      const sTime = start + "00";
      const momentStart = moment(sTime, 'YYYY-MM-DDTHH:mm');
      const convertStart = Math.floor(momentStart.valueOf() / 1000);
      const startTime = Math.abs(convertStart - timestamp);

      const end = document.querySelector("#end").value;
      const eTime = end + "00";
      const momentEnd = moment(eTime, 'YYYY-MM-DDTHH:mm');
      const convertEnd = Math.floor(momentEnd.valueOf() / 1000);
      const endTime = Math.abs(convertEnd - timestamp);

      console.log(convertStart)
      console.log(timestamp)
      console.log(startTime, endTime);

      const tx = await contract.voteTime(startTime, endTime);
      await tx.wait();

      navigate('/', { replace: true })
      console.log("Transaction succeded");
      window.location.reload();

    } catch (error) {
      if (error.message.includes('revert')) {
        // Extract the revert message from the error message
        const str = error.message.indexOf('revert') + 9;
        const revertMessage = error.message.substr(str);
        const errorString = revertMessage.substring(1, 35);
        alert(errorString);
        navigate('/', { replace: true })
      }
    }
  }
  return (
    <Wrapper>

<div className="container" >
                    <div className="common-heading" style={{ fontWeight: '200' }}>Start Voting</div>
                    <div className="contact-form">

                      <form className="container contact-inputs" onSubmit={setTime}>
                        <label style={{ fontSize: '1.5rem', marginBottom: '-20px', fontFamily: 'Raleway', fontWeight: '600' }}>Start Time</label>
                        <input type="datetime-local" id="start" name="start" placeholder="Start Time"></input>
                        <label style={{ fontSize: '1.5rem', marginBottom: '-20px', fontFamily: 'Raleway', fontWeight: '600' }}>End Time</label>
                        <input type="datetime-local" id="end" name="end" placeholder="End Time"></input>
                        <div><Button type='submit' className='btn'>Set</Button></div>

                      </form>
                    </div>

                  </div>
    </Wrapper>
  )
}

export default SetTimer