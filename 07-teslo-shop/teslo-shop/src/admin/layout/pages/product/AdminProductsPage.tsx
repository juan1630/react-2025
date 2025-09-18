import { Link } from "react-router";
import { AdminTitle } from "@/admin/components/AdminTitle";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CustomPagination } from "@/components/ui/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { useProducts } from "@/shop/hooks/useProducts";
import { CustomFullScreenLoading } from "@/components/ui/custom/CustomFullScreenLoading";

export const AdminProductsPage = () => {
  const { data, isLoading } = useProducts();

  if(isLoading) return <CustomFullScreenLoading/>

  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subTitle="Acá puedes ver y administrar tus productos"
        />
        <div className="flex justify-end mb-10 gap-4">
          <Link to="/admin/products/new">
            <Button>
              <PlusIcon />
              Nuevo producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white p-10 shadow-xs border-gray-200 mb-10">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Imagen</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.products.map((product, index) => (
            <TableRow key={product.id} >
              <TableCell className="font-medium"> { index +1 }</TableCell>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={product.description}
                  className="w-20 h-20 object-cover rounded-e-md"
                />
              </TableCell>
              <TableCell>
                <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 underline" > {product.title} </Link>
              </TableCell>
              <TableCell> {product.price} </TableCell>
              <TableCell> {product.stock} </TableCell>
              <TableCell> {product.gender} </TableCell>
              <TableCell> {product.sizes.join(', ')} </TableCell>
              <TableCell className="text-right">
                <Link  to={`/admin/products/t-shirt-teslo`}> <PencilIcon/> </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CustomPagination totalPages={data?.pages ?? 0} />
    </>
  );
};
