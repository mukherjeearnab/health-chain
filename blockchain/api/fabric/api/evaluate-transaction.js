const { Wallets, Gateway } = require('fabric-network');
const path = require('path');

// Load Connection Profile
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
const ccp = require('/crypto/connection-ccp.json');

module.exports = async (user, contract) => {
    const { OrgName, Username } = user;
    const { Function, Name, Channel, Params } = contract;

    console.log(`Evaluating Transaction to ${Name} calling ${Function}`);
    console.log('Params ', Params);

    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallets', `wallet_${OrgName}`);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: Username,
            discovery: { enabled: true, asLocalhost: false }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(Channel);

        // Get the contract from the network.
        const Contract = network.getContract(Name);

        // Evaluate the specified transaction.
        const payload = await Contract.evaluateTransaction(Function, ...Params);

        // Disconnect the Gateway
        gateway.disconnect();

        // Return payload (if any)
        if (payload) return { exec: true, result: JSON.parse(payload.toString()) };
    } catch (error) {
        console.error('Failed to Evaluate Transaction.', error);
    }

    // If all fails, return null
    return { exec: false, result: null };
};
