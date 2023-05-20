import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../styles/Button';
import { useGlobalContext } from "../context";

const HeroSection = () => {

    const Wrapper = styled.section`
    
    // padding: 2rem 0;
    padding: 11rem 0 5rem 0;
    .section-hero-data {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .btn {
      max-width: 18rem;
      position:sticky;
      
     z-index:-2;
      height:5rem;
      font-size:1.6rem;
    }
    .hero-info {
      text-transform: uppercase;
      font-weight: 500;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.colors.helper};
      z-index:-2;
    }
    .hero-heading {
      z-index:-2;
      font-size: 4rem;
    }
    .hero-para {
      margin-top: 1.5rem;
      margin-bottom: 3.4rem;
      max-width: 60rem;
      z-index:-2;
    }
    .section-hero-image {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index:-2;
    }
    picture {
      text-align: center;
    }
    .hero-img {
      max-width: 100%;
    }
    @media (max-width: ${({ theme }) => theme.media.mobile}) {
      .grid {
        gap: 7.2rem;
      }
     
    }
    `;

    const { name, image, content, btnLink, btnContent,contractInfo } = useGlobalContext();
    const {  account,getvoterInfo,getcandidateInfo,getvoterInfoAddr,getStartTime,getEndTime,stopVoting,timestamp } = contractInfo;
   const current = timestamp
     const bool = account[0].toUpperCase() === getvoterInfoAddr.toUpperCase();
     console.log(bool,account[0])
   
  //   console.log(btnContent)
    return (
        <Wrapper>
            <div className="container grid grid-two-column">
                <div className="section-hero-data">
                    <h1 className='hero-heading'>{name}</h1>
                    <h4 className='hero-info'>A blockChain based Voting System</h4>
                    <p className='hero-para'>{content}</p>
                    {btnContent=='Read More'?<NavLink to="https://drive.google.com/file/d/1UmzMXUsBH8FlXcks2_aLiklGn_stGRpT/view?usp=share_link" target='_blank' ><Button className='btn'>{btnContent}</Button></NavLink>:<>
                  {!getvoterInfoAddr ? 
                  <><NavLink to='/' ><Button className='btn'>loading ...</Button></NavLink></>
                  :// will require to make this button disabled if voting has ended 
                  <>{bool && btnContent=='Register'?
                  
                <NavLink to='/votenow'><Button className='btn' disabled = {getStartTime == 0 || getStartTime > current || getEndTime < current || stopVoting == true}>VoteNow</Button></NavLink>:
                <NavLink to={`/${btnLink}`} ><Button className='btn' disabled = {getStartTime != 0 && getStartTime <= current && getEndTime != 0}>{btnContent}</Button></NavLink>
                  }</>}
                  </>}
               
                </div>
               
                <div className="section-hero-image">
                <picture>
                    <img src={image} alt="" width={500} height={300} className='hero-img' />
                </picture>
                </div>
            </div>
        </Wrapper>
    )
}

export default HeroSection