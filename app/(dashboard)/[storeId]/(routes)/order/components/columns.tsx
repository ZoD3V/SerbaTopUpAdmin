"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumn = {
  phone: string;
  amount: string;
  status: string;
  transaction_code: string;
  product: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "product",
    header: "product",
  },
  {
    accessorKey: "phone",
    header: "phone",
  },
  {
    accessorKey: "amount",
    header: "amount",
  },
  {
    accessorKey: "transaction_code",
    header: "transaction code",
  },
  {
    accessorKey: "status",
    header: "status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];
