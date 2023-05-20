// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.5.0 <0.9.0;
// Uncomment this line to use console.log
import "hardhat/console.sol";

contract Vote {
    address electionCommission;

    // Structure Voter List
    struct Voter {
        string name;
        uint256 age;
        uint256 voterId;
        string gender;
        uint256 voteCandidateId;
        address voterAddress;
    }
    // Structure Candidate List
    struct Candidate {
        string name;
        string party;
        uint256 age;
        string gender;
        uint256 candidateId;
        address candidateAddress;
        uint256 votes;
    }

    uint256 public nextVoterId = 1;
    uint256 public nextCandidateId = 1;
    uint256 public startTime;
    uint256 public endTime;
    mapping(uint256 => Voter) voterDetails;
    mapping(uint256 => Candidate) candidateDetails;
    bool public stopVoting;
    mapping(uint256 => uint256) private voteCount;
    Voter[] public voteArr;
    Candidate[] public candidateArr;

    constructor() {
        electionCommission = msg.sender;
    }

    // beneficiary functions
    modifier isVotingOver() {
        require(endTime > block.timestamp && !stopVoting, "Voting is over");
        _;
    }
    // modified -check
   function voterVerification(address _person) internal view returns (bool) {
       // modified***
        for (uint256 i = 0; i < voteArr.length; i++) {
            if (voteArr[i].voterAddress == _person) {
                return false;
            }
        }
        return true;
    }

    function candidateVerification(address _person) internal view returns (bool){
      // modified *** 
        for (uint256 i = 0; i < candidateArr.length; i++) {
            if (candidateArr[i].candidateAddress == _person) {
                return false;
            }
        }
        return true;
    }

    // beneficiary functions complete


    function getOwner() public view returns (address) {
        return electionCommission;
    }
    // modified checked - acknowledged
     function getVoterInfo(address _voter) public view returns ( string memory, uint256, address, uint256, string memory, uint256 )
    {
        string memory _name;
        string memory _gender;
        address _voteraddress;
        uint256 _voteCandidateId;
        uint256 _voterId;
        uint256 _age;
        // modified
        for (uint256 i = 0; i < voteArr.length; i++) {
            if (_voter == voteArr[i].voterAddress) {
                _name = voteArr[i].name;
                _voteraddress = voteArr[i].voterAddress;
                _voteCandidateId = voteArr[i].voteCandidateId;
                _voterId = voteArr[i].voterId;
                _gender = voteArr[i].gender;
                _age = voteArr[i].age;
            }
        }
        return (_name, _voteCandidateId, _voteraddress, _voterId, _gender, _age );
    }

// made new changes.
    function getCandidateInfo(address _candidateO) public view
        returns ( string memory, string memory, uint256, string memory, uint256, address )
    {
       
        string memory _name;
        string memory _party;
        uint256 _age;
        string memory _gender;
        uint256 _candidateId;
        address _candidateAddress;
        uint256 _votes;
        // modified
        for (uint256 i = 0; i < candidateArr.length; i++) {
            if (_candidateO == candidateArr[i].candidateAddress) {
                
                _name = candidateArr[i].name;
                _party = candidateArr[i].party;
                _age = candidateArr[i].age;
                _gender = candidateArr[i].gender;
                _candidateId = candidateArr[i].candidateId;
                _candidateAddress = candidateArr[i].candidateAddress;
                _votes = candidateArr[i].votes;
                    
            }
        }
        return (_name, _party, _age, _gender, _candidateId, _candidateAddress);
    }


    // Imp functions to alter - newly Added
    function reset() public {
      require(
            msg.sender == electionCommission,
            "You are not from Election Commision"
        );
         require(endTime < block.timestamp || stopVoting, "Voting isn't over");
     
        for (uint256 i = 1; i <= nextCandidateId; i++) {
            delete candidateDetails[i];
        }
 for (uint256 i = 1; i <= nextVoterId; i++) {
            delete voterDetails[i];
        }

     nextVoterId = 1;
    nextCandidateId = 1;
    startTime = 0;
    endTime = 0;
    
    stopVoting = false;
    delete voteArr;
    delete candidateArr;
}

// newly added
// new function added 
function getCandidateArrIndex(uint256 _id) internal view returns (uint256){
          for (uint256 i = 0; i < candidateArr.length-1; i++) {
            if (candidateArr[i].candidateId == _id) {
                return i;
            }
        }
        return candidateArr.length-1;
}

function deleteCandidate(uint256 _id) external {
      require(
            !candidateVerification(msg.sender), // checking if it does contains that element, because it contains  
            "You are not allowed"
        );
        
        require(msg.sender ==  candidateDetails[_id].candidateAddress,"You are not supposed to do this" );
        // removed one require statement

            delete candidateDetails[_id];
            
        uint256 x = getCandidateArrIndex(_id);// modified updated

            // updated_
        for (uint i = x; i < candidateArr.length-1; i++) {
            
            candidateArr[i] = candidateArr[i + 1];
        }

       candidateArr.pop();
       
}

function updateCandidate(uint256 _id,   string calldata _name,
        string calldata _party,
        uint256 _age,
        string calldata _gender
    ) external {
        require(
            !candidateVerification(msg.sender),
            "You are not in the lisr"
        );
        require(startTime == 0, "Voting has started"); //Needs to be changed to starttime == 0 || block.timestamp < startTime in both update functions
        require(msg.sender ==  candidateDetails[_id].candidateAddress,"You are not supposed to do this" );
        require(_age >= 18, "You are not eligible to be a candidate");
        // require(nextCandidateId < 3, "Registration is full");
    candidateDetails[_id] = Candidate(
            _name,
            _party,
            _age,
            _gender,
            _id,
            msg.sender,
            0
        );
        
        uint256 x = getCandidateArrIndex(_id); //modified


         candidateArr[x] = candidateDetails[_id];//modified
         }


//  Note: Important to add Voter update deletre functions



        // new function added 
function getVoteArrIndex(uint256 _id) internal view returns (uint256){
          for (uint256 i = 0; i < voteArr.length-1; i++) {
            if (voteArr[i].voterId == _id) {
                return i;
            }
        }
        return voteArr.length-1;
}
function deleteVoter(uint256 _id) external {
      require(
            !voterVerification(msg.sender), // checking if it does contains that element, because it contains  
            "You are not allowed"
        );
        
        require(msg.sender ==  voterDetails[_id].voterAddress,"You are not supposed to do this" );
    //   removed one require statement

            delete voterDetails[_id];
            
              uint256 x = getVoteArrIndex(_id);// modified updated
        for (uint i = x; i < voteArr.length - 1; i++) {
            voteArr[i] = voteArr[i + 1];
        }
       voteArr.pop();
       
}

function updateVoter(uint256 _id,   string calldata _name,
        uint256 _age,
        string calldata _gender
    ) external {
        require(
            !voterVerification(msg.sender),
            "You are not in the lisr"
        );
        require(startTime == 0, "Voting has started");
        require(msg.sender ==  voterDetails[_id].voterAddress,"You are not supposed to do this" );
        require(_age >= 18, "You are not eligible to be a candidate");
        // removed one require statement;
    voterDetails[_id] = Voter(
           _name,
            _age,
            _id,
            _gender,
            0,
            msg.sender
        );

        uint256 x = getVoteArrIndex(_id); //modified
         voteArr[x] = voterDetails[_id];
         }


    // setter ------ [1] - modified
    function voterRegister(
        string calldata _name,
        uint256 _age,
        string calldata _gender
    ) external {
        require(voterVerification(msg.sender), "You have already registerd");
        require(_age >= 18, "You are not eligible to vote");

        voterDetails[nextVoterId] = Voter(
            _name,
            _age,
            nextVoterId,
            _gender,
            0,
            msg.sender
        );
        voteArr.push(voterDetails[nextVoterId]);
        nextVoterId++;
    }

    // setter ------ [2]
    function vote(uint256 _voterId, uint256 _id) external isVotingOver {
        require(
            voterDetails[_voterId].voteCandidateId == 0,
            "You have already voted"
        );
        require(
            voterDetails[_voterId].voterAddress == msg.sender,
            "You are not a voter"
        );
        require(startTime != 0, "Voting has not started");
        voterDetails[_voterId].voteCandidateId = _id;
        voteCount[_id]++;
        candidateDetails[_id].votes++;
         uint256 x = getVoteArrIndex(_voterId); //modified
         voteArr[x] = voterDetails[_voterId];
         uint256 y = getCandidateArrIndex(_id); //modified
         candidateArr[y] = candidateDetails[_id];//modified
    }

    // setter ------ [3] - modified
    function candidateRegister(
        string calldata _name,
        string calldata _party,
        uint256 _age,
        string calldata _gender
    ) external {
        require(
            candidateVerification(msg.sender),
            "You have already registerd"
        );
        require(_age >= 18, "You are not eligible to be a candidate");
        candidateDetails[nextCandidateId] = Candidate(
            _name,
            _party,
            _age,
            _gender,
            nextCandidateId,
            msg.sender,
            0
        );
        candidateArr.push(candidateDetails[nextCandidateId]);
        nextCandidateId++;
    }

    // getter [4] - new* imporved modified
    function result()
        external
        view
        returns (
            uint256,
            string memory,
            uint256
        )
    {
        uint256 maxVote = 0;
        uint256 maxVoteCandidateId = 0;
        string memory _name;
        for (uint256 i = 0; i < candidateArr.length; i++) {
            if (candidateArr[i].votes > maxVote ) {
                maxVote = candidateArr[i].votes;
                maxVoteCandidateId = candidateArr[i].candidateId;
                _name = candidateArr[i].name;
            }
        }
        return (
            maxVoteCandidateId,
            _name,
            maxVote
        );
    }


// getter [1] - modified -modified
    function candidateList() public view returns (Candidate[] memory) {
       
        return candidateArr;
    }
// getter [2] - modified -modified
    function voterList() external view returns (Voter[] memory) {
       
        return voteArr;
    }

    // setter ------ [4]
    function voteTime(uint256 _startTime, uint256 _endTime) external {
        require(
            msg.sender == electionCommission,
            "You are not from Election Commision"
        );
        startTime = block.timestamp + _startTime;
        endTime = startTime + _endTime;
        stopVoting = false;
    }

    // getter [3]
    function votingStatus() public view returns (string memory) {
        if (startTime == 0) {
            return "Not Started";
        } else if (
            (startTime != 0 && endTime > block.timestamp) && stopVoting == false
        ) {
            return "In progress";
        } else {
            return "Ended";
        }
    }

    // setter -------[5]
    function emergency() public {
        stopVoting = true;
    }

}