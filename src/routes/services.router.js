
import { Router } from 'express';
import ServiceManager from '../managers/ServiceManager.js';

const router = Router();
const serviceManager = new ServiceManager();

// GET /api/services
// Devuelve todos los servicios y permite aplicar filtros.
router.get('/', (req, res) => {
  const { category, available } = req.query;

  let availableFilter;

  if (available !== undefined) {
    if (available !== 'true' && available !== 'false') {
      return res.status(400).json({
        error: 'El filtro available debe ser true o false.'
      });
    }

    availableFilter = available === 'true';
  }

  const filters = { category };

  if (availableFilter !== undefined) {
    filters.available = availableFilter;
  }

  const services = serviceManager.getAll(filters);

  return res.status(200).json({
    total: services.length,
    services
  });
});

// GET /api/services/:sid
// Busca un servicio por su ID.
router.get('/:sid', (req, res) => {
  const { sid } = req.params;
  const service = serviceManager.getById(sid);

  if (!service) {
    return res.status(404).json({
      error: 'Servicio no encontrado.'
    });
  }

  return res.status(200).json(service);
});

// POST /api/services
// Crea un servicio con un ID generado internamente.
router.post('/', (req, res) => {
  const service = serviceManager.create(req.body ?? {});

  if (!service) {
    return res.status(400).json({
      error: 'Datos inválidos. Se requieren name, category, description, price y available con tipos válidos.'
    });
  }

  return res.status(201).json({
    message: 'Servicio creado correctamente.',
    service
  });
});

// PUT /api/services/:sid
// Actualiza un servicio existente sin cambiar su ID.
router.put('/:sid', (req, res) => {
  const { sid } = req.params;
  const service = serviceManager.update(sid, req.body ?? {});

  if (!service) {
    const exists = serviceManager.getById(sid);

    if (!exists) {
      return res.status(404).json({
        error: 'Servicio no encontrado.'
      });
    }

    return res.status(400).json({
      error: 'Datos inválidos. Verifica los campos y sus tipos.'
    });
  }

  return res.status(200).json({
    message: 'Servicio actualizado correctamente.',
    service
  });
});

// DELETE /api/services/:sid
// Elimina un servicio existente.
router.delete('/:sid', (req, res) => {
  const { sid } = req.params;
  const service = serviceManager.delete(sid);

  if (!service) {
    return res.status(404).json({
      error: 'Servicio no encontrado.'
    });
  }

  return res.status(200).json({
    message: 'Servicio eliminado correctamente.',
    service
  });
});

export default router;
