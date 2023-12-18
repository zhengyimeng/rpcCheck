const { StargateClient } = require("@cosmjs/stargate");
const { DirectSecp256k1Wallet } = require("@cosmjs/proto-signing");

const rpcs = [
  "https://public-celestia-rpc.numia.xyz",
  "https://celestia-rpc.mesa.newmetric.xyz",
  "https://rpc.lunaroasis.net",
  "https://rpc.celestia.nodestake.top",
  "https://rpc-celestia.cosmos-spaces.cloud",
  "https://rpc-celestia-01.stakeflow.io",
  "http://celestia.rpc.nodersteam.com:29657",
  "https://celestia-rpc.lavenderfive.com:443",
  "https://celestia-rpc.publicnode.com:443",
  "https://rpc-celestia.theamsolutions.info",
  "https://celestia-rpc.enigma-validator.com",
  "https://rpc-celestia.mzonder.com",
  "https://celestia.rpc.stakin-nodes.com",
  "https://celestia-rpc.polkachu.com",
];

async function checkRpc(rpc) {
  const t = Date.now();
  try {
    const client = await StargateClient.connect(rpc);
    const height = await client.getHeight();
    return [Date.now() - t, rpc, height];
  } catch {
    return ["error", rpc];
  }
}

async function main() {
  let g = void 0;
  rpcs.forEach(async (rpc) => {
    const [t, r, height] = await checkRpc(rpc);
    if (t !== "error" && !g) {
      console.log("当前最快rpc:", (g = r));
      return;
    }
  });
}

main();
