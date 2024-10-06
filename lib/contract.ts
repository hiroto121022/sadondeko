import { client } from "./client";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// コントラクトとの接続
export const contract = getContract({ 
	client, 
	chain: defineChain(1), 
	address: "0x801e6db4cc08f436032297bc32D1eeDE67133515"
});