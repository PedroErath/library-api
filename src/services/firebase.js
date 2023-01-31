const admin = require("firebase-admin")
const serviceAccount = require("../config/library-api-firebase-admin.json")

const bucket = 'library-api-1e3eb.appspot.com'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: bucket
})

const Bucket = admin.storage().bucket()

const uploadImage = async (req, res, next) => {
    if (!req.file) return next()

    const image = req.file

    if(image.mimetype !== 'image/jpg' && image.mimetype !== 'image/png' && image.mimetype !== 'image/jpeg'){
        req.body.error = 'Files must have jpeg, jpg or png extensions'
        return next()
    }

    const nameParts = image.originalname.split('.')
    const fileName = `${new Date().getTime()}.${nameParts[nameParts.length - 1]}`
    const refPath = `books/${fileName}`

    const file = Bucket.file(refPath)
    const stream = file.createWriteStream({
        metadata: {
            contentType: image.mimetype
        }
    })

    stream.on('error', (e) => {
        req.body.error = e
        next()
    })

    stream.on('finish', async () => {
        await file.makePublic()
        req.body.imageURL = `https://storage.googleapis.com/${bucket}/${refPath}`
        next()
    })
    
    stream.end(image.buffer)
}

module.exports = uploadImage