import { useState, useEffect, useCallback } from 'react';
import { fetchServices, createService, deleteService } from '../api';

export function useServices() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadServices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const res = await fetchServices();
    if (res.error) {
      setError(res.error);
    } else if (res.data) {
      setServices(Array.isArray(res.data) ? res.data : (res.data.results || []));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const addService = async (serviceData) => {
    const res = await createService(serviceData);
    if (!res.error) {
      await loadServices();
    }
    return res;
  };

  const removeService = async (id) => {
    const res = await deleteService(id);
    if (!res.error) {
      await loadServices();
    }
    return res;
  };

  return {
    services,
    isLoading,
    error,
    loadServices,
    addService,
    removeService
  };
}
