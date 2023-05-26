
import { ProviderRpcClient } from "everscale-inpage-provider";

import { EverscaleStandaloneClient,  SimpleKeystore } from "everscale-standalone-client/nodejs";

import { Base64 } from 'js-base64';

async function main() {
  const Keystore = new SimpleKeystore({
    0: {
      publicKey: "4038a63fb2b95c0b85516f289fe87b8fc87860b7ba0920cd285e0bad53cff8a5",
      secretKey: "ae218eb9c8df7ab217ee4ecef0e74f178efdb8b9f697be6f6b72a7681110716a"
    }
  });
  const provider = new ProviderRpcClient({
    fallback: () =>
      EverscaleStandaloneClient.create({
        connection: {
          id: 1000,
          group: "venom_testnet",
          type: "jrpc",
          data: {
            endpoint: "https://jrpc-testnet.venom.foundation/rpc",
          },
        },
        keystore: Keystore,
      }),
    forceUseFallback: true,
  });
  // Data to be signed
  const data = 'example42';

  // Sign data with hashing
  const signedData = await provider.signData({
    publicKey: "4038a63fb2b95c0b85516f289fe87b8fc87860b7ba0920cd285e0bad53cff8a5",
    data: Base64.encode(data),
  });
  console.log(`Signed data:`, signedData);
}


if (require.main === module) {
  main();
}
