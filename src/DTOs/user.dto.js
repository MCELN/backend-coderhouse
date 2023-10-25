const cartServices = require('../services/carts.service');

class UserDto {
    constructor(userInfo) {
        this.first_name = userInfo.first_name;
        this.last_name = userInfo.last_name;
        this.email = userInfo.email;
        this.age = userInfo.age;
        this.password = userInfo.password;
        this.role = userInfo.role || 'user';
        this.status = userInfo.status || true;
    };
};

module.exports = UserDto;