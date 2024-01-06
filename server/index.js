const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");

app.use(cors());
app.use(express.json());

const balances = {
  "03b5449c6bc8e7810599d8b616ab343aa95a19d85c6ead90415fe99ef035890da3": 100,
  "024575740e8e98180978486274a5fc8dc4de16bf35d1a8d5c73a48f34ca95c5943": 50,
  "029a4226017cd9afd7f12d9afe05957e7d67e795db980a7ca27f955ca6b37f3262": 75,
};

const wallets = [
  {
    privateKey:
      "e2f1cfcd2b6b92901f1c2b68e1c4a8cb20999a48153e138c664385764f85eb19",
    publicKey:
      "03b5449c6bc8e7810599d8b616ab343aa95a19d85c6ead90415fe99ef035890da3",
  },
  {
    privateKey:
      "8122fecf818ff0d8f8943b81d79765d4b669ebbb007cac646916105a982eeae2",
    publicKey:
      "024575740e8e98180978486274a5fc8dc4de16bf35d1a8d5c73a48f34ca95c5943",
  },
  {
    privateKey:
      "2a3966b66cf62df19937798891677d7704c9b9d9fafc3416ff499bdfb2f4c3e0",
    publicKey:
      "029a4226017cd9afd7f12d9afe05957e7d67e795db980a7ca27f955ca6b37f3262",
  },
];

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount, messageHash, signature } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else if (isValidTransaction(req.body)) {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function isValidTransaction(object) {
  return secp.secp256k1.verify(object.signature, messageHash, sender);
}
