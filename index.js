import express from "express";
import alunosRouter from "./routes/alunos.routes.js";

const app = express();
app.use(express.json());


const PORT = 2026;
app.listen(PORT, () => {
    console.log("servidor rodando na porta 2026")
});

app.get("/", (req,res) => {
    res.send("Rota principal");         
});

app.use("/alunos", alunosRouter);
