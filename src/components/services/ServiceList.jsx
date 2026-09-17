import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

export default function ServiceList({ services, isLoading, onServiceDeleted }) {
  
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      if (onServiceDeleted) await onServiceDeleted(id);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-primary font-medium animate-pulse">Loading services...</div>;
  }

  if (!services || services.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center text-muted-foreground font-medium">
          No services available. Add one using the form.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {services.map((service) => (
        <Card key={service.id} className="flex flex-col border-l-4 border-l-secondary hover:bg-muted/10 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-foreground">{service.name}</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-2">
            <p className="text-primary font-bold text-xl">NPR {service.price}</p>
            <p className="text-sm text-muted-foreground font-medium mt-1">Duration: {service.duration} mins</p>
          </CardContent>
          <CardFooter className="pt-2 flex justify-end border-t mt-auto bg-muted/20 p-2">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => handleDelete(service.id)}
              className="h-8"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
