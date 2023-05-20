const hre = require("hardhat");

async function candidateLists(candidates) {
  for (const candidate of candidates) {
    const name = candidate.name;
    const party = candidate.party;
    const age = candidate.age;
    const id = candidate.candidateId;
    const votes = candidate.votes;
    console.log(
      id + "-----" + name + "-----" + party + "-----" + age + "----votes = " + votes
    );

  }
}
async function votersLists(voters) {
  for (const voter of voters) {
    const name = voter.name;
    const whomVoted = voter.voteCandidateId;
    const age = voter.age;
    const id = voter.voterId;
    console.log(
      id + "-----" + name + "-----" + age + "---whom voted - " + whomVoted
    );
  }
}
async function main() {
  const [owner, cad1, cad2, cad3, voter1, voter2, voter3] = await hre.ethers.getSigners();
  const vote = await hre.ethers.getContractFactory("Vote");
  const contract = await vote.deploy(); //instance of contract

  await contract.deployed();
  console.log("Address of contract:", contract.address);

  const addresses = [
    owner.address,
    cad1.address,
    cad2.address,
    cad3.address,
    voter1.address,
    voter2.address,
    voter3.address,
  ];



  const status = await contract.votingStatus();

  await contract.connect(cad1).candidateRegister("Shreyas", "A", 21, "male");
  await contract.connect(cad2).candidateRegister("Bhagyawan", "B", 60, "male");
  await contract.connect(cad3).candidateRegister("Parkar", "C", 81, "male");

  await contract.connect(voter1).voterRegister("Tony Stark", 21, "male");
  await contract.connect(voter2).voterRegister("Bruce Banner", 60, "male");
  await contract.connect(voter3).voterRegister("Harry Potter", 81, "male");

  console.log("status --> " + status)
  await contract.connect(owner).voteTime(1, 20);

  await contract.connect(voter1).vote(1, 1);
  await contract.connect(voter2).vote(2, 3);
  await contract.connect(voter3).vote(3, 3);


  const result = await contract.result();

  const candidates = await contract.candidateList();

  const voters = await contract.voterList();
  
  console.log(await contract.nextCandidateId());
  const startTime = await contract.startTime();
  const endTime = await contract.endTime();

  console.log("s = "+startTime + "----  e = " + endTime);

  console.log(result[1])
  candidateLists(candidates);
  votersLists(voters);

  const status2 = await contract.votingStatus();

  console.log("status --> " + status2)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});