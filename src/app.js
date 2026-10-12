
import express from 'express';
import servicesRouter from './routes/services.router.js';

const app = express();

// Permite recibir y procesar cuerpos JSON.
app.use(express.json());

// Ruta de bienvenida.
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API REST del Sistema Backend de Turnos y Reservas',
    endpoints: '/api/services'
  });
});

// Rutas del recurso services.
app.use('/api/services', servicesRouter);

// Manejo de rutas inexistentes.
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada.'
  });
});

// Manejo de JSON malformado y otros errores.
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'El cuerpo de la petición contiene JSON inválido.'
    });
  }

  console.error(err);

  return res.status(500).json({
    error: 'Error interno del servidor.'
  });
});

export default app;
