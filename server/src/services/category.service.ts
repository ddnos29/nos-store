import { CategoryModel } from '../models/category.model';
import { BadRequestError } from '../exceptions/error.response';

export const categoryServices = {
    createCategory: async ({ name }) => {
        const foundCategory = await CategoryModel.findOne({ name });
        if (foundCategory) {
            throw new BadRequestError('Danh mục sản phẩm đã tồn tại');
        }
        const newCategory = await CategoryModel.create({ name });

        return newCategory;
    },

    updateCategory: async (id, { name }) => {
        const foundCategory = await CategoryModel.findOne({ name });
        if (foundCategory && foundCategory._id != id) {
            throw new BadRequestError('Danh mục sản phẩm đã tồn tại');
        }

        const updatedCategory = await CategoryModel.findOneAndUpdate(
            {
                _id: id,
            },
            {
                name,
            }
        );

        if (!updatedCategory) {
            throw new BadRequestError('Không tìm thấy danh mục sản phẩm');
        }

        return updatedCategory;
    },

    deleteCategory: async (id) => {
        const category = await CategoryModel.deleteOne({ _id: id });

        if (category?.deletedCount === 0) {
            throw new BadRequestError('Không tìm thấy danh mục sản phẩm');
        }

        return category;
    },

    getAllCategory: async () => {
        const categories = await CategoryModel.find();
        return categories;
    },
};
