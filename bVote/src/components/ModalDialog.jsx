import React, { useState } from "react";

import Modal from "styled-react-modal";
import FocusLock from "react-focus-lock";
import { VscClose, VscLinkExternal } from "react-icons/vsc";

import VoterRegister from "./VoterRegisterForm";
import CandidateRegister from "./CandidateRegister";
import { Button } from "../styles/Button";
import SetTimer from "./SetTimer";


const StyledModal = Modal.styled`
  // width: 35rem;
  // height: 50rem;
  padding:2rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  
  border-radius:1.2rem;
  opacity: ${(props) => props.opacity};
  transition : all 0.3s ease-in-out;
  .btn{
    maxWidth: 12rem;
    height: 4.76rem;
  }

`;
  
export function VIDModal(){
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    setIsOpen(!isOpen);
  }

  return (
    <> 
      {/* <button onClick={toggleModal}>Open modal</button> */}
      <VscLinkExternal onClick={toggleModal}/>
      <StyledModal
        isOpen={isOpen}
        onEscapeKeydown={toggleModal}
        role="dialog"
        aria-modal={true}
        aria-labelledby="modal-label"
      >
        <FocusLock>
                 
          <div style={{ display: 'flex', color: 'black', fontSize: '1.9rem', justifyContent: 'end',alignItems:'start', paddingBottom:'1.6em' }}>
                      <sup onClick={toggleModal}><VscClose/></sup>
                      </div>
          <VoterRegister decision = {true} />
          {/* <button onClick={toggleModal}>Close me</button> */}
        </FocusLock>
      </StyledModal>
    </>
  );
}









export function CIDModal(){
    const [isOpen, setIsOpen] = useState(false);
  
    function toggleModal(e) {
      setIsOpen(!isOpen);
    }
  
    return (
      <> 
        {/* <button onClick={toggleModal}>Open modal</button> */}
        <VscLinkExternal onClick={toggleModal}/>
        <StyledModal
          isOpen={isOpen}
          onEscapeKeydown={toggleModal}
          role="dialog"
          aria-modal={true}
          aria-labelledby="modal-label"
        >
          <FocusLock>
            
          <div style={{ display: 'flex', color: 'black', fontSize: '1.9rem', justifyContent: 'end',alignItems:'start', paddingBottom:'1.6em' }}>
                      <sup onClick={toggleModal}><VscClose/></sup>
                      </div>
            <CandidateRegister decision={true}/>
            
          </FocusLock>
        </StyledModal>
      </>
    );
  }
  



  
export function SetTimeModal(){
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal(e) {
    console.log(isOpen)
    setIsOpen(!isOpen);
    console.log(isOpen)
  }

  return (
    <> 
      <Button onClick={toggleModal} className="btn"  style={{ fontSize: '1.5rem',
     }}>Set Time</Button>
       {/* <button onClick={toggleModal}>Open modal</button> */}
      <StyledModal
        isOpen={isOpen}
        onEscapeKeydown={toggleModal}
        role="dialog"
        aria-modal={true}
        aria-labelledby="modal-label"
      >
        <FocusLock>
        <div style={{ display: 'flex', color: 'black', fontSize: '1.9rem', justifyContent: 'end',alignItems:'start', paddingBottom:'1.6em' }}>
                    <sup onClick={toggleModal}><VscClose/></sup>
                    </div>
          {/* <CandidateRegister decision={true}/> */}
          
          <SetTimer/>
        </FocusLock>
      </StyledModal>
    </>
  );
}