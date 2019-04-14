const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')

const app = Express()
app.use(bodyParser.json())

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images')
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`)
  },
})

const upload = multer({ storage: Storage })

app.post('/api/upload', upload.single("photo"), (req, res) => {
  console.log('file', req.file)
  res.status(200).json({
    message: 'success!',
  })
})

app.listen(3000, () => {
  console.log('App running on http://localhost:3000')
})