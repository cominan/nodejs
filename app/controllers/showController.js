import { response } from "express"
import { KhoaHoc } from "../models/model.js"


function covertData(a) {
    return a.map(b => b.toObject())
}
class showControllers {
    create(req, res, next) {
        res.render('create')
    }
    upload(req, res, next) {
        const KhoaHocMoi = new KhoaHoc(req.body)
        KhoaHocMoi.save()
            .then(course => res.redirect('/course'))
    }
    table(req, res, next) {
        let findCourse = KhoaHoc.find({});
        if (req.query.hasOwnProperty("_sort")) {
            findCourse = findCourse.sort({ [req.query.column]: [req.query.type] })
        }

        Promise.all([findCourse, KhoaHoc.countDeleted()])
            .then(([course, numb]) => res.render('couser', { course: covertData(course), numb }))
    }
    actionSelect(req, res, next) {
        switch (req.query.action) {
            case 'delete':
                KhoaHoc.delete({ _id: { $in: req.query.checkitemIds } })
                    .then(() => res.redirect('back'))
                break;
            default:
                res.send(req.query.action)
        }

    }
    detail(req, res, next) {
        KhoaHoc.findOne({ _id: req.params.id })
            .then(course => res.render('detail', { course: course.toObject() }))
    }
    fixCourse(req, res, next) {
        KhoaHoc.findOne({ _id: req.params.id })
            .then(course => res.render('fixCourse', { course: course.toObject() }))
    }
    update(req, res, next) {
        KhoaHoc.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
    }
    deledSoft(req, res, next) {
        KhoaHoc.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
    }
    trash(req, res, next) {
        KhoaHoc.findDeleted()
            .then(course => res.render('courseTrash', { course: covertData(course) }))
    }
    destroy(req, res, next) {
        KhoaHoc.deleteOne({ _id: req.params.id })
            .then((course) => res.redirect('back'))
    }
    reStore(req, res, next) {
        KhoaHoc.restore({ _id: req.params.id })
            .then((course) => res.redirect('back'))

    }
}

export const { create, upload, table, deledSoft, actionSelect, detail, destroy, fixCourse, update, trash, reStore } = new showControllers