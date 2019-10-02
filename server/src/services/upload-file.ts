import * as aws from 'aws-sdk'
import * as multer from 'multer'
import * as multerS3 from 'multer-s3'

const s3 = new aws.S3()

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false)
  }
}

export const initialAWS = () => {
  aws.config.update({
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: process.env.AWS_RESGION,
  })
}

export const UploadImageS3 = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3,
    bucket: process.env.S3_BUCKET,
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function(req, file, cb) {
      const newFileName = Date.now() + '-' + file.originalname
      const fullPath = `user-upload/${newFileName}`
      cb(null, fullPath)
    },
  }),
})
