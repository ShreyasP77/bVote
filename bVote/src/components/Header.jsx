import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'
import Marquee from "react-fast-marquee";
import { useGlobalContext } from '../context';
import Countdown from 'react-countdown';


const Header = () => {


  const { contractInfo } = useGlobalContext();

  // let navigate = useNavigate();
  const { 
   account,
    getStartTime,timestamp,
    getEndTime,stopVoting } = contractInfo;



const current = timestamp;
let diffEnd  =( getEndTime-current) *1000;
let diffStart = ( getStartTime-current) *1000;
console.log(getStartTime,getEndTime,current,diffStart)
  return (<>
    <MainHeader>
      <NavLink to="/">
        <img src='./images/bVoteLogo.png' alt='bVote: A Blockchain based Voting System' className='logo'/>
        
      </NavLink>
      <Navbar/>
    </MainHeader>
    
    <div style={{position:'relative',top:'7rem',backgroundColor:'#d8dbf9',zIndex:-1,width:'100%',fontSize:'1.47rem'}}>
      <Marquee speed="20" gradientColor={[198, 184, 243]} style={{height:'1.7rem',zIndex:0}}>
        { account === 'none' ? "Updating election status . . . please wait..":
        getStartTime>current ?<>Election starts in,  <Countdown date={Date.now() + diffStart} />  </>:
        
        getEndTime!== 0 && getEndTime <= current || stopVoting ? <>Elections ended  </> :
        getEndTime > current ? <>Election ends in,  <Countdown date={Date.now() + diffEnd}  />  </>:<>Elections not started</> 
       
        
        }

      </Marquee>
      
      </div>
    </>
  )
}

const MainHeader = styled.header`
padding: 0 0.8rem;
height:7rem;
// -------
position: fixed; /* Set the navbar to fixed position */
width:100%;
top:0;
//-------
background-color: ${({theme})=>theme.colors.bg};
display:flex;
justify-content:space-between;
align-items:center;
// top: 0; 

  .logo{
    height:auto;
    max-width:38%;
  }
`;
export default Header