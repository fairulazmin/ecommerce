"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { formatCurrency } from "@/lib/formatters";
import { addProduct } from "../../_actions/products";

const productFormSchema = z.object({
  name: z.string().min(2),
  priceInCents: z.coerce.number().int().min(1),
  file: z.instanceof(File).refine((file) => file.size > 0, "Required"),
  image: z
    .instanceof(File)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"))
    .refine((file) => file.size > 0, "Required"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

const defaultValues: Partial<ProductFormValues> = {
  name: "",
  priceInCents: 0,
};

export const ProductForm = () => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: ProductFormValues) => {
    const result = await addProduct(JSON.stringify(values));
    // const result = await addProduct(values);
    console.log(result);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceInCents"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price in Cents</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>
                {formatCurrency((field.value || 0) / 100)}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  // accept="application/pdf"
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};
