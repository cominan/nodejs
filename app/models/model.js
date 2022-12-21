import mongoose from "mongoose";
import mongoose_delete from 'mongoose-delete'

const Schema = mongoose.Schema
const TestCours = new Schema({
    name: String,
    description: String,
}, {
    timestamps: true
})

TestCours.plugin(mongoose_delete, { overrideMethods: 'all' }, { deletedAt: true })


export const KhoaHoc = mongoose.model('KhoaHoc', TestCours)

