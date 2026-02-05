import { useEffect, useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Pencil, Trash2, Upload, Link as LinkIcon, Images, Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { useProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";

export default function Products() {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [uploadMode, setUploadMode] = useState<"upload" | "url">("upload");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Bulk upload state
  const [isBulkDialogOpen, setIsBulkDialogOpen] = useState(false);
  const [bulkUploading, setBulkUploading] = useState(false);
  const [bulkUploadResults, setBulkUploadResults] = useState<{productId: string; productName: string; status: 'pending' | 'uploading' | 'success' | 'error'; file?: File; error?: string}[]>([]);
  const bulkFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "cafe",
    subcategory: "",
    image_url: "",
    available: true,
    customizable: false,
  });

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, categoryFilter]);

  const filterProducts = () => {
    let filtered = products;

    if (categoryFilter !== "all") {
      filtered = filtered.filter(p => p.category === categoryFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${fileName}`;

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file);

      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      setUploadProgress(100);
      setFormData({ ...formData, image_url: publicUrl });
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error("Failed to upload image: " + error.message);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, ...productData });
    } else {
      createProduct.mutate(productData);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    deleteProduct.mutate(id);
  };

  const openEditDialog = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      price: product.price.toString(),
      category: product.category,
      subcategory: product.subcategory || "",
      image_url: product.image_url || "",
      available: product.available,
      customizable: product.customizable,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "cafe",
      subcategory: "",
      image_url: "",
      available: true,
      customizable: false,
    });
    setUploadMode("upload");
    setUploading(false);
    setUploadProgress(0);
  };

  // Bulk upload functions
  const openBulkUploadDialog = () => {
    const productsWithoutImages = filteredProducts.filter(p => !p.image_url);
    setBulkUploadResults(productsWithoutImages.map(p => ({
      productId: p.id,
      productName: p.name,
      status: 'pending' as const
    })));
    setIsBulkDialogOpen(true);
  };

  const handleBulkFileSelect = (productId: string, file: File | undefined) => {
    setBulkUploadResults(prev => prev.map(item => 
      item.productId === productId 
        ? { ...item, file, status: file ? 'pending' as const : 'pending' as const }
        : item
    ));
  };

  const removeFromBulkUpload = (productId: string) => {
    setBulkUploadResults(prev => prev.filter(item => item.productId !== productId));
  };

  const handleBulkUpload = async () => {
    const itemsToUpload = bulkUploadResults.filter(item => item.file);
    if (itemsToUpload.length === 0) {
      toast.error("Please select at least one image to upload");
      return;
    }

    setBulkUploading(true);

    for (const item of itemsToUpload) {
      if (!item.file) continue;

      // Update status to uploading
      setBulkUploadResults(prev => prev.map(i => 
        i.productId === item.productId ? { ...i, status: 'uploading' as const } : i
      ));

      try {
        const fileExt = item.file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, item.file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        // Update product with new image URL
        await updateProduct.mutateAsync({ id: item.productId, image_url: publicUrl });

        setBulkUploadResults(prev => prev.map(i => 
          i.productId === item.productId ? { ...i, status: 'success' as const } : i
        ));
      } catch (error: any) {
        setBulkUploadResults(prev => prev.map(i => 
          i.productId === item.productId ? { ...i, status: 'error' as const, error: error.message } : i
        ));
      }
    }

    setBulkUploading(false);
    
    const successCount = bulkUploadResults.filter(r => r.status === 'success').length;
    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} image(s)`);
    }
  };

  const closeBulkDialog = () => {
    setIsBulkDialogOpen(false);
    setBulkUploadResults([]);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <p className="text-muted-foreground">Manage your menu items</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={openBulkUploadDialog}>
              <Images className="h-4 w-4 mr-2" />
              Bulk Upload Images
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
                <DialogDescription>
                  {editingProduct ? "Update product details" : "Create a new product in your menu"}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cafe">Café</SelectItem>
                        <SelectItem value="restaurant">Restaurant</SelectItem>
                        <SelectItem value="sweets">Sweets</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Subcategory</Label>
                    <Input
                      value={formData.subcategory}
                      onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                      placeholder="e.g., Coffee, Appetizers"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Product Image</Label>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant={uploadMode === "upload" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUploadMode("upload")}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </Button>
                    <Button
                      type="button"
                      variant={uploadMode === "url" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUploadMode("url")}
                    >
                      <LinkIcon className="w-4 h-4 mr-2" />
                      URL
                    </Button>
                  </div>

                  {uploadMode === "upload" ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Input
                          id="image_upload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={uploading}
                          className="cursor-pointer"
                        />
                      </div>
                      {uploading && (
                        <div className="space-y-1">
                          <Progress value={uploadProgress} className="w-full" />
                          <p className="text-xs text-muted-foreground">Uploading... {uploadProgress}%</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  )}

                  {formData.image_url && (
                    <div className="mt-2">
                      <img
                        src={formData.image_url}
                        alt="Preview"
                        className="w-32 h-32 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.available}
                      onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                    />
                    <Label>Available</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.customizable}
                      onCheckedChange={(checked) => setFormData({ ...formData, customizable: checked })}
                    />
                    <Label>Customizable</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createProduct.isPending || updateProduct.isPending}>
                    {(createProduct.isPending || updateProduct.isPending) ? "Saving..." : editingProduct ? "Update" : "Create"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          </div>
        </div>

        {/* Bulk Upload Dialog */}
        <Dialog open={isBulkDialogOpen} onOpenChange={(open) => {
          if (!open && !bulkUploading) closeBulkDialog();
        }}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Bulk Image Upload</DialogTitle>
              <DialogDescription>
                Upload images for multiple products at once. Products without images are shown below.
              </DialogDescription>
            </DialogHeader>
            
            {bulkUploadResults.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                All products already have images!
              </div>
            ) : (
              <div className="space-y-4">
                <div className="border rounded-lg divide-y max-h-[400px] overflow-y-auto">
                  {bulkUploadResults.map((item) => (
                    <div key={item.productId} className="p-3 flex items-center gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.productName}</p>
                        {item.file && (
                          <p className="text-xs text-muted-foreground truncate">{item.file.name}</p>
                        )}
                        {item.status === 'error' && (
                          <p className="text-xs text-destructive">{item.error}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {item.status === 'success' ? (
                          <div className="flex items-center gap-1 text-green-600">
                            <Check className="h-4 w-4" />
                            <span className="text-sm">Done</span>
                          </div>
                        ) : item.status === 'uploading' ? (
                          <div className="text-sm text-muted-foreground">Uploading...</div>
                        ) : item.status === 'error' ? (
                          <div className="flex items-center gap-1 text-destructive">
                            <X className="h-4 w-4" />
                            <span className="text-sm">Failed</span>
                          </div>
                        ) : (
                          <>
                            <Input
                              type="file"
                              accept="image/*"
                              className="w-48 text-xs cursor-pointer"
                              onChange={(e) => handleBulkFileSelect(item.productId, e.target.files?.[0])}
                              disabled={bulkUploading}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromBulkUpload(item.productId)}
                              disabled={bulkUploading}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {bulkUploadResults.filter(r => r.file).length} of {bulkUploadResults.length} products selected
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={closeBulkDialog} disabled={bulkUploading}>
                      {bulkUploadResults.some(r => r.status === 'success') ? 'Close' : 'Cancel'}
                    </Button>
                    <Button 
                      onClick={handleBulkUpload} 
                      disabled={bulkUploading || !bulkUploadResults.some(r => r.file && r.status === 'pending')}
                    >
                      {bulkUploading ? 'Uploading...' : 'Upload All'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="cafe">Café</SelectItem>
              <SelectItem value="restaurant">Restaurant</SelectItem>
              <SelectItem value="sweets">Sweets</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No products found
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center text-xs text-muted-foreground">
                          No img
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge variant={product.available ? "default" : "secondary"}>
                        {product.available ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(product)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
