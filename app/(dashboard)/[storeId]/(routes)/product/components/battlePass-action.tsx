"use client";
import React, { useState } from "react";
import { ProductColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface BattlePassActionProps {
  data: ProductColumn;
}

const formSchema = z.object({
  battle_pass: z.boolean().default(false).optional(),
});

type BattlePassFormValues = z.infer<typeof formSchema>;

const BattlePassAction = ({ data }: BattlePassActionProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<BattlePassFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      battle_pass: false,
    },
  });

  const params = useParams();
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setLoading(true);
      // console.log(data)
      const numericPrice = parseInt(data.price.replace(/\D/g, ""), 10);
      const updatedData = { ...data, isBattlePass: !data.isBattlePass,price:numericPrice,isBattlePassUpdate:true };

      await axios.patch(
        `/api/${params.storeId}/product/${data.id}`,
        updatedData
      );

      router.refresh();
      toast.success("Product updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          {
            data.isBattlePass ? (
            <Button disabled={loading} type="submit" variant="destructive">
              Active
            </Button>
            ) : (
            <Button disabled={loading} type="submit">
              Inactive
            </Button>
            )
          }
        </form>
      </Form>
    </>
  );
};

export default BattlePassAction;
