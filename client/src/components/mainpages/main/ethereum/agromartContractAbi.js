const agromartContract = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_accessor",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    constant: true,
    inputs: [],
    name: "accessor",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "buyerAddress",
    outputs: [
      {
        internalType: "bytes32",
        name: "reciepientName",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "line1",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "city",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "postalCode",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "countryCode",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "reciepientName",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "line1",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "city",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "postalCode",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "countryCode",
        type: "bytes32",
      },
    ],
    name: "setAddress",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "paymentId",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "username",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "email",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "timestamps",
        type: "bytes32",
      },
    ],
    name: "setPayment",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        internalType: "bytes32",
        name: "_id",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "title",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "quantity",
        type: "uint256",
      },
      {
        internalType: "bytes32",
        name: "images",
        type: "bytes32",
      },
    ],
    name: "setProduct",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getPayments",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getAllAddress",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        internalType: "bytes32",
        name: "paymentId",
        type: "bytes32",
      },
    ],
    name: "getProducts",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "_id",
        type: "bytes32[]",
      },
      {
        internalType: "bytes32[]",
        name: "_title",
        type: "bytes32[]",
      },
      {
        internalType: "uint256[]",
        name: "_price",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_quantity",
        type: "uint256[]",
      },
      {
        internalType: "bytes32[]",
        name: "_images",
        type: "bytes32[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getPaymentSize",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "getProductsLen",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];
export default agromartContract;
