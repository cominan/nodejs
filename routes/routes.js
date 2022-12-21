import express from 'express'
import { actionSelect, create, deledSoft, destroy, detail, fixCourse, reStore, table, trash, update, upload } from '../app/controllers/showController.js'


const app = express()
const router = express.Router()

function routes (app) {
    app.use('/',router.use('/restore/:id',reStore))
    app.use('/',router.use('/action-select',actionSelect))
    app.use('/',router.delete('/destroy/:id',destroy))
    app.use('/',router.use('/delete-soft/:id',deledSoft))
    app.use('/',router.use('/create',create))
    app.use('/',router.use('/trash',trash))
    app.use('/',router.use('/upload',upload))
    app.use('/',router.put('/update/:id',update))
    app.use('/',router.use('/fixcourse/:id',fixCourse))
    app.use('/',router.use('/detail/:id',detail))
    app.use('/',router.use('/course',table))
    app.use('/',router.use('',table))
}

export default routes