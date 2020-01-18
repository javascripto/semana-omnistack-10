const axios = require('axios');
const Dev = require('../models/Dev');

class DevController {
  static async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  }
  
  static async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
  
    let dev = await Dev.findOne({ github_username });
  
    if (!dev) {
      const userInfoURL = `https://api.github.com/users/${github_username}`;
      const { name = login, avatar_url, bio } = (await axios.get(userInfoURL)).data;
    
      dev = await Dev.create({
        bio,
        name,
        techs,
        avatar_url,
        github_username,
        location: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
      });
    }

    return response.json(dev);
  }
}

module.exports = DevController;
