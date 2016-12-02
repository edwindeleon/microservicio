const { parse } = require('url');
const scrapper = require('./lib/scrapper.js');

const EXAMPLE_URL = 'https://micro-platzi-profile.now.sh?username=some-user-name';

module.exports = async request => {
  // parseamos la url para obtener la query (los parámetros que llegan como `?algo=valor`)
  const { query } = parse(request.url, true);

  // si no se envió un `username` vamos a devolver un error 400
  if (!query.username) {
    // creamos el objeto de erro y definimos una propiedad `statusCode`
    const error = new ReferenceError(
      `You must query for a specific username using a URL like ${EXAMPLE_URL}.`
    );
    error.statusCode = 400;
    throw error;
  }

  // en caso contrario, vamos a ejecutar el scrapper con el username recibido
  // y devolver la respuesta
  return await scrapper(query.username);
};

//url https://microservicio-opewjsfkja.now.sh/?username=