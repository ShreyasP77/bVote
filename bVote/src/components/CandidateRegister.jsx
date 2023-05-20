
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";

import { Button } from "../styles/Button";
const CandidateRegister = ({decision}) => {
  const Wrapper = styled.section`
    // padding: 12rem 0 7rem 0;
    .container {
      margin-top: 6rem;
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
    }
  `;


  let navigate = useNavigate();

  const { contractInfo } = useGlobalContext();
  const { contract, account, getcandidateList, getvoterList, getresult, getvoterInfo,
    getvoterInfoAddr, getcandidateInfo, getcandidateInfoAddr, getcandidateInfoId, getowner, getStartTime, getEndTime, getvoterInfoId } = contractInfo;

  const boolCandidature = account[0].toUpperCase() === getcandidateInfoAddr.toUpperCase();



  const candidateRegister = async (event) => {

    try {
      // const { contract } = state;
      event.preventDefault();
      const name = document.querySelector("#candidatename").value;
      const age = document.querySelector("#age").value;
      const gender = document.querySelector("#gender").value;
      const party = document.querySelector("#party").value;
      console.log(name, age, gender, party);
      const tx = await contract.candidateRegister(name, party, age, gender);
      await tx.wait();
      navigate('/', { replace: true })
      window.location.reload();
      console.log("Transaction succeded");
    } catch (error) {
      if (error.message.includes('revert')) {
        // Extract the revert message from the error message
        const str = error.message.indexOf('revert') + 9;
        const revertMessage = error.message.substr(str);
        const errorString = revertMessage.substring(1, 39);
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

  const updateCandidate = async (event) => {

    try {
      // const { contract } = state;
      event.preventDefault();
      const name = document.querySelector("#candidatename").value;
      const age = document.querySelector("#age").value;
      const gender = document.querySelector("#gender").value;
      const party = document.querySelector("#party").value;
      const _id = await getcandidateInfoId.toNumber();
      console.log(_id, name, age, gender, party);
      const tx = await contract.updateCandidate(_id, name, party, age, gender);
      await tx.wait();
      // navigate('/', { replace: true })
      window.location.reload();
      console.log("Transaction succeded");
    } catch (error) {
      if (error.message.includes('revert')) {
        // Extract the revert message from the error message
        const str = error.message.indexOf('revert') + 9;
        const revertMessage = error.message.substr(str);
        const errorString = revertMessage.substring(1, 39);
        // const subString = ["already registered","not eligible"];
        // for (let index = 0; index < subString.length; index++) {
        //   const element = subString[index];
        //   if(errorString.indexOf(element) !== -1){
        alert(errorString);
        // navigate('/', { replace: true })
        //   }

        // }

      }
    }
  }

  const onSubmitFunction = decision ? updateCandidate : candidateRegister;


  return (
    <Wrapper>

      <h2 className="common-heading">candidate {decision ? "Update" : "Register"}</h2>

      <div className="container">

        <div className="contact-form">

          <form className="contact-inputs" onSubmit={onSubmitFunction} >
            <input type="text" name="candidatename" id="candidatename" placeholder="username" defaultValue={getcandidateInfo[0]} autoComplete="off" required />
            <input type="text" name="gender" id="gender" placeholder="gender" autoComplete="off" defaultValue={getcandidateInfo[3]} required />
            <input type="number" name="age" id="age" placeholder="Age" autoComplete="off" defaultValue={getcandidateInfo[2]} required />
            <input type="text" name="party" id="party" placeholder="Party" autoComplete="off" defaultValue={getcandidateInfo[1]} required />
            <Button type='submit' className='btn'>
              {decision ? "Update" : "Register"}
            </Button>
          </form>
        
        </div>
      
      </div>

    </Wrapper>
  );
};

export default CandidateRegister;