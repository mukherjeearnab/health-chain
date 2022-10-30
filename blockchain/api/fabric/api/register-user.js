const { FileSystemWallet, Gateway, X509WalletMixin } = require('fabric-network');
const path = require('path');

// Load Connection Profile
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
const ccp = require('/crypto/connection-ccp.json');

module.exports = async (user) => {
    const { OrgName, Affiliation, Username } = user;
    try {
        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallets', `wallet_${OrgName}`);
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet,
            identity: 'admin',
            discovery: { enabled: true, asLocalhost: true }
        });

        // Get the CA client object from the gateway for interacting with the CA.
        const ca = gateway.getClient().getCertificateAuthority();
        const adminIdentity = gateway.getCurrentIdentity();

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register(
            { affiliation: Affiliation, enrollmentID: Username, role: 'client' },
            adminIdentity
        );
        const enrollment = await ca.enroll({
            enrollmentID: Username,
            enrollmentSecret: secret
        });
        const userIdentity = X509WalletMixin.createIdentity(
            ccp.organizations[OrgName].mspid,
            enrollment.certificate,
            enrollment.key.toBytes()
        );
        await wallet.import(Username, userIdentity);
        console.log(`Added user <${Username}>`);
    } catch (error) {
        console.error(`Failed to enroll user <${Username}>: ${error.message}`);
    }
};
