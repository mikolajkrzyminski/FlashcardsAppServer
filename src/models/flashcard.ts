import mongoose from "mongoose"

const FlashcardSchema = new mongoose.Schema({
    sourceLang: {
        type: String,
        required: true,
        trim: true,
    },
    targetLang: {
        type: String,
        required: true,
        trim: true,
    },
    sourceWord: {
        type: String,
        required: true,
        trim: true,
    },
    targetWord: {
        type: String,
        required: true,
        trim: true,
    },
});

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

export default Flashcard;