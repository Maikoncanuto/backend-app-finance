'use strict'

const User = user('App/Models/User');

class UserController {

    index() {
        const users = await User.all();
        return  users;
    }

    show({ params }) {
        const user = await User.findOrFail(params.id);
        return user;
    }
}

module.exports = UserController
