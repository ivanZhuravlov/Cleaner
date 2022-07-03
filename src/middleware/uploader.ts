import { Request } from 'express';
import multer from 'multer';
import moment from 'moment';

const storage = multer.diskStorage({
  destination(req: Request, file: any, cb: Function) {
    cb(null, 'src/uploads/')
  },
  filename(req: Request, file: any, cb: Function) {
    const date = moment().format('DDMMYYYY-HHmmss_SSS')
    cb(null, `${date}-${file.originalname}`)
  },
})

const fileFilter = (req: Request, file: any, cb: Function) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/gif') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const limits = {
  fileSize: 1024 * 1024 * 5,
}

export default multer({ storage, fileFilter, limits })