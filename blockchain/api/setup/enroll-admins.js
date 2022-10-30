const adminInfo = [
    {
        OrgName: process.env.ORG_NAME,
        CA: `ca.${process.env.ORG_NAME}.healthchain.com`,
        MSP: process.env.ORG_MSP
    }
];

const FabricAPI = require('../fabric/api');

const main = async () => {
    try {
        adminInfo.forEach(async (organization) => {
            console.log('Enrolling', organization);
            await FabricAPI.Account.EnrollAdmin(organization);
        });
    } catch (error) {
        console.error('Enrollment Failed!', error);
    }
};

main();
