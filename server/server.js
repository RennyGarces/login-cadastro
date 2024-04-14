const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
let usuarios = [];

app.use(express.json());
app.post("/cadastro", (req, res) => {
  const usuario = req.body;
  usuarios.push(usuario);
  const documentoUsuarios = path.join(__dirname, "users.json");
  console.log(` foi guardado em : ${documentoUsuarios}`);
  fs.writeFile(documentoUsuarios, JSON.stringify(usuarios, null, 2), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Error" });
    } else {
      res.status(201).json({ message: "usuario cadastrado" });
    }
  });
});
app.use(express.static(path.join(__dirname, "../build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../build/index.html"));
});

/* app.listen(3005, () => console.log("porto 3005")); */
app.listen(process.env.PORT || 3005, () =>
  console.log(`Server running on port ${process.env.PORT || 3005}`)
);
