'use strict'

class StoreProperty {
  get validateAll () {
    return true
  }
  async fails (errorMessages) {
    return this.ctx.response.send({success: false, data: errorMessages})
  }
  get rules () {
    return {
      name: 'required',
      propietary: 'required',
      country: 'required',
      state: 'required',
      city: 'required',
      district: 'required',
      street: 'required',
      latitude: 'required',
      longitude: 'required',
    }
  }
  get messages () {
    return {
      'name.required': 'Campo Obrigatório.',
      'propietary.required': 'Campo Obrigatório.',
      'country.required': 'Campo Obrigatório.',
      'state.required': 'Campo Obrigatório.',
      'city.required': 'Campo Obrigatório.',
      'district.required': 'Campo Obrigatório.',
      'street.required': 'Campo Obrigatório.',
      'latitude.required': 'Campo Obrigatório.',
      'longitude.required': 'Campo Obrigatório.',
    }
  }
}

module.exports = StoreProperty
