
class ServiceManager {
  constructor() {
    this.services = [
      {
        id: "1",
        name: "Consulta médica",
        category: "salud",
        description: "Consulta general de salud",
        price: 15000,
        available: true
      },
      {
        id: "2",
        name: "Corte de cabello",
        category: "belleza",
        description: "Servicio de peluquería",
        price: 8000,
        available: true
      },
      {
        id: "3",
        name: "Mantención de vehículo",
        category: "automotriz",
        description: "Mantención preventiva",
        price: 45000,
        available: false
      }
    ];

    this.nextId = 4;
  }

  getAll(filters = {}) {
    let result = [...this.services];

    if (filters.category) {
      result = result.filter(
        service =>
          service.category.toLowerCase() ===
          filters.category.toLowerCase()
      );
    }

    if (filters.available !== undefined) {
      result = result.filter(
        service => service.available === filters.available
      );
    }

    return result;
  }

  getById(id) {
    return this.services.find(service => service.id === String(id));
  }

  create(data) {
    const { name, category, description, price, available } = data;

    if (
      typeof name !== "string" ||
      !name.trim() ||
      typeof category !== "string" ||
      !category.trim() ||
      typeof description !== "string" ||
      !description.trim() ||
      typeof price !== "number" ||
      !Number.isFinite(price) ||
      price < 0 ||
      typeof available !== "boolean"
    ) {
      return null;
    }

    const service = {
      id: String(this.nextId++),
      name: name.trim(),
      category: category.trim(),
      description: description.trim(),
      price,
      available
    };

    this.services.push(service);
    return service;
  }

  update(id, data) {
    const index = this.services.findIndex(
      service => service.id === String(id)
    );

    if (index === -1) {
      return null;
    }

    const current = this.services[index];
    const { id: ignoredId, ...changes } = data;

    const updated = {
      ...current,
      ...changes,
      id: current.id
    };

    if (
      typeof updated.name !== "string" ||
      !updated.name.trim() ||
      typeof updated.category !== "string" ||
      !updated.category.trim() ||
      typeof updated.description !== "string" ||
      !updated.description.trim() ||
      typeof updated.price !== "number" ||
      !Number.isFinite(updated.price) ||
      updated.price < 0 ||
      typeof updated.available !== "boolean"
    ) {
      return null;
    }

    updated.name = updated.name.trim();
    updated.category = updated.category.trim();
    updated.description = updated.description.trim();

    this.services[index] = updated;
    return updated;
  }

  delete(id) {
    const index = this.services.findIndex(
      service => service.id === String(id)
    );

    if (index === -1) {
      return null;
    }

    const [deletedService] = this.services.splice(index, 1);
    return deletedService;
  }
}

export default ServiceManager;
