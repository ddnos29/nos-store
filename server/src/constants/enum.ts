export enum ORDERSTATUS {
    PENDING = 'Đang chờ xử lý',
    DELIVERING = 'Đang giao hàng',
    DELIVERED = 'Đã giao hàng',
    CANCELLED = 'Đã hủy',
    DELIVEREDFAIL = 'Giao hàng thất bại',
    DELETED = 'Đã xóa',
}

export enum PAYMENTSTATUS {
    UNPAID = 'Chưa thanh toán',
    PENDING = 'Đang chờ xử lý',
    PAID = 'Đã thanh toán',
    CANCELLED = 'Đã hủy',
}

export enum PAYMEMTTYPE {
    COD = 'Thanh toán khi nhận hàng',
    TRANSFER = 'Chuyển khoản',
}

export enum ROLE {
    USER = 'USER',
    ADMIN = 'ADMIN',
    CUSTOMER = 'CUSTOMER',
}

export enum SIZE {
    S = 'S',
    M = 'M',
    L = 'L',
    XL = 'XL',
    XXL = 'XXL',
}
