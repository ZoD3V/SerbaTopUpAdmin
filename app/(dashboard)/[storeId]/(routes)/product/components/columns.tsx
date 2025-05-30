"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import StatusAction from "./status-action";
import FeaturedItemAction from "./featuredItem-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string;
  name: string;
  isFeatured: boolean;
  status: boolean;
  category: string;
  size: string;
  color: string;
  price: string;
  createdAt: string;
  categoryId: string;
  sizeId: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "isFeatured",
    header: "Feature Item",
    cell: ({ row }) => <FeaturedItemAction data={row.original} />,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusAction data={row.original} />,
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
