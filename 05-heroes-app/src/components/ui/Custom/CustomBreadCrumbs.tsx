import { SlashIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../breadcrumb";
import { Link } from "react-router";

interface breadCrumb {
  label: string;
  to: string;
}
interface Props {
  currentPage: string;
  breadCrumbs?: breadCrumb[];
}

export const CustomBreadCrumbs = ({ currentPage, breadCrumbs = [] }: Props) => {
  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/"> Inicio </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadCrumbs.map((breadcrumb, index) => (
          <div className="flex items-center" >
            <BreadcrumbItem key={index}>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
              <BreadcrumbLink asChild>
                <Link to={breadcrumb.to}> {breadcrumb.label} </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
        <BreadcrumbItem>
          <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
          <BreadcrumbLink className="text-black">{currentPage} </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
