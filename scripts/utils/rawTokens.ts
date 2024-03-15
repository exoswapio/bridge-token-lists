import { TokenInfo } from "@uniswap/token-lists";

import ethereum from "../../src/ethereum.tokens.json";
import stratos from "../../src/stratos.tokens.json";
import sepolia from "../../src/sepolia.tokens.json";
import amoy from "../../src/amoy.tokens.json";
import mesos from "../../src/mesos.tokens.json";

type IRawToken = Pick<TokenInfo, "address" | "name" | "symbol"> &
  Partial<Pick<TokenInfo, "logoURI" | "decimals">> & {
    isExperimental?: boolean;
    logoFile?: string;
  };

type IRawTokenListJson = readonly IRawToken[];

export const WEB3_NETWORK_NAMES = [
  "stratos",
  "mesos",
  "ethereum",
  "sepolia",
  "amoy",
] as const;
export type IWeb3Network = typeof WEB3_NETWORK_NAMES[number];

// assert the JSON is valid
const rawTokensJson: {
  [network in IWeb3Network]: [number, IRawTokenListJson];
} = {
  ethereum: [1, ethereum],
  stratos: [2048, stratos],
  mesos: [2047, mesos],
  sepolia: [11155111, sepolia],
  amoy: [80002, amoy],
};

export const getNetworkTokens = (network: IWeb3Network): IRawTokenListJson =>
  rawTokensJson[network][1];

export const rawTokens: readonly (IRawToken & {
  chainId: number;
})[] = Object.values(rawTokensJson).flatMap(([chainId, tokens]) =>
  tokens.map((tok) => ({ ...tok, chainId }))
);
