// import moment from "moment";
import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import abi from './contracts/Vote.json'
import { ethers } from "ethers";


const AppContext = React.createContext();


const intialState = {
  name: "",
  image: "",
  content: "",
  results: [],
  btnLink: "",
  btnContent: "",
  contractInfo: {
    provider: null,
    signer: null,
    contract: null,
    account: "none",
    balance:0,
    getcandidateList:[],
    getvoterList:[],
    getresult:[],
    getvoterInfo:[],
    getvoterInfoAddr:'',
    getvoterInfoId:0,
    getcandidateInfo:[],
    getcandidateInfoAddr:'',
    getcandidateInfoId:0,
    getowner:'',
    getStartTime:0,
    getEndTime:0,
    stopVoting:'',
    timestamp:0,
    verifyCandidate:false,
    votingStatus:'',
  }

};

const API = ""
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  



  const connectWallet = async () => {

    const contractAddress = ""
    const contractABI = abi.abi;

    try {

      const { ethereum } = window;
      //  Connecting to metamask
      if (ethereum) {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);


        const balance = await provider.getBalance(account[0]);
        const balanceInEth = parseFloat(ethers.utils.formatEther(balance));
        const balanceRoundOff = balanceInEth.toFixed(3);
        // Getter functions
        const cList = await contract.candidateList();
        const vList = await contract.voterList();
        const res = await contract.result();
        const vInfo = await contract.getVoterInfo(account[0]);
        const vInfoAddr = await vInfo[2];
        const vInfoId = await vInfo[3];
        const cInfo = await contract.getCandidateInfo(account[0]);
        const cInfoAddr = await cInfo[5];
        const cInfoId = await cInfo[4];
        const owner = await contract.getOwner();
        const startTime = await contract.startTime();
        const endTime = await contract.endTime();
        const stop = await contract.stopVoting();

        const now = new Date();
        const timestamp = Math.floor((now.getTime())/1000);


        let arr = [
          { mId:"", party:"Group 14" },
          { mId:"", party:"Group 38"},
          { mId:"", party:"Group 13"}
      ];
      console.log((await contract.nextCandidateId()).toNumber())
      
        const verify = () => { 
          for (let i = 0; i < arr.length; i++) {
            const element = arr[i];
            const id = element.mId.toUpperCase()
            if(id === account[0].toUpperCase()){
             
              return true;
            }
           
          }
          return false;}
          
          const verifyCandidate = verify();

          const votingStatus = await contract.votingStatus();
        dispatch({
          type: "GET_ETHDATA",
          payload: {
            contractInfo: {
              provider: provider,
              signer: signer,
              contract: contract,
              account:account,
              balance:balanceRoundOff,
              getcandidateList:cList,
              getvoterList:vList,
              getresult:res,
              getvoterInfo:vInfo,
              getvoterInfoAddr:vInfoAddr,
              getvoterInfoId:vInfoId,
              getcandidateInfo:cInfo,
              getcandidateInfoAddr:cInfoAddr,
              getcandidateInfoId:cInfoId,
              getowner:owner,
              getStartTime:startTime.toNumber(),
              getEndTime:endTime.toNumber(),
              stopVoting:stop,
              timestamp:timestamp,
              verifyCandidate:verifyCandidate,
              votingStatus:votingStatus,
            }
          },
        });
      } else {
        alert("Please install metamask")
      }
    }
    catch (error) {
      console.log(error);
    }

  };

  const updateHomePage = (bool) => {
    return dispatch({
      type: "HOME_UPDATE",
      payload: {
        name: "bVote",
        image: "./images/bVoteSystem.jpg",
        content: "Decentralized Voting a way to carry out Tamper Proof Voting. It is required to register before carrying out the process ",
        btnLink: bool? "votenow":"register",
        btnContent:bool?"voteNow":"Register",
      },
    });
  };

  const udpateAboutPage = () => {
    return dispatch({
      type: "ABOUT_UPDATE",
      payload: {
        name: "bVote",
        image: "./images/bVoteSystem2.jpg",
        content: "It is an implementation of the BlockChain technology on the traditional voting system.This application will help, carry out election process tamper-proof 🔐. All the related data/records are maintained on blockchain ledger 📒 (once wrote cannot be erased).",
        btnLink: "",
        btnContent: "Read More",
      },
    });
  };



  //  to get the api data



  const getResults = async (url) => {
    try {
      const candidates = await contract.candidateList();
      // for (const candidate of candidates) {
      //   const name = candidate.name;
      //   const party = candidate.party;
      //   const age = candidate.age;
      //   const id = candidate.candidateId;
      //   const votes = candidate.votes;
      //   console.log(
      //     id + "-----" + name + "-----" + party + "-----" + age + "----votes = " + votes
      //   );
    
      dispatch({ type: "GET_RESULTS", payload: candidates });
    } catch (error) {
      console.log(error);
    }
  };
  // to call the api
  useEffect(() => {
    // getResults(API);
    connectWallet();
  }, []);




  return (
    <AppContext.Provider value={{ ...state,getResults, updateHomePage, udpateAboutPage }}>
      {children}
    </AppContext.Provider>
  );
};

// gloabal custom hook use Global Context hook so as to we don't import useContext , extract it whereas it can be done using this in by single import statement.
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
