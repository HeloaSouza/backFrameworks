const express = require("express");
const app = express();

app.use(express.json()); // middleware resgistrado antes das rotas que precisam ter acesso ao body

const PORT = 2026;

const alunos = []

app.get("/", (req,res) => {
    res.send("Rota principal");
});

// alunos
app.get("alunos", (req, res) => { 
    res.json(alunos);
});

let proximoId = 0;

proximoId++;

//METODOS
app.post("/alunos", (req,res) => {
    const aluno = {
        id: proximoId,
        nome: req.body.nome,
        curso: req.body.curso
    };
    proximoId++;
    alunos.push(aluno);
    console.log(alunos);
    res.status(201).json(aluno);
});

//GET
app.get("alunos", (req, res) => { 
    res.json(alunos);
});
//get em rota parametrizada
app.get("/alunos/:id", (req,res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json ({
            mensagem:"ID inválido"
        });
    };

    const aluno = alunos.find ((aluno) => {
        return aluno.id === id
    });

    if (!aluno) {
    return res.status(404).json({
        mensagem:"Aluno não encontrado"
        });
    };

    res.status(200).json(aluno)
});

alunos.find (
    aluno => aluno.id === id
);

//PUT
app.put("/alunos/", (req, res) => {
    res.send("Aluno autalizado com sucesso")
})
//put em rota parametrizada
app.put("/alunos/:id", (req, res) => {
    const id = Number(req.params.id) 

     if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json ({
            mensagem:"ID inválido"
        });
    };

    if (!req.body.nome || !req.body.curso) {
        return res.status(400).json({
            mensagem: "Nome e curso são obrigatórios"
        });
    }

    const aluno = alunos.find(aluno => aluno.id === id);
    if (!aluno) {
        return res.status(404).json({mensagem:"Aluno não encontrado"});
    }

    aluno.nome = req.body.nome;
    aluno.curso = req.body.curso;
    res.status(200).json(aluno)
});

app.delete("/alunos", (req, res) => {
    res.send("Aluno excluído com sucesso")
})

// cursos
app.get("/cursos", (req, res) => {
    res.send("Lista de cursos cadastrados");
});

app.post("/cursos", (req, res) => {
    res.send("Curso cadastrado com sucesso!")
});

app.put("/cursos", (req, res) => {
    res.send("Curso autalizado com sucesso")
});

app.delete("/cursos", (req, res) => {
    res.send("Curso excluído com sucesso")
});

app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`)
})
