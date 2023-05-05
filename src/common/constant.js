export const USER_ACTIVE = {
  deleted: 0,
  ACTIVE: 1,
};

export const CONFIG_END_DATE = "23:59:59.999";

export const CACHE_TIME = 60 * 5;

export const TOKEN_EXPIRES = 60 * 5;

export const THROW_ERR_MES = {
  UNAUTHORIZED: "Không có quyền truy cập",
  ACCOUNT_EXIST: "Số điện thoại đã được đăng ký",
  ACCOUNT_NOTFOUND: "Không tìm thấy tài khoản",
  WRONG_PASSWORD: "Sai mật khẩu",
  DEPARTMENT_NOTFOUND: "Không tìm thấy phòng ban",
  WRONG_CONFIRM_PASSWORD: "Mật khẩu xác nhận không chính xác",
  DOCTOR_DAYOFF_NOTFOUND: "Không tìm thấy lịch nghỉ của bác sĩ",
  DOCTOR_DAYOFF_STATUS_CONFLICT: "Không thể cập nhật trạng thái hiện tại",
  EMAIL_CONFLICT: "Email đã được sử dụng",
  CODE_CONFLICT: "Mã bị trùng",
};

export const USER_SEX = {
  MALE: 0,
  FEMALE: 1,
};

export const USER_TYPE = {
  ADMIN: "admin",
  CUSTOMER: "customer",
};

export const COMMON_STATUS = {
  ACTIVE: "active",
  DELETED: "deleted",
};
