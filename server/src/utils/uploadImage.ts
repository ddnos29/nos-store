import axios from 'axios';
import FormData from 'form-data';
import { BadRequestError } from '../exceptions/error.response';

export const uploadImage = async (file: any) => {
    try {
        const formData = new FormData();
        formData.append('image', file.buffer.toString('base64'));
        const response = await axios.post(`${process.env.IMGBB_URL}?key=${process.env.IMGBB_APIKEY}`, formData);

        return {
            image_name: response.data.data.title,
            image_url: response.data.data.url,
            delete_url: response.data.data.delete_url,
        };
    } catch (error) {
        console.log(error);
        throw new BadRequestError('Có lỗi xảy ra trong quá trình upload ảnh, vui lòng kiểm tra lại ảnh ');
    }
};
