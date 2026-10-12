
import app from './app.js';
import { PORT } from './config/env.config.js';

app.listen(PORT, () => {
  console.log('Servidor iniciado correctamente.');
  console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Puerto configurado: ${PORT}`);
  console.log(`API disponible en: http://localhost:${PORT}/api/services`);
});
