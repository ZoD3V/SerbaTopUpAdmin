import Navbar from "@/components/Navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getStoreByIdAndUserId } from "@prisma/client/sql";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  
  const store = await prismadb.$queryRawTyped(
    getStoreByIdAndUserId(params.storeId, userId)
  );

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />

      {children}
    </>
  );
}
