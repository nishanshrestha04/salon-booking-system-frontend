import { ServiceList, ServiceForm } from '../components/services';
import { useServices } from '../hooks';

export default function ServicesPage() {
  const { services, isLoading, addService, removeService } = useServices();

  return (
    <div className="w-full space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-primary mb-2">Services Management</h2>
        <p className="text-muted-foreground font-medium">Add and manage available salon services.</p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-[1fr_2fr] items-start">
        <ServiceForm onServiceAdded={addService} />
        <ServiceList 
          services={services} 
          isLoading={isLoading} 
          onServiceDeleted={removeService} 
        />
      </div>
    </div>
  );
}
