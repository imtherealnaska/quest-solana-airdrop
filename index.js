const {
  Connection,
  PublicKey,
  Account,
  Transaction,
  Keypair,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} = require("@solana/web3.js");

const newPair = new Keypair();
console.log(newPair);
// keyvalue : (pub , private )
const publicKey = new PublicKey( newPair._keypair.publicKey).toString();
const secretKey = newPair._keypair.secretKey;
//wallet balance
const getWalletBalance = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const myWallet = await Keypair.fromSecretKey(secretKey);
    const walletBalance = await connection.getBalance(
      new PublicKey(myWallet.publicKey)
    );
    console.log(`=> for wallet address : ${publicKey}`);
    console.log(`Wallet balance : ${walletBalance/LAMPORTS_PER_SOL}SOL`);
  } catch (err) {
    console.log(err);
  }
};

//airdrop f()
const airDropSol = async () => {
  try {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const walletKeyPair = await Keypair.fromSecretKey(secretKey);
    //create an airdrop signature
    const fromAirDropSignature = await connection.requestAirdrop(
      new PublicKey(walletKeyPair.publicKey),
      2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
  } catch (err) {
    console.log(err);
  }
};

const driverFunction = async () => {
  await getWalletBalance();
  await airDropSol();
  await getWalletBalance();
};

driverFunction();
