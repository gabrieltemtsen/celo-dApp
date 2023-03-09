import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from 'dotenv'
dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks:{
    alfajores: {
      url: `https://alfajores-forno.celo-testnet.org`,
      accounts: [PRIVATE_KEY]
    },
  }
};

export default config;
