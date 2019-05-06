const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')

module.exports = (

    function protected(req, res, next) {
        const { username, password } = req.headers
        if (username && password) {
            Users.findBy({ username })
                .first()
                .then(user => {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        next()
                    } else {
                        res.status(400).json({
                            error: "You're not logged in."
                        })
                    }
                })
        } else {
            res.status(500).json({
                error: "Something went wrong on the back end."
            })
        }
    }

)
