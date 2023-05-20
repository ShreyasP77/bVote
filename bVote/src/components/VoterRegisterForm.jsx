import React from "react";

import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "../context";
import { Button } from "../styles/Button";
const VoterRegister = ({ decision }) => {
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

    const { contractInfo } = useGlobalContext();

    // let navigate = useNavigate();
    const { contract, account, getcandidateList, getvoterList, getresult, getvoterInfo,
        getvoterInfoAddr, getcandidateInfo, getcandidateInfoAddr, getowner, getStartTime, getEndTime, getvoterInfoId } = contractInfo;

    // console.log(account[0] == getcandidateInfo);

    const boolCandidature = account[0].toUpperCase() === getcandidateInfoAddr.toUpperCase();
    const boolVoter = account[0].toUpperCase() === getvoterInfoAddr.toUpperCase();
    //   console.log(boolVoter)
    let navigate = useNavigate();
    const voterRegister = async (event) => {

        try {
            // const { contract } = state;
            event.preventDefault();
            console.log("This is Register func")
            const name = document.querySelector("#votername").value;
            const age = document.querySelector("#age").value;
            const gender = document.querySelector("#gender").value;
            console.log(name, age, gender);
            const tx = await contract.voterRegister(name, age, gender);
            await tx.wait();
            navigate('/', { replace: true })
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

    const updateVoter = async (event) => {

        try {
            // const { contract } = state;
            event.preventDefault();
            console.log("This is UpdateVoter Func")
            const name = document.querySelector("#votername").value;
            const age = document.querySelector("#age").value;
            const gender = document.querySelector("#gender").value;
            const _id = await getvoterInfoId.toNumber();
            console.log(_id, name, age, gender);

            const tx = await contract.updateVoter(_id, name, age, gender);
            await tx.wait();
            // navigate('/', { replace: true })
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
                // navigate('/', { replace: true })
                //   }

                // }

            }
        }
    }

    const onSubmitFunction = decision ? updateVoter : voterRegister;

    return (
        <Wrapper>

            <h2 className="common-heading">
                Voter {decision ? "Update" : "Register"}
            </h2>

            <div className="container">

                <div className="contact-form">

                    <form className="contact-inputs" onSubmit={onSubmitFunction} >
                        <input type="text" name="votername" id="votername" placeholder="username" defaultValue={getvoterInfo[0]} autoComplete="off" required />
                        <input type="number" name="age" id="age" placeholder="Age" defaultValue={getvoterInfo[5]} autoComplete="off" required />
                        <input type="text" name="gender" id="gender" placeholder="Gender" defaultValue={getvoterInfo[4]} autoComplete="off" required />
                        <Button type='submit' className='btn'>
                            {decision ? "Update" : "Register"}
                        </Button>
                    </form>

                </div>

            </div>

        </Wrapper>
    );
};

export default VoterRegister;