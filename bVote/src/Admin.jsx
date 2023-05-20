// import React from 'react'
import moment from "moment";
import React from "react";
import { Ellipsis } from "react-awesome-spinners";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGlobalContext } from "./context";

import { Button } from "./styles/Button";
import Chart from "react-apexcharts";
import { FcBusinessman } from 'react-icons/fc'
import { FcBusinesswoman } from 'react-icons/fc'

import { SetTimeModal } from "./components/ModalDialog";
import { ModalProvider } from "styled-react-modal";



const Admin = () => {
  const Wrapper = styled.section`
  padding: 6.8rem 0 7rem 0;
  // position:sticky;
  // z-index:-2;
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
          position:sticky;
      
          z-index:2;    
    height:4.76rem;
    font-size:1.5rem;
        }
      }
    }
  }

  
  .card {
    // normal color - remove background color property
    // border: 0.1rem solid rgb(170 170 170 / 40%);
    border-radius:0.5rem;
    // z-index:-2;
    .card-data {
      padding: 0 2rem;
      // color:#228B22;
      color:#08113B;
      // color:white;
    }
    p{
      margin-top:0;
      margin-bottom:1rem;
    }
    h3 {
      margin: 0.2rem 0;
      font-weight: 600;
      font-size: 2.7rem;
    }
   
  }

  .grid-two-columnS{
    grid-template-columns: 1fr 1fr;
  }
  .grid-three-columnS{
    grid-template-columns: 1fr 1fr 1fr;
  }
  
 
  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-two-columnS,.grid-three-column {
      grid-template-columns: 1fr;
    }
    .grid{
      gap:1.2888rem;
    }
    .grid-three-columnS {
      grid-template-columns:1fr 1fr;
    }
    .grid-two-column{grid-template-columns:1fr 1fr;}
  }
`;


  const Table = styled.table`
  height: 10px;
  overflow-y: scroll;
  border-collapse: collapse;
  width: 100%;
`;

  const TH = styled.th`
  // border: 1px solid #ddd;
  background-color:#fff4f5;
  padding: 8px;
  text-align: left;
  font-size:1.6rem;
  font-family:'Genos',sans-serif;
`;

  const TD = styled.td`
  // border: 1px solid #ddd;
  padding: 8px;
  font-family:'Genos',sans-serif;
  font-size:1.5rem;
  text-align:left;
`;

  const TableRow = styled.tr`
  // border: 1px solid #ddd;
// height:5vw;
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

  const { contractInfo } = useGlobalContext();

  let navigate = useNavigate();
  const { contract, account, getowner, stopVoting, getStartTime, getEndTime, getcandidateList, getvoterList, timestamp, balance, votingStatus } = contractInfo;
  const boolowner = account[0].toUpperCase() === getowner.toUpperCase();
  console.log(getcandidateList, getvoterList, getStartTime, getEndTime, stopVoting)
  let names = [];
  let votes = [];
  let startTime = new Date(getStartTime * 1000);
  let endTime = new Date(getEndTime * 1000);
  if (getcandidateList.length != 0) {
    for (let index = 0; index < getcandidateList.length; index++) {
      const element = getcandidateList[index];
      votes.push(element.votes.toNumber() + 1);
      names.push(element.party);
    }
  } else {
    names.push("");
    votes.push(1)
  }
  console.log(names, votes)
  const state = {

    series: votes,
    options: {
      chart: {
        width: '60px',
        type: 'pie',
        zIndex: -10,
      },
      labels: names,
      theme: {
        monochrome: {
          enabled: true
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      title: {
        text: ""
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: function (value) {
            return value - 1
          }
        }
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: undefined,
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex]
          return [name, val.toFixed(0) + '%']
        }
      },
      legend: {
        show: false
      }
    },


  };


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
  const stopThatNow = async () => {

    try {
      const tx = await contract.emergency();
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
        alert(errorString);
        navigate('/', { replace: true })

      }
    }
  }



  const reset = async () => {

    try {
      const tx = await contract.reset();
      await tx.wait();

      navigate('/', { replace: true })

      window.location.reload();
      console.log("Transaction succeded");

    } catch (error) {
      if (error.message.includes('revert')) {
        // Extract the revert message from the error message
        const str = error.message.indexOf('revert') + 9;
        const revertMessage = error.message.substr(str);
        const errorString = revertMessage.substring(1, 18);
        alert(errorString);

      }
    }
  }

  return (<ModalProvider>
    <div>
      <Wrapper>
    
        <div>
          {getowner == '' ?
            <div className="container" style={{ height: '28vh' }}><Ellipsis style={{ width: '600px' }} /></div> : <>

              {!boolowner ?
                <div className="container" style={{ padding: '7rem 0'}}><h3 className="common-heading">You are not an Admin User</h3></div> : 
                <div style={{ }}>
                  <div className="container grid grid-two-columnS" style={{ gap: '1rem' }}>
                    <div className="grid grid-three-columnS" style={{ gap: '1rem' }}>
                      <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',position:'sticky',zIndex:-2  }}>
                        <div className="card-data" style={{ paddingBottom: '0px' }}>

                          <h3 style={{ fontFamily: `'Genos',sans-serif`, fontSize: '2.4rem' }}>{getcandidateList.length}</h3>
                          <p style={{ fontFamily: `'Genos',sans-serif `, }}>{getcandidateList.length === 1 ? "Candidate" : "Candidates"} enrolled</p>
                        </div>
                      </div>



                      <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',position:'sticky',zIndex:-2  }}>
                        <div className="card-data" style={{ paddingBottom: '0px' }}>

                          <h3 style={{ fontFamily: `'Genos',sans-serif`, fontSize: '2.4rem' }}>{getvoterList.length}</h3>
                          <p style={{ fontFamily: `'Genos',sans-serif `, }}>{getvoterList.length === 1 ? "Voter" : "Voters"} enrolled</p>

                        </div>
                      </div>

                      <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',position:'sticky',zIndex:-2  }}>
                        <div className="card-data" style={{ paddingBottom: '0px' }}>
                          <h3 style={{ fontFamily: `'Genos',sans-serif`, fontSize: '2.4rem' }}>{balance} ETH</h3>
                          <p style={{ fontFamily: `'Genos',sans-serif `, }}>Account balance</p>
                        </div>
                      </div>
                      <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',position:'sticky',zIndex:-2  }}>
                        <div className="card-data" style={{ paddingBottom: '0px' }}>
                          <h3 style={{ fontFamily: `'Genos',sans-serif`, fontSize: '2.4rem' }}>Poll Status</h3>
                          <p style={{ fontFamily: `'Genos',sans-serif `, fontSize: '1.7rem' }}>{votingStatus}</p>
                        </div>
                      </div>

                      <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',position:'sticky',zIndex:-2  }}>
                        <div className="card-data" style={{ paddingBottom: '0px' }}>

                          <h3 style={{ fontFamily: `'Genos',sans-serif`, fontSize: '2.4rem' }}>{startTime.toLocaleString()}</h3>
                          <p style={{ fontFamily: `'Genos',sans-serif `, }}>Election starts at</p>
                        </div>
                      </div>

                      <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',position:'sticky',zIndex:-2  }}>
                        <div className="card-data" style={{ paddingBottom: '0px' }}>

                          <h3 style={{ fontFamily: `'Genos',sans-serif`, fontSize: '2.4rem' }}>{endTime.toLocaleString()}</h3>
                          <p style={{ fontFamily: `'Genos',sans-serif `, }}>Election ends at</p>
                        </div>
                      </div>
                    </div>

                    <div className=" card" style={{ backgroundColor: 'rgb(249 245 255)', height: '18rem',position:'sticky',zIndex:-2 , overflowY: 'scroll', paddingBottom: '5px' }}>
                      <div className="card-data" style={{ paddingBottom: '0px' }}>
                        <h3 style={{ fontFamily: `'Genos',sans-serif`, fontSize: '2.4rem' }}>Voters Enrolled</h3>
                        <div className="grid grid-two-column" style={{ gap: '1rem' }}>
                          {getvoterList.map((curElem) => {

                            const { name, voterId, age, gender, voteCandidateId } = curElem;
                            return (<>

                              <div key={voterId.toNumber()} style={{ textAlign: 'left' }}>

                                <div style={{ fontFamily: `'Genos',sans-serif`, fontSize: '1.8rem' }}><span>{gender === 'Male' ? <FcBusinessman /> : <FcBusinesswoman />} </span> {name}</div>
                                <div style={{ textIndent: '2.4rem' }}><span style={{ fontFamily: `'Genos',sans-serif`, fontSize: '1.3rem' }}>
                                  {age.toNumber()}</span> | <span style={{ fontFamily: `'Genos',sans-serif`, fontSize: '1.3rem' }}>{gender}</span></div>

                              </div>
                              <div key={voterId.toNumber().toString() + "of" + voterId.toNumber().toString()} style={{ textAlign: 'right', fontFamily: `'Genos',sans-serif`, fontSize: '1.8rem' }}>{voteCandidateId > 0 ? "Voted" : "Pending"}</div>

                            </>
                            );

                          })}</div>

                      </div>
                    </div>


                  </div>
                  {/* <div className="common-heading container">Candidate Information</div> */}
                  <div className="container grid grid-three-column" style={{ gap: '1rem', marginTop: '2rem'}}>

                    <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',position:'sticky',zIndex:-2 }}>
                      <div className="card-data" style={{ paddingBottom: '0px' }}>
                        <div id="chart" style={{ width: '30rem', margin: 'auto' }}>
                          <Chart options={state.options} series={state.series} style={{ position:'sticky',   zIndex: -1}} type="pie" />
                        </div>
                      </div>
                    </div>


                    <div className="card" style={{ backgroundColor: 'rgb(249 245 255)',height:'23.37rem',overflowY:'scroll',paddingLeft:'0.8rem',position:'sticky',zIndex:-2  }}>
                      <div className="card-data" style={{ padding: '0 0' }}>
                        {getcandidateList.length <= 0 ?
                          <div style={{ marginTop: '2rem' }}> No candidates enrolled</div> :

                          <Table className="" style={{ margin: 'auto', borderCollapse: 'collapse' }}>

                            <thead>
                              <TableRow>
                                <TH>Name</TH>
                                <TH>Party</TH>
                                <TH>Age</TH>
                                <TH>Gender</TH>
                                <TH>Votes</TH>
                              </TableRow>
                            </thead>
                            <tbody>
                              {getcandidateList.map((curElem) => {

                                const { name, party, age, address, candidateId, votes, gender } = curElem;
                                return (

                                  <TableRow>
                                    <TD>{name}</TD>
                                    <TD>{party}</TD>
                                    <TD>{age.toNumber()}</TD>
                                    <TD>{gender}</TD>
                                    <TD>{votes.toNumber()}</TD>
                                  </TableRow>




                                );
                              })}
                            </tbody>


                          </Table>
                        }
                      </div>
                    </div>

                    <div className="card" style={{ backgroundColor: 'rgb(249 245 255)'}}>
                      <div className="card-data" style={{ padding: '0 0' }}>
                        <div style={{ marginTop: '4rem' }}>  <img src='./images/adminNew.svg' alt="" width={50} height={50} /></div>
                        <div style={{ fontFamily: `'Genos',sans-serif`, fontSize: '1.8rem' }}> Admin Controls </div>
                        <div className="container grid grid-three-column" style={{ gap: '1rem', marginTop: '0rem', padding: '2rem 2rem'}}>
                          {/* <div> */}

                          
                          <Button type='submit' style={{ fontSize: '1.5rem'}} className='btn' onClick={stopThatNow} disabled={getStartTime>=timestamp || getEndTime<=timestamp}>Stop Voting</Button>
                          {/* </div>
                    <div> */}
                          {/* <Button type='submit' style={{ fontSize: '1.5rem' }} className='btn' onClick={reset}>set Time</Button> */}
                          <SetTimeModal />
                          {/* </div>
                      <div> */}
                          <Button type='submit' style={{ fontSize: '1.5rem' }} className='btn' onClick={reset}>Reset</Button>
                          {/* </div> */}
                        </div>
                      </div>
                    </div>

                  </div>




                </div>}
            </>}
        </div>


      </Wrapper>
      {/* <DashBoard/> */}
    </div>
  </ModalProvider>);
}

export default Admin