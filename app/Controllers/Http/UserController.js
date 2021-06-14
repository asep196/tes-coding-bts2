'use strict'
const User = use('App/Models/User')

class UserController {
    async store({request, response, auth}){
        let data = request.only(['username', 'email', 'password', 'phone', 'country', 'city', 'postcode', 'name', 'address'])
        await User.create(data)
        let token = await auth.attempt(data.email, data.password)
        response.header('Content-type', 'application/json')
        response.header('Status-Code', 200)
        return response.json({
            email : data.email,
            token : token,
            username : data.username
        })
    }
    async show({request, response, auth}){
        let data = request.only(['email', 'password'])
        let token = await auth.attempt(data.email, data.password)
        let user = await User.query().where('email', data.email).first()
        response.header('Content-type', 'application/json')
        response.header('Status-Code', 200)
        return response.json({
            email : data.email,
            token : token,
            username : user.username
        })
    }
    async index({response, auth}){
        let data = await User.all()
        return response.send(data)
    }
}

module.exports = UserController
