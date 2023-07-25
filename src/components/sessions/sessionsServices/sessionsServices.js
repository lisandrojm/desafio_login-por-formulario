/* ************************************************************************** */
/* /src/components/sessions/sessionsServices/sessionsServices.js - servicio de sessions. */
/* ************************************************************************** */

/* Definir la clase SessionServices */
class SessionsServices {
  getUserSession = async (req, res) => {
    try {
      const userData = req.session.user || {}; // Si la propiedad 'user' no existe, establecerla como un objeto vacío
      return { success: true, user: userData, title: 'Perfil', style: 'index.css' };
    } catch (error) {
      return { success: false, error: 'Error en Handlebars getUserSession' };
    }
  };
  getAdminSession = async (req, res) => {
    try {
      let userData = req.session.user || {}; // If the 'user' property does not exist, set it as an empty object

      // If userData is a string (e.g., 'adminCoder@coder.com'), convert it to an object
      if (typeof userData === 'string') {
        userData = { email: userData };
      }

      // Set an 'isAdmin' property in the userData object to indicate if it is an administrator or not
      userData.isAdmin = req.session.admin || false;

      // Add logs here
      console.log('isAdmin:', userData.isAdmin);
      console.log('user:', userData);

      return { success: true, user: userData, title: 'Dashboard', style: 'index.css' };
    } catch (error) {
      console.log(error);
      return { success: false, error: 'Error in Handlebars getAdminSession' };
    }
  };

  /* Levantar session */
  getSession = async (req, res) => {
    try {
      if (req.session.counter) {
        req.session.counter++;
        /* Enviar una respuesta exitosa con el mensaje y contador de visitas */
        return res.status(200).json({ success: true, message: `Se ha visitado el sitio ${req.session.counter} veces.` });
      } else {
        /* Inicializar el contador de visitas y enviar una respuesta exitosa de bienvenida */
        req.session.counter = 1;
        return res.status(200).json({ success: true, message: 'Bienvenido!' });
      }
    } catch (error) {
      /* Manejar el error y enviar una respuesta con el código de estado apropiado */
      return res.status(500).json({ success: false, error: 'Error en getSession al obtener la session' });
    }
  };

  /* Eliminar datos de session */
  deleteSession = async (req, res) => {
    try {
      req.session.destroy((err) => {
        if (!err) {
          return res.status(200).json({ success: true, message: 'Logout Ok!' });
        } else {
          return res.status(500).json({ success: false, error: 'Logout ERROR', body: err });
        }
      });
    } catch (error) {
      /* Manejar el error y enviar una respuesta con el código de estado apropiado */
      return res.status(500).json({ success: false, error: 'Error en deleteSession al eliminar la session' });
    }
  };
}

/* Exportar una instancia de la clase 'AuthServices' */
module.exports = new SessionsServices();
