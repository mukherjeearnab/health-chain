module.exports = (object) => {
    // Delete all properties cointaining personally identifiable information
    // Properties of PHI
    delete object.AadhaarID;
    delete object.Name;
    delete object.Father;
    delete object.Mother;
    delete object.Phone;
    delete object.Address;
    delete object.Pincode;

    // TODO: Add Properties of PHR

    // return anonymized object
    return object;
};
