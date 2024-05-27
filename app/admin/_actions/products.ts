"use server";

import { ProductFormValues } from "../products/_components/product-form";

export const addProduct = async (values: any) => {
  console.log(values);
  return { status: "success" };
};
