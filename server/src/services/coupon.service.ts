import { CouponModel } from '../models/coupon.model';
import { BadRequestError } from '../exceptions/error.response';
export const couponService = {
    createCoupon: async ({ name, code, percent, amount, expireDate }) => {
        const coupon = await CouponModel.create({
            name,
            code,
            percent,
            amount,
            expireDate,
        });
        return coupon;
    },
    // can't update code
    updateCoupon: async (id, { name, percent, amount, expireDate }) => {
        const coupon = await CouponModel.findByIdAndUpdate(id, {
            name,
            percent,
            amount,
            expireDate,
        });
        return coupon;
    },
    deleteCoupon: async (id) => {
        const deletedCoupon = await CouponModel.findByIdAndDelete(id);
        return deletedCoupon;
    },
    disabledCoupon: async (id) => {
        const disabledCoupon = await CouponModel.findByIdAndUpdate(id, {
            status: false,
        });
        return disabledCoupon;
    },
    getAllCoupon: async () => {
        const coupons = await CouponModel.find({ status: true });
        return coupons;
    },
    getCouponById: async (id) => {
        const conpon = await CouponModel.findById(id);
        return conpon;
    },
    useCoupon: async (code) => {
        const coupon = await CouponModel.findOne({ code });
        if (!coupon) {
            throw new BadRequestError('Mã giảm giá không tồn tại');
        }
        if (coupon.amount > 0) {
            coupon.amount -= 1;
        } else {
            throw new BadRequestError('Mã giảm giá đã hết lượt sử dụng');
        }

        if (coupon.expireDate < new Date()) {
            throw new BadRequestError('Mã giảm giá đã hết hạn');
        }

        await coupon.save();
        return coupon;
    },
};
