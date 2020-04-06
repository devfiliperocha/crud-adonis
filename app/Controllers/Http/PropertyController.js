'use strict'
const path = require('path')
const Property = use('App/Models/Property')
const Upload = use('App/Helpers/Upload')
const fs = require('fs')
const Helpers = use('Helpers')
const Env = use('Env')
const paramsExpected = [
  'name',
  'propietary',
  'country',
  'state',
  'city',
  'district',
  'street',
  'postal_code',
  'house_number',
  'complement',
  'latitude',
  'longitude',
  'image',
]

class PropertyController {

  async index({
    response
  }) {
    try {
      const properties = await Property.all()
      return response.status(200).json({
        success: true,
        data: properties.toJSON().map(p => {
          p.image_url = `${Env.get('EXTERNAL_APP_URL')}/images/${p.image}`
          return p
        })
      })
    } catch (err) {
      return response.status(400).json({
        success: false,
        data: err.message
      })
    }
  }
  async show({
    params,
    response
  }) {
    try {
      const property = await Property.findOrFail(params.id)
      property.image_url = `${Env.get('EXTERNAL_APP_URL')}/images/${property.image}`
      return response.status(200).json({
        success: true,
        data: property
      })
    } catch (err) {
      return response.status(400).json({
        success: false,
        data: err.message
      })
    }
  }

  async store({
    request,
    response
  }) {
    try {
      const data = request.only(paramsExpected)
      const photo = request.file('image', {
        types: ['image'],
        size: '5mb'
      })
      if (!photo) {
        return response.status(400).json({
          success: false,
          data: "Favor selecionar uma imagem"
        })
      }

      const propertyCreate = await Property.create(data)
      const property = await Property.findOrFail(propertyCreate.id)

      const uploadPhoto = await Upload.uploadPhoto(photo, propertyCreate.id)
      if(uploadPhoto.success){
        property.merge({image: uploadPhoto.photoName})
        property.save()

        return response.status(200).json({
          success: true,
          data: propertyCreate
        })
      }else{
        property.delete()
        return response.status(400).json({
          success: false,
          data: uploadPhoto.error
        })
      }
    } catch (err) {
      return response.status(400).json({
        success: false,
        data: err.message
      })
    }
  }
  async update({
    params,
    request,
    response
  }) {
    
    try {
      const property = await Property.findOrFail(params.id)
      let dataToMerge = request.only(paramsExpected)

      const photo = request.file('image', {
        types: ['image'],
        size: '5mb'
      })
      if (photo) {
        
        const uploadPhoto = await Upload.uploadPhoto(photo, property.id, property.image)
        if(uploadPhoto.success){
          dataToMerge.image = uploadPhoto.photoName
        }else{
          return response.status(400).json({
            success: false,
            data: uploadPhoto.error
          })
        }
      }

     
      property.merge(dataToMerge)
      const save = property.save()
      
      return response.status(200).json({
        success: true,
        data: save
      })
    } catch (err) {
      return response.status(400).json({
        success: false,
        data: err.message
      })
    }
  }

  async destroy({
    params,
    response
  }) {
    try {
      const property = await Property.findOrFail(params.id)
      const oldPhoto = path.join(Helpers.publicPath('images'), property.image)
      if(fs.existsSync(oldPhoto)){
        fs.unlinkSync(oldPhoto)
      }
      const remove = await property.delete()
      return response.status(200).json({
        success: true,
        data: remove
      })
    } catch (err) {
      return response.status(400).json({
        success: false,
        data: err.message
      })
    }
  }
}

module.exports = PropertyController
