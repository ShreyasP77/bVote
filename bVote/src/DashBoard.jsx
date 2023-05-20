import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
// import { NavLink } from "react-router-dom";
// import { Button } from "./styles/Button";
// import moment from "moment/moment";
import { Ellipsis } from "react-awesome-spinners";
// import { VscLinkExternal, VscTrash } from "react-icons/vsc";
const DashBoard = () => {

  const { contractInfo } = useGlobalContext();

  // let navigate = useNavigate();
  const { account,
    getcandidateList,
    getvoterList,
    getresult,
    getvoterInfo,
    getvoterInfoAddr,
    getcandidateInfo,
    getowner,
    getStartTime,
    getEndTime, timestamp, stopVoting } = contractInfo;
  const current = timestamp;
  const [candidateDetails, setcandidateDetails] = useState([]);
  const [tieChecker, settieChecker] = useState([]);

  useEffect(() => {

    const candidates_And_Votes = async () => {

      // storing all the candidates except winner(s).
      let candidatesObj = [];
      // storing winner(s) details.
      let candidatesPlace1 = [];

      // get the winning candidate from the smart contract.
      const foundWinner = await getresult;
      let index = 0;
      for (let i = 0; i < getcandidateList.length; i++) {
        let j = i;

        // get all candidates details.
        let candidates = await getcandidateList[i];

        console.log(foundWinner[0].toNumber(),foundWinner[2].toNumber(),foundWinner[1], candidates.candidateId.toNumber(),candidates.votes.toNumber())
        // check for the tie, if the other candidates in the pool has similar number of votes.
        // vote count for each candidate being compared with the winners voteCount.
        if (candidates.votes.toNumber() === foundWinner[2].toNumber()) {
          candidatesPlace1[index] = {
            name: candidates.name,
            votes: candidates.votes.toNumber(),
            party: candidates.party
          };
          index++;
        }
        else {
          candidatesObj[j] = {
            name: candidates.name,
            votes: candidates.votes.toNumber(),
            party: candidates.party
          };
        }

      }

      // removing the null, undefined or empty objects if present any, in the array.
      candidatesObj = candidatesObj.filter(function (el) {
        return el !== null;
      })

      candidatesPlace1 = candidatesPlace1.filter(function (el) {
        return el !== null;
      })

      // storing candidate's details, except for the winner(s).
      setcandidateDetails(candidatesObj);
      // storing winner(s) details.
      settieChecker(candidatesPlace1);

    }

    candidates_And_Votes();

  }, [getresult, getcandidateList])
  console.log(getcandidateList, candidateDetails, tieChecker)
  return (
    <Wrapper className="section">
      { getEndTime!=0 && getEndTime <= current || stopVoting ?
        <>
          <h2 className="common-heading">Results</h2>
          {account == 'none' ?
            <div className="container" style={{ height: '23vh', display: 'flex', justifyContent: 'center' }}>
              <Ellipsis style={{ width: '600px' }} />
            </div>
            : <>
              {getcandidateList.length == 0 ?
                <div className='container' style={{ display: 'flex', fontFamily: 'Roboto', fontSize: '2rem', justifyContent: 'start' }}> None added.</div>
                : <>
                  <div className="container grid grid-three-column">
                    {tieChecker.map((curElem) => {
                      const { name, votes, party } = curElem;

                      return (
                        <div key={name} className="card-winner" style={{position:"sticky",zIndex:-2}}>
                          <div className="card-data" style={{ paddingBottom: '20px' }}>
                            <div style={{ display: 'flex', color: 'white', fontSize: '1.9rem', justifyContent: 'end', paddingTop: '20px' }}>
                            </div>
                            <h3 style={{ margin: 'auto' }}>{name}</h3>

                            <h4 style={{ fontSize: '1.7rem', fontFamily: `'Moon Dance',cursive` }}>{party}</h4>

                            <p>Votes Recieved : <span style={{ width: '30px', backgroundColor: '	#CCCCFF', color: 'red', borderRadius: '10px', boxShadow: ' 0px 0px 15px 1.5px white', padding: '0.3rem 0.6rem' }}> {votes}</span></p>

                          </div>
                        </div>
                      );
                    })}
                    {candidateDetails.map((curElem) => {
                      // dAadharNo,dob,Mobile,Name
                      const { name, votes, party } = curElem;

                      return (
                        <div key={name} className="card" style={{position:"sticky",zIndex:-2}}>
                          <div className="card-data" style={{ paddingBottom: '20px' }}>
                            <div style={{ display: 'flex', color: 'white', fontSize: '1.9rem', justifyContent: 'end', paddingTop: '20px' }}>
                            </div>
                            <h3 style={{ margin: 'auto' }}>{name}</h3>

                            <h4 style={{ fontSize: '1.7rem', fontFamily: `'Moon Dance',cursive` }}>{party}</h4>

                            <p>Votes Recieved : <span style={{ width: '30px', backgroundColor: '	#CCCCFF', color: 'red', borderRadius: '10px', boxShadow: ' 0px 0px 15px 1.5px white', padding: '0.3rem 0.6rem' }}> {votes}</span></p>

                          </div>
                        </div>
                      );
                    })}
                  </div>

                </>}
            </>}
        </> :
        <>
          <h2 className="common-heading">KYC( Know Your Candidates )</h2>
          {account == 'none' ?
            <div className="container" style={{ height: '23vh', display: 'flex', justifyContent: 'center' }}>
              <Ellipsis style={{ width: '600px' }} />
            </div>
            : <>
              {getcandidateList.length == 0 ? <div className='container' style={{ display: 'flex', fontFamily: 'Roboto', fontSize: '2rem', justifyContent: 'start' }}> None added.</div>
                : <>
                  <div className="container grid grid-three-column">
                    {getcandidateList.map((curElem) => {
                      const { name, party, age, address, candidateId, votes, gender } = curElem;

                      return (
                        <div key={name} className="card" style={{position:"sticky",zIndex:-2}}>

                          <div className="card-data" style={{ paddingBottom: '20px' }}>
                            <div style={{ display: 'flex', color: 'white', fontSize: '1.9rem', justifyContent: 'end', paddingTop: '20px' }}>
                            </div>
                            <h3 style={{ margin: 'auto' }}>{name}</h3>
                            <h4 style={{ fontSize: '1.7rem', fontFamily: `'Moon Dance',cursive` }}>{party}</h4>

                            <p>Age : {age.toNumber()}</p>
                            <p>Gender : {gender}</p>

                            {/* <p>Votes Recieved : <span style={{ width: '30px', backgroundColor: '	#CCCCFF', color: 'red', borderRadius: '10px', boxShadow: ' 0px 0px 15px 1.5px white', padding: '0.3rem 0.6rem' }}> {votes.toNumber()}</span></p> */}

                          </div>
                        </div>
                      );
                    })}
                  </div>

                </>}
            </>}
        </>}

    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;
  background-color: ${({ theme }) => theme.colors.bg};
  position:sticky;
  z-index:-2;
  .container {
    max-width: 120rem;
  }

  .card {
    // normal color - remove background color property
    // border: 0.1rem solid rgb(170 170 170 / 40%);
   
    // Silver Color
    background:linear-gradient(145deg,#fff,#525153);
    border: 0.2rem solid #CCCCCC;
    box-shadow:7px 7px 10px 0 rgba(0,0,0,0.4),-7px -7px 10px 0 rgba(255, 255, 255,0.8);
    // box-shadow: 4px 4px 100px 4px white inset;
    .card-data {
      padding: 0 2rem;
      // color:#228B22;
      color:#08113B;
      // color:white;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
    }
   
  }
  .card-winner {
    
    // Golden Color
     background: radial-gradient(ellipse farthest-corner at right bottom, #FEDB37 0%, #FDB931 8%, #9f7928 30%, #8A6E2F 40%, transparent 80%),
                radial-gradient(ellipse farthest-corner at left top, #FFFFFF 0%, #FFFFAC 8%, #D1B464 25%, #5d4a1f 62.5%, #5d4a1f 100%);
    border: 0.2rem solid #FFD700;
box-shadow:7px 7px 10px 0 #9b840086,-7px -7px 10px 0 rgba(255, 255, 255,0.8);
    .card-data {
      padding: 0 2rem;
      // color:#228B22;
      color: #36454F;
      // color:white;
    }

    h3 {
      margin: 2rem 0;
      font-weight: 300;
      font-size: 2.4rem;
    }
   p{
    color:#C0C2C9;
   }
  }



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
      gap:1.8888rem;
    }
    // .grid-two-column{grid-template-columns: 1fr;}
  }
`;

export default DashBoard;