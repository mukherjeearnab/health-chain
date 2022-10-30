const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const path = require('path');

// Load Connection Profile
// eslint-disable-next-line import/no-unresolved, import/no-absolute-path
const ccp = require('/crypto/connection-ccp.json');

module.exports = async (user) => {
    const { OrgName, Affiliation, Username, CA } = user;
    try {
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities[CA];
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const caClient = new FabricCAServices(
            caInfo.url,
            { trustedRoots: caTLSCACerts, verify: false },
            caInfo.caName
        );

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallets', `wallet_${OrgName}`);
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user
        const userIdentity = await wallet.get(Username);
        if (userIdentity) {
            console.log(`An identity for the user ${Username} already exists in the wallet`);
            return;
        }

        // Must use an admin to register a new user
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            console.log('An identity for the admin user does not exist in the wallet');
            console.log('Enroll the admin user before retrying');
            return;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        // if affiliation is specified by client, the affiliation value must be configured in CA
        const secret = await caClient.register(
            {
                affiliation: Affiliation,
                enrollmentID: Username,
                role: 'client'
            },
            adminUser
        );

        const enrollment = await caClient.enroll({
            enrollmentID: Username,
            enrollmentSecret: secret
        });

        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes()
            },
            mspId: ccp.organizations[OrgName].mspid,
            type: 'X.509'
        };

        await wallet.put(Username, x509Identity);

        console.log(`Added user <${Username}>`);
    } catch (error) {
        console.error(`Failed to enroll user <${Username}>: ${error.message}`);
    }
};
