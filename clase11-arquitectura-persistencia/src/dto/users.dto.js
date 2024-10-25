class UserDto {
    constructor(user){
        this.first_name = user.first_name,
        this.last_name  = user.last_name,
        this.fullName   = `${first_name} ${last_name}`
        this.email      = user.email,
        this.password   = user.password

    }
}

module.exports = UserDto 

// edad -> fecha de nacimiento