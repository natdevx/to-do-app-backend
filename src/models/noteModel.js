import mongoose from "mongoose";

//Esto seria como el esquema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true})


//Esto seria como el modelo o algo asi
const Note = new mongoose.model("Note", noteSchema)


export default Note