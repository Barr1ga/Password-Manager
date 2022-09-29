const NodeRSA = require("node-rsa");
const text = [
  {
    id: 1,
    name: "Facebook",
    userName: "hor.barr1ga@gmail.com",
    domain: "https://www.facebook.com/",
    password: "hello123",
    type: "login",
    folder: "",
    favorite: false,
    trash: false,
    lastOpened: new Date().toString(),
    lastOpenedBy: 2,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
  },
];

// Simulation
// Alice
const AKey = new NodeRSA({ b: 1024 });
const AMessage = "Hello Bob";
const A_BASE_PUBLIC_KEY = AKey.exportKey("public");
const A_BASE_PRIVATE_KEY = AKey.exportKey("private");
const A_PUBLIC_LOAD_KEY = A_BASE_PUBLIC_KEY.replaceAll("\n", "").toString();
const A_PRIVATE_LOAD_KEY = A_BASE_PRIVATE_KEY.replaceAll("\n", "").toString();
const A_PUBLIC_KEY = new NodeRSA(A_PUBLIC_LOAD_KEY);
const A_PRIVATE_KEY = new NodeRSA(A_PRIVATE_LOAD_KEY);

// Bob
const BKey = new NodeRSA({ b: 1024 });
const BMessage = "Hello Alice";
const B_BASE_PUBLIC_KEY = BKey.exportKey("public");
const B_BASE_PRIVATE_KEY = BKey.exportKey("private");
const B_PUBLIC_LOAD_KEY = B_BASE_PUBLIC_KEY.replaceAll("\n", "").toString();
const B_PRIVATE_LOAD_KEY = B_BASE_PRIVATE_KEY.replaceAll("\n", "").toString();
const B_PUBLIC_KEY = new NodeRSA(B_PUBLIC_LOAD_KEY);
const B_PRIVATE_KEY = new NodeRSA(B_PRIVATE_LOAD_KEY);

// Conversation
// Alice
const encrypted = B_PUBLIC_KEY.encrypt(text, "base64");
console.log("encrypted: ", encrypted);

// Bob
const decrypted = B_PRIVATE_KEY.decrypt(encrypted, "utf8");
console.log("decrypted: ", decrypted);
