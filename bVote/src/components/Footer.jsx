import React from "react";
import styled from "styled-components";
import { Button } from "../styles/Button";
import { NavLink } from "react-router-dom";


const Footer = () => {
  return (
    <Wrapper>
      <section className="contact-short">
        <div className="grid grid-two-column">
          <div>
            <h3>Our Work</h3>
            <h3>Check it here &#x1f449;</h3>
          </div>

          <div className="contact-short-btn">
            <NavLink to="https://drive.google.com/file/d/19YftBAjxXdz6jAMQvJJSlMEq364rdZl1/view?usp=sharing">
              <Button>Project Work</Button>
            </NavLink>
          </div>
        </div>
      </section>

      {/* footer section  */}

      <footer>
        <div className="container grid grid-three-column">
          {/* <div className="footer-about">
            <h3>Research papers</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
          </div> */}

          {/* 2nd column */}
          <div className="footer-subscribe">
            <h3>Reference Links</h3>
            <div className="footer-reference--links">
            <div> <a
                  href="https://ieeexplore.ieee.org/document/8029379"
                  target="_blank">
                 Overview of Blockchain Technology
                </a> </div>
                <div>
                <a
                  href=" https://www.ijser.org/researchpaper/A-SURVEY-PAPER-ON-BLOCKCHAIN-TECHNOLOGY-AND-ITS-REAL-TIME-APPLICATIONS.pdf"
                  target="_blank">
                 Blockchain Technology and it's Applications
                </a>  </div>
            
                <div> <a
                  href=" https://www.researchgate.net/publication/351723225_Blockchain_Based_E-Voting_System"
                  target="_blank">
                 Blockchain Based E-Voting System
                </a>  </div>

                <div> <a
                  href=" https://skemman.is/bitstream/1946/31161/1/Research-Paper-BBEVS.pdf"
                  target="_blank">
                 Research Paper on Blockchain Based Voting System
                </a>  </div>
                </div>
          </div>

          {/* 3rs column  */}
          <div className="footer-social">
            <h3>Important Docs</h3>
            <div className="footer-social--icons">
              <div>
              <a
                  href="https://hardhat.org/docs"
                  target="_blank">
                  <img src="../images/hardhat.png"  width={20} height={20} alt="error" />
                </a>              </div>
              <div>
              <a
                  href="https://docs.ethers.org/v5/"
                  target="_blank">
                  <img src="../images/ethersJS.png" width={20} height={20} alt="error" />
                </a>              </div>
              <div>
                <a
                  href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                  target="_blank">
                  <img src="../images/metamask.png"  width={20} height={20} alt="error" />
                </a>
              </div>
              <div>
                <a
                  href="https://docs.soliditylang.org/en/v0.8.17/"
                  target="_blank">
                  <img src="../images/solidity.png"  width={20} height={20} alt="error" />
                </a>
              </div>
              <div>
                <a
                  href="https://reactjs.org/tutorial/tutorial.html"
                  target="_blank">
                  <img src="../images/reactJS.png" width={20} height={20} alt="error" />
                </a>
              </div>
            </div>
          </div>

          {/* 4th column  */}
          <div className="footer-contact">
            <h3>Other Links </h3>
            <div className="footer-reference--links">
            <div> <a
                  href="https://ieeexplore.ieee.org/document/8918887"
                  target="_blank">
               Decentralised Applications Using Ethereum Blockchain
                </a> </div>
                <div>
                <a
                  href=" https://www.irjet.net/archives/V6/i6/IRJET-V6I6119.pdf"
                  target="_blank">
                Literature survey - Online Voting: Voting System Using Blockchain 
                </a>  </div>
            
               
                </div>
          </div>
        </div>

        
      </footer>
    </Wrapper>
  );
};

const Wrapper = styled.section`

  .contact-short {
    max-width: 60vw;
    margin: auto;
    position:sticky;
    padding: 2rem 10rem;
    background-color: ${({ theme }) => theme.colors.bg};
    border-radius: 1rem;
    box-shadow: ${({ theme }) => theme.colors.shadowSupport};
    transform: translateY(50%);
    z-index:-2;
    .contact-short-btn {
      justify-self: end;
      align-self: center;
    }
  
  }

  footer {
    padding: 8rem 0 6rem 0;
    position:absolute;
    width:100%;
    z-index:-3;
    background-color: ${({ theme }) => theme.colors.footer_bg};
    // height:
    h3 {
      color: ${({ theme }) => theme.colors.hr};
      margin-bottom: 1rem;
      text-align:center;
    }
    p {
      color: ${({ theme }) => theme.colors.white};
      text-align:center;
    }
    .footer-social--icons {
      display: flex;
      justify-content:center;
      align-items:center;
      gap: 2rem;
      
      div {
        padding: 1rem;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.colors.white};
        background-color:white;
       
      }
    }
    .footer-reference--links{
      text-align:center;
      
      div {
       a{  color:${({theme})=> theme.colors.white};
       opacity:.7;
       margin:1rem 0;
       line-height:1.5;
       font-size:1.45rem;
       font-weight:400;

      }
       margin:1rem 0;
      }
    }

  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    
    .contact-short {
      max-width: 95vw;
      padding: 2rem 3rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .contact-short-btn {
        text-align: center;
        justify-self: flex-start;
      }
    }
.container{
  padding-top:3rem;
}
    footer .footer-bottom--section {
      padding-top: 3.2rem;
    }
  }
`;

export default Footer;