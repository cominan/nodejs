import express from 'express';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/routes.js';
import bodyParser from 'body-parser'
import methodOveride from 'method-override'
import sort from './app/middleware/sort.js';


const app = express()
mongoose.connect('mongodb://localhost:27017/KhoaHoc')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(methodOveride('_method'))


app.engine('hbs', engine({
    extname: '.hbs',
    helpers: {
        sum(a, b) { return a + b },
        renderIcon(field, sort) {
            let isSort = field === sort.column ? sort.type : 'default'
            const icons = {
                default: 'swap-vertical-outline',
                desc: 'arrow-down-outline',
                asc: 'arrow-up-outline',
            }
            const types = {
                default: 'desc',
                desc: 'asc',
                asc: 'desc'
            }
            const icon = icons[isSort]
            const type = types[isSort]

            return `<a href="?_sort&column=${field}&type=${type}">
            <ion-icon name=${icon}></ion-icon>
        </a>`
        }
    }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resoure/views'))

app.use(sort)

routes(app)
app.listen(3000)