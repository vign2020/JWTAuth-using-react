const mongoose = require('mongoose')

const ModalSchema = new mongoose.Schema({
    heading : String,
    text: String,
})

const Modal = mongoose.model('Modal', ModalSchema);

module.exports = Modal;




