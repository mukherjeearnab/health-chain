package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
)

// Chaincode is the definition of the chaincode structure.
type Chaincode struct {
}

// Definition of the emrStore structure
type emrStore struct {
	HealthID string   `json:"HealthID"`
	LocalID  string   `json:"LocalID"`
	EMRs     []string `json:"EMRs"`
}

const keyIndexName = "HealthID~LocalID"

// Init function.
func (cc *Chaincode) Init(stub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

// Invoke function.
func (cc *Chaincode) Invoke(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	fmt.Println("Invoke()", fcn, params)

	if fcn == "addEMR" {
		return cc.addEMR(stub, params)
	} else if fcn == "getEMRStore" {
		return cc.getEMRStore(stub, params)
	} else if fcn == "getEMRStoreHistory" {
		return cc.getEMRStoreHistory(stub, params)
	} else {
		fmt.Println("Invoke() did not find func: " + fcn)
		return shim.Error("Received unknown function invocation!")
	}
}

// Function to Set a new emrStore.
func (cc *Chaincode) addEMR(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// Set Number of Params
	paramCount := 3

	// Check if sufficient Params passed
	if len(params) != paramCount {
		return shim.Error(fmt.Sprintf("Incorrect number of params. Expecting %d!", paramCount))
	}

	// Check if Params are non-empty
	for a := 0; a < paramCount; a++ {
		if len(params[a]) <= 0 {
			return shim.Error("Params must be a non-empty string")
		}
	}

	// Copy the Values from params[]
	HealthID := params[0]
	LocalID := params[1]
	EMR := params[2]

	var emrStoreObject *emrStore
	var emrs []string

	// Generate emrStore Key
	emrStoreKey, err := stub.CreateCompositeKey(keyIndexName, []string{HealthID, LocalID})
	if err != nil {
		return shim.Error(err.Error())
	}

	// Check if EMRStore exists with Key => emrStoreKey
	emrAsBytes, err := stub.GetState(emrStoreKey)
	if err != nil {
		return shim.Error("Failed to check if EMRStore exists!")
	} else if emrAsBytes != nil {
		// if EMRStore is available, load it
		err = json.Unmarshal(emrAsBytes, &emrStoreObject) //unmarshal it aka JSON.parse()
		if err != nil {
			return shim.Error(err.Error())
		}
	} else {
		// Generate EMRStore from params provided
		emrStoreObject = &emrStore{HealthID, LocalID, emrs}
	}

	// append the emr ID to emrStoreObject
	emrStoreObject.EMRs = append(emrStoreObject.EMRs, EMR)

	// Convert to JSON bytes
	emrStoreJSONasBytes, err := json.Marshal(emrStoreObject)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Put State of newly generated emrStore with Key => emrStoreKey
	err = stub.PutState(emrStoreKey, emrStoreJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Returned on successful execution of the function
	return shim.Success(emrStoreJSONasBytes)
}

// Function to Read an emrStore.
func (cc *Chaincode) getEMRStore(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// Set Number of Params
	paramCount := 2

	// Check if sufficient Params passed
	if len(params) != paramCount {
		return shim.Error(fmt.Sprintf("Incorrect number of params. Expecting %d!", paramCount))
	}

	// Check if Params are non-empty
	for a := 0; a < paramCount; a++ {
		if len(params[a]) <= 0 {
			return shim.Error("Params must be a non-empty string")
		}
	}

	// Copy the Values from params[]
	HealthID := params[0]
	LocalID := params[1]

	// Generate emrStore Key
	emrStoreKey, err := stub.CreateCompositeKey(keyIndexName, []string{HealthID, LocalID})
	if err != nil {
		return shim.Error(err.Error())
	}

	// Get State of emrStore with Key => emrStoreKey
	emrStoreAsBytes, err := stub.GetState(emrStoreKey)
	if err != nil {
		jsonResp := "{\"Error\":\"Failed to get state for " + params[0] + "\"}"
		return shim.Error(jsonResp)
	} else if emrStoreAsBytes == nil {
		jsonResp := "{\"Error\":\"emrStore does not exist!\"}"
		return shim.Error(jsonResp)
	}

	// Returned on successful execution of the function
	return shim.Success(emrStoreAsBytes)
}

// Function to Get the History of an emrStore.
func (cc *Chaincode) getEMRStoreHistory(stub shim.ChaincodeStubInterface, params []string) sc.Response {

	// Set Number of Params
	paramCount := 2

	// Check if sufficient Params passed
	if len(params) != paramCount {
		return shim.Error(fmt.Sprintf("Incorrect number of params. Expecting %d!", paramCount))
	}

	// Check if Params are non-empty
	for a := 0; a < paramCount; a++ {
		if len(params[a]) <= 0 {
			return shim.Error("Params must be a non-empty string")
		}
	}

	// Copy the Values from params[]
	HealthID := params[0]
	LocalID := params[1]

	// Generate emrStore Key
	emrStoreKey, err := stub.CreateCompositeKey(keyIndexName, []string{HealthID, LocalID})
	if err != nil {
		return shim.Error(err.Error())
	}

	fmt.Printf("- start getemrStoreHistory: %s\n", emrStoreKey)

	resultsIterator, err := stub.GetHistoryForKey(emrStoreKey)
	if err != nil {
		return shim.Error(err.Error())
	}
	defer resultsIterator.Close()

	// buffer is a JSON array containing historic values for the marble
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		response, err := resultsIterator.Next()
		if err != nil {
			return shim.Error(err.Error())
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"TxId\":")
		buffer.WriteString("\"")
		buffer.WriteString(response.TxId)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Value\":")
		// if it was a delete operation on given key, then we need to set the
		//corresponding value null. Else, we will write the response.Value
		//as-is (as the Value itself a JSON marble)
		if response.IsDelete {
			buffer.WriteString("null")
		} else {
			buffer.WriteString(string(response.Value))
		}

		buffer.WriteString(", \"Timestamp\":")
		buffer.WriteString(strconv.FormatInt(response.Timestamp.Seconds, 10))

		buffer.WriteString(", \"IsDelete\":")
		buffer.WriteString(strconv.FormatBool(response.IsDelete))

		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

	fmt.Printf("- getemrStoreHistory returning:\n%s\n", buffer.String())

	return shim.Success(buffer.Bytes())
}
