import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';

export default function ServiceList({ services, isLoading, onServiceDeleted, onEditService }) {
  const [serviceToDelete, setServiceToDelete] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  
  const confirmDelete = async () => {
    setDeleteError(null);
    if (serviceToDelete && onServiceDeleted) {
      const res = await onServiceDeleted(serviceToDelete.id);
      if (res && res.error) {
        setDeleteError(res.error);
      } else {
        setServiceToDelete(null);
      }
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
          <CardFooter className="pt-2 flex justify-end gap-2 border-t mt-auto bg-muted/20 p-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onEditService && onEditService(service)}
              className="flex-1 flex items-center justify-center gap-2 font-bold"
            >  
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setServiceToDelete(service)}
              className="flex-1 flex items-center justify-center gap-2 font-bold"
            >  
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
      
      <Dialog open={!!serviceToDelete} onOpenChange={(open) => !open && setServiceToDelete(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-destructive">Delete Service</DialogTitle>
            <DialogDescription className="mt-2 text-muted-foreground">
              Are you sure you want to delete the service <strong className="text-foreground">{serviceToDelete?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <div className="bg-red-50 text-destructive text-sm font-medium p-3 rounded-md border border-red-200 mt-2">
              {deleteError}
            </div>
          )}
          <DialogFooter className="flex sm:justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => { setServiceToDelete(null); setDeleteError(null); }}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDelete}>Yes, Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
