const express = require('express')
const app = express()
const path = require('path')

const studentSchema = require('./models/user')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/allstudents', async (req, res) => {
    let allstudents = await studentSchema.find()
    res.render('allstudents', { allstudents })
})

app.get('/add', (req, res) => {
    res.render('add')
})  

app.post('/addnew', async (req, res) => {
    const { name, classdropdown, rollno } = req.body
    // let checkStudent = await studentSchema.findOne({ class: classdropdown, rollno: rollno })
    // if (checkStudent === null) {
        let addStudent = await studentSchema.create({ name: name, class: classdropdown, rollno: rollno })
        // req.flash('success', 'Added Successfully!')
        res.redirect('/add')
    // } else {
        // req.flash('error', `Student with Roll No. ${rollno} & class ${classdropdown} already present`)
        // res.render('/allstudents')
    // }

    // res.('/allstudents')
})

app.get('/delete/:id', async (req, res) => {
    let deletedStudent = await studentSchema.findOneAndDelete({ _id: req.params.id })
    res.redirect('/allstudents')
})

app.get('/edit/:id', async (req, res) => {
    let editedStudent = await studentSchema.findOne({ _id: req.params.id })
    res.render('edit', { editedStudent })
})

app.post('/update/:id', async (req, res) => {
    const { name, classdropdown, rollno } = req.body

    let updatedStudent = await studentSchema.findOneAndUpdate({ _id: req.params.id }, { name, class: classdropdown, rollno }, { new: true })
    res.redirect('/allstudents')
})

app.listen(3000, () => {
    console.log('app running on port 3000')
})