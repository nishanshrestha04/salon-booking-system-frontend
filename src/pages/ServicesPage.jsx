import { ServiceList, ServiceForm } from '../components/services';

export default function ServicesPage() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Services Management</h2>
      <ServiceForm />
      <ServiceList />
    </div>
  );
}
