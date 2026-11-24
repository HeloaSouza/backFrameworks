import express from "express";
const router = express.Router();

const alunos = [];
let alunoId = 1;

//GET
router.get("/", (req, res) => { 
    res.status(200).json(alunos);
});

//get em rota parametrizada
router.get("/:id", (req,res) => {
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

// POST
router.post("/", (req,res) => {
    console.log(req.body)
    const aluno = {
        id: alunoId,
        nome: req.body.nome,
        curso: req.body.curso
    };
    alunoId++;
    alunos.push(aluno);
    console.log(alunos);
    res.status(201).json(aluno);
});

//put em rota parametrizada
router.put("/:id", (req, res) => {
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

// DELETE
router.delete("/", (req, res) => {
    res.send("Aluno excluído com sucesso")
})
// delete em rota parametrizada
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    const indice = alunos.findIndex(aluno => aluno.id === id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    alunos.splice(indice,1);

    res.status(200).json({
        mensagem: "Aluno excluído com sucesso"
    });
});

export default router;
