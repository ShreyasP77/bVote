import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "./styles/Button";

import { Ellipsis } from "react-awesome-spinners";
const VoteNow = () => {
    // const { getResults } = useGlobalContext();
  // const API = "https://script.google.com/macros/s/AKfycbzfJyn86gSFkPVKjpnHRlsPL4Aa5IUdATnTyVHSwx4Kkgigu6piVHTMidu4zXUmZL4hww/exec?action=getUsers"
  // useEffect(() => {
  //  getResults(API);
  // }, [])
  
  // const { results } = useGlobalContext();
  // console.log(results)
  // console.log(DashBoards);

  const { contractInfo } = useGlobalContext();

  // let navigate = useNavigate();
  const {  account,
  getcandidateList,stopVoting,
  getvoterList,
  getresult,
  getvoterInfo,
  getvoterInfoAddr,
  getcandidateInfo,
  getowner,
  getStartTime,
  getEndTime,
getvoterInfoId,contract,timestamp } = contractInfo;

  console.log(typeof(stopVoting),getStartTime,getEndTime)
  // console.log(getvoterInfo[1].toNumber());  
  const boolVoter = account[0].toUpperCase() === getvoterInfoAddr.toUpperCase();
 

  const current = timestamp
  // getEligibility("1065-70655-6601");
let navigate = useNavigate()
  const vote = async(val1, val2) => {

    
    try {
      console.log(val1, val2);
      const tx = await contract.vote(val1,val2);
      await tx.wait();
      navigate('/', { replace: true })
      window.location.reload()
      console.log("Transaction succeded");
    } catch (error) {
      if (error.message.includes('revert')) {
        // Extract the revert message from the error message
        const str = error.message.indexOf('revert') + 9;
        const revertMessage = error.message.substr(str);
        const errorString = revertMessage.substring(1, 20);
        // const subString = ["already registered","not eligible"];
        // for (let index = 0; index < subString.length; index++) {
        //   const element = subString[index];
        //   if(errorString.indexOf(element) !== -1){
        alert(errorString);

        navigate('/', { replace: true })
        window.location.reload();

        //   }

        // }

      }
    }
  };
  return (
    <Wrapper className="section">
     {account == 'none' ?<div className="container" style={{height:'23vh',display: 'flex', justifyContent: 'center'}}>

<Ellipsis style={{width:'600px'}} /></div>
:<>
  {getStartTime == 0  || getStartTime > current ?  <div className="container" style={{ marginBottom: '13.8rem'}}>
    <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily:'Raleway', textAlign:'center' }}>Elections not started,<NavLink to = '/'> Come back later.</NavLink>
   </div></div>
  : <>
    {getEndTime < current || stopVoting == true ? <div className="container" style={{ marginBottom: '13.8rem' }}>
    <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily:'Raleway', textAlign:'center'  }}>Elections Completed.
   </div></div> 
   : <> 
{!boolVoter ?
  <div className="container" style={{  marginBottom: '13.8rem' }}>
    <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily:'Raleway', textAlign:'center'  }}>You've Not registered
    <NavLink to='/' > Goback.</NavLink></div></div>
  : <>

  {getvoterInfo[1].toNumber() != 0 ?   <div className="container" style={{ marginBottom: '13.8rem' }}>
    <div className="common-heading" style={{ fontSize: '2.5rem', fontFamily:'Raleway', textAlign:'center'  }}>You've Already Voted,<NavLink to = '/'> Go back.</NavLink>
   </div></div>
   :<>
 
   
      <h2 className="common-heading">DashBoard</h2>
        <div className="container grid grid-two-column">
          {getcandidateList.map((curElem) => {
            // dAadharNo,dob,Mobile,Name
            const { name,party,age,address,candidateId } = curElem;
            return (
              <div
                key={name}
                className="card">
               
                <div className="card-data">
                  <h3 style={{textTransform:'capitalize', fontFamily:`'Raleway'`}}>{name}</h3>
                  <hr />
                  <h3 style={{fontSize:'2rem',fontWeight:'600',fontFamily:`'Moon dance','cursive'`}}>{party}</h3>
                
                    <Button className="btn" onClick={() => vote(getvoterInfoId.toNumber(),candidateId.toNumber())}>Vote</Button>
                  {/* </NavLink> */}
                </div>
              </div>
              
            );
          })}
         
        </div>

        </>}
        </>}
        </>}
        </>}
        </>}
      {/* </div> */}
    </Wrapper>
  );
}


const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};
  // position:sticky;
  //   z-index:-2;
  .container {
    margin-top: 6rem;
   max-width: 70rem;
  }

  .card {
    // normal color - remove background color property
    border: 0.1rem solid rgb(170 170 170 / 40%);
    border-radius:6px;
    // Golden Color
    // background-color: #D4AF37;
    // border: 0.2rem solid #FFD700;
    // box-shadow: 10px 10px 60px 10px yellow inset;

    // Silver Color
    // background:linear-gradient(145deg,#fff,#525153);
    // border: 0.2rem solid #CCCCCC;
    // box-shadow:7px 7px 20px 0 rgba(0,0,0,0.4),-7px -7px 20px 0 rgba(255, 255, 255,0.8);
    // box-shadow: 4px 4px 100px 4px white inset;
    .card-data {
      padding: 0 2rem;
      // color: #EAEEF1;

      // color:white;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
    }
    .btn {
      margin: 2rem auto;
      background-color: rgb(0 0 0 / 0%);
      border: 0.1rem solid rgb(98 84 243);
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(98 84 243);
      font-size: 1.4rem;

      &:hover {
        background-color: rgb(98 84 243);
        color: #fff;
      }
    }
  }

  // figure {
  //   width: auto;
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   position: relative;
  //   overflow: hidden;
  //   transition: all 0.5s linear;
  //   &::after {
  //     content: "";
  //     position: absolute;
  //     top: 0;
  //     left: 0;
  //     width: 0%;
  //     height: 100%;
  //     background-color: rgba(0, 0, 0, 0.5);
  //     transition: all 0.2s linear;
  //     cursor: pointer;
  //   }
  //   &:hover::after {
  //     width: 100%;
  //   }
  //   &:hover img {
  //     transform: scale(1.2);
  //   }
  //   img {
  //     max-width: 90%;
  //     margin-top: 1.5rem;
  //     height: 20rem;
  //     transition: all 0.2s linear;
  //   }
  // }

  @media (max-width: ${({ theme }) => theme.media.tab}) {
    .grid-three-column {
      grid-template-columns: 1fr 1fr;
    }
  }
 
 
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-two-column,
    .grid-three-column {
      grid-template-columns: 1fr;
    }
    .grid{
      gap:0.18888rem;
    }
    // .grid-two-column{grid-template-columns: 1fr;}
  }
`;


export default VoteNow