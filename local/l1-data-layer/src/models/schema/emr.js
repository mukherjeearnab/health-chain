module.exports = {
    AadhaarID: String,
    MedicalRecords: [
        {
            Timestamp: Number,
            DoctorID: String,
            Conditions: [String],
            Prescription: [String],
            PhysicalExamination: {
                Pulse: Number,
                BloodPressure: { Sys: Number, Dia: Number },
                Weight: Number,
                Temperature: Number,
                SpO2: Number
            },
            LabTests: [
                {
                    TestType: String,
                    HealthWorkerID: String,
                    Results: String
                }
            ]
        }
    ]
};
