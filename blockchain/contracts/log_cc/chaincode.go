package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	sc "github.com/hyperledger/fabric-protos-go/peer"
)

// Chaincode is the definition of the chaincode structure.
type Chaincode struct {
}

type eventStruct struct {
	EventType string `json:"eventType"`
	Timestamp string `json:"timestamp"`
	From      string `json:"from"`
	To        string `json:"to"`
}

// Definition of the eventStore structure
type eventStore struct {
	HealthID  string        `json:"HealthID"`
	LogEvents []eventStruct `json:"LogEvents"`
}

// Init function.
func (cc *Chaincode) Init(stub shim.ChaincodeStubInterface) sc.Response {
	return shim.Success(nil)
}

// Invoke function.
func (cc *Chaincode) Invoke(stub shim.ChaincodeStubInterface) sc.Response {
	fcn, params := stub.GetFunctionAndParameters()
	fmt.Println("Invoke()", fcn, params)

	if fcn == "addEvent" {
		return cc.addEvent(stub, params)
	} else if fcn == "getEventStore" {
		return cc.getEventStore(stub, params)
	} else {
		fmt.Println("Invoke() did not find func: " + fcn)
		return shim.Error("Received unknown function invocation!")
	}
}

// Function to Set a new eventStore.
func (cc *Chaincode) addEvent(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// Set Number of Params
	paramCount := 5

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
	eventType := params[1]
	timestamp := params[2]
	fromEvent := params[3]
	toEvent := params[4]

	var eventStoreObject *eventStore
	var events []eventStruct

	// Generate eventStore Key
	eventStoreKey := HealthID

	// Check if EventStore exists with Key => eventStoreKey
	emrAsBytes, err := stub.GetState(eventStoreKey)
	if err != nil {
		return shim.Error("Failed to check if EventStore exists!")
	} else if emrAsBytes != nil {
		// if EventStore is available, load it
		err = json.Unmarshal(emrAsBytes, &eventStoreObject) //unmarshal it aka JSON.parse()
		if err != nil {
			return shim.Error(err.Error())
		}
	} else {
		// Generate EventStore from params provided
		eventStoreObject = &eventStore{HealthID, events}
	}

	// append the emr ID to eventStoreObject
	eventToAdd := eventStruct{eventType, timestamp, fromEvent, toEvent}
	eventStoreObject.LogEvents = append(eventStoreObject.LogEvents, eventToAdd)

	// Convert to JSON bytes
	eventStoreJSONasBytes, err := json.Marshal(eventStoreObject)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Put State of newly generated eventStore with Key => eventStoreKey
	err = stub.PutState(eventStoreKey, eventStoreJSONasBytes)
	if err != nil {
		return shim.Error(err.Error())
	}

	// Returned on successful execution of the function
	return shim.Success(eventStoreJSONasBytes)
}

// Function to Read an eventStore.
func (cc *Chaincode) getEventStore(stub shim.ChaincodeStubInterface, params []string) sc.Response {
	// Set Number of Params
	paramCount := 1

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

	// Generate eventStore Key
	eventStoreKey := HealthID

	// Get State of eventStore with Key => eventStoreKey
	eventStoreAsBytes, err := stub.GetState(eventStoreKey)
	if err != nil {
		jsonResp := "{\"Error\":\"Failed to get state for " + params[0] + "\"}"
		return shim.Error(jsonResp)
	} else if eventStoreAsBytes == nil {
		jsonResp := "{\"Error\":\"eventStore does not exist!\"}"
		return shim.Error(jsonResp)
	}

	// Returned on successful execution of the function
	return shim.Success(eventStoreAsBytes)
}
