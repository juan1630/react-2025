// https://github.com/Klerith/bolt-product-editor
import { Navigate, useNavigate, useParams } from "react-router";
import { useProduct } from "@/admin/hooks/useProduct";
import { CustomFullScreenLoading } from "@/components/ui/custom/CustomFullScreenLoading";

import type { Product } from "@/interfaces/product.interface";
import { toast } from "sonner";
import { ProductForm } from "./ui/productForm";

export const AdminProductPage = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  const { data: product, isLoading, isError, mutation } = useProduct(id || "");

  const title = id === "new" ? "Nuevo producto" : "Editar producto";
  const subtitle =
    id === "new"
      ? "Aquí puedes crear un nuevo producto."
      : "Aquí puedes editar el producto.";


  const handleSubmit = async(productLike: Partial<Product> & {files?:File[]} ) => {

    console.log({productLike})

    await mutation.mutateAsync(productLike, {
      onSuccess:(data) => {
        toast.success('Producto actualizado', { position: 'top-right' })
        navigate(`/admin/products/${data.id}`)
      },
      onError:(error => {
        console.log(error)
        toast.error('Error al actualizar el producto')
      })
    })
  }

  if (isLoading) {
    return <CustomFullScreenLoading />;
  }

  if (isError) {
    return <Navigate to="/admin/products" />;
  }

  return <ProductForm title={title} subTitle={subtitle} product={product}  onSubmit={handleSubmit} isPosting={mutation.isPending} />;
};
