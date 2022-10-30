const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

// Load Connection Profile
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
const ccp = require('/crypto/connection-ccp.json');

module.exports = async (user, contract) => {
    const { OrgName, Username } = user;
    const { Function, Name, Channel, Params } = contract;

    try {
        const walletPath = path.join(process.cwd(), 'wallets', `wallet_${OrgName}`);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: Username,
            discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(Channel);

        // Get the contract from the network.
        const Contract = network.getContract(Name);

        // Submit the specified transaction.
        const payload = await Contract.submitTransaction(Function, ...Params);

        // Return payload (if any)
        if (payload) return JSON.parse(payload.toString());
    } catch (error) {
        console.error('Failed to Submit Transaction.', error.message);
    }

    // If all fails, return null
    return null;
};
