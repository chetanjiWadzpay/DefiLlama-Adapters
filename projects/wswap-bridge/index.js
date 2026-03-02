const WCHAIN_BRIDGED_TOKENS = [
  "0x4560d5eb0c32a05fa59acd2e8d639f84a15a2414",
  "0x6cdfda79787caa4ad1a95456095bedc95abd2d75",
  "0xd4f93cacd6d607789c8ecf1dddeba8b0c4d915a8",
  "0x9b4805dc867c279a96f3ed0745c8bc15153a22e6",
  "0x0ab978880d3bf13e448f4f773acd817e83bddb0e",
  "0x40cb2cccf80ed2192b53fb09720405f6fe349743",
  "0x643ec74ed2b79098a37dc45dcc7f1abfe2ade6d8",
];

async function wchainTvl(_, _b, _cb, { api }) {

  const supplies = await api.multiCall({
    abi: "erc20:totalSupply",
    calls: WCHAIN_BRIDGED_TOKENS.map(i => ({ target: i })),
  });

  WCHAIN_BRIDGED_TOKENS.forEach((token, index) => {
    const supply = supplies[index];
    if (supply && supply !== "0") {
      api.add(token, supply);
    }
  });
console.log(await api.getBalances())
  return api.getBalances();
}

module.exports = {
  methodology:
    "Bridge TVL counts totalSupply of all WBridgedERC20 tokens minted on WChain",
  wchain: {
    tvl: wchainTvl,
  },
};