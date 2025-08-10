import express from "express"
import Note from "../models/noteModel.js"
const router = express.Router()


//Obter todas las notas
router.get("/", async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error al obtener las notas", error)
        res.status(500).json({error: "Internal server error"})
    }
})

//Obter una nota por id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const note = await Note.findById(id)
        if(!note) return res.status(404).json({error:"Nota no encontrada"})

        res.status(200).json(note)
    } catch (error) {
        console.error("Error al obtener nota por id", error)
        res.status(500).json({error: "Internal server error"})
    }
})

//Crear una nueva nota
router.post("/", async (req, res) => {
    try {
        const { title, description } = req.body
        const note = new Note({ title, description})

        const savedNote = await note.save()

        if (savedNote) {
            res.status(201).json({message: "Note creada correctamente", note: savedNote})
        }
    } catch (error) {
        console.error("Error al crear la nota", error)
        res.status(500).json({error: "Internal server error" })
    }
})

//Eliminar una nota
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const deletedNote = await Note.findByIdAndDelete(id)
        if(!deletedNote) return res.status(404).json({error: "Nota no eliminada"})

        res.status(200).json({message: "Nota elimida correctamente"})
    } catch (error) {
        console.error("Error al eliminar la nota", error)
        res.status(500).json({error: "Internal server error" })
    }
})

//Editar una nota
router.put("/:id", async (req, res) => {
    try {
        const id = req.params.id
        const { title, description } = req.body
        const updatedData = await Note.findByIdAndUpdate(id, { title, description }, {new: true})
        if(!updatedData) return res.status(404).json({error: "Nota no actualizada correctamente"})
        res.status(200).json({message: "Nota actualizada correctamente", note: updatedData })
    } catch (error) {
        console.error("Error al eliminar la nota", error)
        res.status(500).json({error: "Internal server error" })
    }

})



export default router