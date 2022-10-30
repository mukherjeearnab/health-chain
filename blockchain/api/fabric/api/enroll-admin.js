const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const path = require('path');

// Load Connection Profile
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
const ccp = require('/crypto/connection-ccp.json');

module.exports = async (organization) => {
    const { CA, OrgName, MSP } = organization;
    try {
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities[CA];
        const ca = new FabricCAServices(
            caInfo.url,
            { trustedRoots: [], verify: false },
            caInfo.caName
        );

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallets', `wallet_${OrgName}`);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the admin user.
        const adminExists = await wallet.get('admin');
        if (adminExists) {
            console.log('An identity for the admin user "admin" already exists in the wallet.');
            return;
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: MSP,
            type: 'X.509'
        };

        await wallet.put('admin', identity);
        console.log('Successfully enrolled admin user "admin" and imported it into the wallet.');
    } catch (error) {
        console.error(`Failed to enroll admin user "admin": ${error}`);
    }
};
