module.exports = (object) => {
    // Delete all properties cointaining personally identifiable information
    // Properties of PHI

    const anon = object;

    delete anon.AadhaarID;
    delete anon.Name;
    delete anon.Father;
    delete anon.Mother;
    delete anon.Phone;
    delete anon.Address;
    delete anon.Pincode;

    // TODO: Add Properties of PHR

    // return anonymized object
    return anon;
};
