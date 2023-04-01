import multer from 'multer';

export const upload = multer({}).array('images', 10);
