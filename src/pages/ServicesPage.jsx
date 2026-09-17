import { useState } from 'react';
import { ServiceList, ServiceForm } from '../components/services';
import { useServices } from '../hooks';

export default function ServicesPage() {
  const { services, isLoading, addService, editService, removeService } = useServices();
  const [editingService, setEditingService] = useState(null);

  const handleEditComplete = async (id, data) => {
    const res = await editService(id, data);
    if (!res.error) {
      setEditingService(null);
    }
    return res;
  };

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Services Management</h2>
        <p className="text-muted-foreground font-medium">Add and manage available salon services.</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] items-start">
        <ServiceForm 
          onServiceAdded={addService} 
          editingService={editingService}
          onServiceUpdated={handleEditComplete}
          onCancelEdit={() => setEditingService(null)}
        />
        <ServiceList 
          services={services} 
          isLoading={isLoading} 
          onServiceDeleted={removeService} 
          onEditService={(service) => setEditingService(service)}
        />
      </div>
    </div>
  );
}
