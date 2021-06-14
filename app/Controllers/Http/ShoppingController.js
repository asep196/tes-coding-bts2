'use strict'
const Shopping = use('App/Models/Shopping')

class ShoppingController {
  async store({request, response}){
    let data = request.only(['name', 'createddate'])
    let store = await Shopping.create(data)
    response.header('Content-type', 'application/json')
    response.header('Status-Code', 200)
    return response.send(store)
  }
  async index({request, response, auth}){
    let data = await Shopping.all()
    response.header('Content-type', 'application/json')
    response.header('Status-Code', 200)
    return response.send(data)
  }
  async show({request, response, auth, params}){
    let data = await Shopping.find(params.id)
    response.header('Content-type', 'application/json')
    response.header('Status-Code', 200)
    return response.send(data)
  }
  async destroy({request, response, auth, params}){
    let data = await Shopping.find(params.id)
    data.delete()
    return response.json({
      msg : 'Hapus berhasil'
    })
  }
  async update({request, response, auth, params}){
    let data_update = request.only(['name', 'createddate'])
    let data = await Shopping.find(params.id)
    data.name = data_update.name
    await data.save()
    return response.send(data)
  }
}

module.exports = ShoppingController
