
import HeroSection from "./components/HeroSection";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "./context";
import { Ellipsis } from "react-awesome-spinners";
import DashBoard from "./DashBoard";
import VoterID from "./components/VoterID";
import CandidateID from "./components/CandidateId";
import { ModalProvider } from "styled-react-modal";

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   padding: 3,
// };
const Home = () => {
  const { updateHomePage, contractInfo } = useGlobalContext();

  const { account, getvoterInfo, getowner, getcandidateInfo,getvoterList, getcandidateInfoAddr, getvoterInfoAddr, getcandidateList, getStartTime } = contractInfo;
  // const [openVoterID, setopenVoterID] = React.useState(false);
  // const handleopenVoterID = () => setopenVoterID(true);
  // const handleCloseVoterID = () => setopenVoterID(false);

  // const [openCID, setopenCID] = React.useState(false);
  // const handleopenCID = () => setopenCID(true);
  // const handleCloseCID = () => setopenCID(false);
  // let navigate = useNavigate();

console.log(getvoterList);

  const boolCandidature = account[0].toUpperCase() === getcandidateInfoAddr.toUpperCase();
  const boolVoter = account[0].toUpperCase() === getvoterInfoAddr.toUpperCase();


  useEffect(() => { updateHomePage(false) }, []);


  return (<ModalProvider>
    <div>
      
      <HeroSection />
      <Wrapper className="section">
      {/* <VIDModal/> */}
      

        <h2 className="common-heading">Your Profile</h2>
        {/* <div className="container grid grid-two-column"> */}

        {account == "none" ? <div style={{ display: 'flex', fontFamily: 'Roboto', fontSize: '2rem', justifyContent: 'center' }}> <Ellipsis /></div> :
          <>

            <div className="container grid grid-two-column">
              {boolCandidature && boolVoter ? <><VoterID /><CandidateID /></> :
                <>
                  {/* If registered only as candidate */}
                  {boolCandidature ?
                    <><CandidateID /></> :
                    <>
                      {/* If registered only as voter */}
                      {boolVoter ?
                        <><VoterID /></> :
                        <> <div style={{ display: 'flex', fontFamily: 'Roboto', fontSize: '2rem' }}> You have not registered yet</div></>
                      }
                    </>
                  }
                </>
              }
            </div>


          </>}
       
      </Wrapper>
      <DashBoard />
    </div>
    </ModalProvider>
  )
}

const Wrapper = styled.section`
  padding: 9rem 0 0 0;
  background-color: ${({ theme }) => theme.colors.bg};
  .container {
    max-width: 120rem;
  }

  .card {
    // normal color - remove background color property
    border: 0.1rem solid rgb(170 170 170 / 40%);
    border-radius:1.3rem;
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

export default Home