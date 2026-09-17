import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function ServiceForm({ onServiceAdded, editingService, onServiceUpdated, onCancelEdit }) {
  const [formData, setFormData] = useState({ name: '', price: '', duration: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingService) {
      setFormData({
        name: editingService.name,
        price: editingService.price,
        duration: editingService.duration
      });
      setError(null);
    } else {
      setFormData({ name: '', price: '', duration: '' });
    }
  }, [editingService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    const payload = {
      name: formData.name,
      price: Number(formData.price),
      duration: Number(formData.duration)
    };

    if (editingService && onServiceUpdated) {
      const res = await onServiceUpdated(editingService.id, payload);
      if (!res.error) {
        setFormData({ name: '', price: '', duration: '' });
      } else {
        setError(res.error);
      }
    } else if (onServiceAdded) {
      const res = await onServiceAdded(payload);
      if (!res.error) {
        setFormData({ name: '', price: '', duration: '' });
      } else {
        setError(res.error);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <Card className={`border-t-4 ${editingService ? 'border-t-secondary' : 'border-t-primary'}`}>
      <CardHeader className={`${editingService ? 'bg-secondary/5' : 'bg-primary/5'} pb-4 border-b flex flex-row justify-between items-center`}>
        <CardTitle className={editingService ? 'text-secondary-foreground' : 'text-primary'}>
          {editingService ? 'Edit Service' : 'Add New Service'}
        </CardTitle>
        {editingService && (
          <Button variant="ghost" size="sm" onClick={onCancelEdit}>Cancel</Button>
        )}
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-sm text-destructive font-medium">{error}</div>}
          
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground">Service Name</label>
            <Input 
              required 
              placeholder="e.g. Haircut" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Price (NPR)</label>
              <Input 
                required 
                type="text" 
                inputMode="numeric"
                placeholder="500" 
                value={formData.price}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFormData({...formData, price: val});
                }}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Duration (mins)</label>
              <Input 
                required 
                type="text" 
                inputMode="numeric"
                placeholder="30" 
                value={formData.duration}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFormData({...formData, duration: val});
                }}
              />
            </div>
          </div>
          
          <Button type="submit" disabled={isSubmitting} className={`w-full ${editingService ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' : 'bg-primary hover:bg-primary/90'}`}>
            {isSubmitting ? 'Saving...' : (editingService ? 'Update Service' : 'Save Service')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
