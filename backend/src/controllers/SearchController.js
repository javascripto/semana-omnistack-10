const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

class SearchController {
  static async index(request, response) {
    const _10Km = 10000;
    const { latitude, longitude, techs } = request.query;
    const techsArray = parseStringAsArray(techs);

    const devs = Dev.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: _10Km
        },
      }
    });

    return response.json({ devs });
  }
}

module.exports = SearchController;
