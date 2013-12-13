/**
 * Vendor
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

      name: {
          type: 'string',
          required: true
      },

      address1: {
          type: 'string',
          required: true
      },

      address2: {
          type: 'string'
      },

      city: {
          type: 'string',
          required: true
      },

      state: {
          type: 'string',
          required: true
      },

      postalCode: {
          type: 'string',
          required: true
      }



  	/* e.g.
  	nickname: 'string'
  	*/
    
  }

};
