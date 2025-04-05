const { ethers } = require('ethers');
const Job = require('../models/job.model');
const FreelancerEscrow = require('../contracts/FreelancerEscrow.json');

const provider = new ethers.providers.JsonRpcProvider(process.env.BLOCKCHAIN_PROVIDER_URL);
const wallet = new ethers.Wallet(process.env.ESCROW_MANAGER_PRIVATE_KEY, provider);

exports.createEscrowContract = async ({ clientAddress, freelancerAddress, amount, currency }) => {
  try {
    const factory = new ethers.ContractFactory(
      FreelancerEscrow.abi,
      FreelancerEscrow.bytecode,
      wallet
    );
    
    const contract = await factory.deploy(
      clientAddress,
      freelancerAddress,
      ethers.utils.parseUnits(amount.toString(), 'ether')
    );
    
    await contract.deployed();
    return contract.address;
  } catch (error) {
    console.error('Error deploying contract:', error);
    throw new Error('Failed to create escrow contract');
  }
};

exports.releasePayment = async (contractAddress) => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      FreelancerEscrow.abi,
      wallet
    );
    
    const tx = await contract.releasePayment();
    await tx.wait();
    return { success: true, transactionHash: tx.hash };
  } catch (error) {
    console.error('Error releasing payment:', error);
    throw new Error('Failed to release payment');
  }
};

exports.getContractStatus = async (contractAddress) => {
  try {
    const contract = new ethers.Contract(
      contractAddress,
      FreelancerEscrow.abi,
      provider
    );
    
    const [balance, isReleased, client, freelancer, amount] = await Promise.all([
      provider.getBalance(contractAddress),
      contract.isReleased(),
      contract.client(),
      contract.freelancer(),
      contract.amount()
    ]);
    
    return {
      balance: ethers.utils.formatEther(balance),
      isReleased,
      client,
      freelancer,
      amount: ethers.utils.formatEther(amount)
    };
  } catch (error) {
    console.error('Error fetching contract status:', error);
    throw new Error('Failed to fetch contract status');
  }
};