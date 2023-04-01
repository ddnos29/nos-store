import { BrandModel } from '../models/brand.model';
import { BadRequestError } from '../exceptions/error.response';
export const brandServices = {
    createBrand: async ({ name }) => {
        const foundBrand = await BrandModel.findOne({ name });
        if (foundBrand) {
            throw new BadRequestError('Thương hiệu đã tồn tại');
        }
        const newBrand = await BrandModel.create({ name });

        return newBrand;
    },

    updateBrand: async (id, { name }) => {
        const brand = await BrandModel.findOne({ name });
        if (brand && brand._id != id) {
            throw new BadRequestError('Thương hiệu đã tồn tại');
        }

        const updatedBrand = await BrandModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                name,
            }
        );

        if (!updatedBrand) {
            throw new BadRequestError('Không tìm thấy thương hiệu');
        }

        return updatedBrand;
    },

    deleteBrand: async (id) => {
        const brand = await BrandModel.deleteOne({ _id: id });
        if (brand?.deletedCount === 0) {
            throw new BadRequestError('Không tìm thấy thương hiệu');
        }

        return brand;
    },

    getAllBrand: async () => {
        const brands = await BrandModel.find();
        return brands;
    },
};
