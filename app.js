const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

const studentSchema = require('./models/user')
const facultySchema = require('./models/faculty')
const { PassThrough } = require('stream')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    if (req.cookies.token === '') {
        res.render('index');
    } else {
        res.redirect('/home')
    }
})

app.get('/home', (req, res) => {
    let token = req.cookies.token
    let femail = jwt.verify(token, 'mail')
    res.render('home', { femail })
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.post('/create', async (req, res) => {
    const { fname, femail, fclass, fpass } = req.body

    let checkMail = await facultySchema.findOne({ femail })
    if (!checkMail) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(fpass, salt, async (err, hash) => {
                const faculty = await facultySchema.create({ fname, femail, fclass, fpass: hash })
                let token = jwt.sign(femail, 'mail');
                res.cookie('token', token);
                res.redirect('/home')
            })
        })
    } else {
        res.redirect('/login')
    }
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', async (req, res) => {
    const { femail, fpass } = req.body;

    let user = await facultySchema.findOne({ femail })
    if (user != null) {
        bcrypt.compare(fpass, user.fpass, (err, result) => {
            if (result) {
                let token = jwt.sign(femail, 'mail');
                res.cookie('token', token)
                res.redirect('/home');
            } else {
                res.redirect('/login')
            }
        })
    } else {
        res.redirect('/signup')
    }
})

app.get('/logout', (req, res) => {
    res.cookie('token', '')
    res.redirect('/')
})

app.get('/allstudents', async (req, res) => {
    let token = req.cookies.token
    let femail = jwt.verify(token, 'mail')
    let allstudents = await studentSchema.find()
    res.render('allstudents', { allstudents, femail })
})

app.get('/add', (req, res) => {
    let token = req.cookies.token
    let femail = jwt.verify(token, 'mail')
    res.render('add', { femail })
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
    let token = req.cookies.token
    let femail = jwt.verify(token, 'mail')
    res.render('edit', { editedStudent, femail })
})

app.post('/update/:id', async (req, res) => {
    const { name, classdropdown, rollno } = req.body

    let updatedStudent = await studentSchema.findOneAndUpdate({ _id: req.params.id }, { name, class: classdropdown, rollno }, { new: true })
    let token = req.cookies.token
    let femail = jwt.verify(token, 'mail')
    res.redirect('/allstudents', { femail })
})

app.listen(3000, () => {
    console.log('app running on port 3000')
})