"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FileUpload } from "./file-upload";
import { registerSchema } from "@/lib/zodSchema/schemas";
import { uploadFile } from "@/lib/backend";
import { v4 as uuidv4 } from "uuid";
const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      identityCard: "",
      selfie: "",
    },
  });
  const isLoading = form.formState.isLoading;
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const images: Array<File> = Object.values(values);
    const id = uuidv4();
    const identityCardRes = await uploadFile(
      {
        folderPath: "identityCard/",
        bucketName: "bilguun-tech-bucket",
        contentType: "image/jpeg",
        id,
      },
      images[0],
    );
    const selfieUploadRes = await uploadFile(
      {
        folderPath: "selfie/",
        bucketName: "bilguun-tech-bucket",
        contentType: "image/jpeg",
        id,
      },
      images[0],
    );
    const getResultInfo = await axios.post(
      process.env.NEXT_PUBLIC_AWS_BASE_URL + "/getResult",
      {
        sourcePath: `identityCard/${id}.${images[0].type.split("/")[1]}`,
        targetPath: `selfie/${id}.${images[1].type.split("/")[1]}`,
      },
    );
    console.log(getResultInfo.data.data);
  };
  if (!isMounted) {
    return null;
  }
  return (
    <Dialog open>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl ext-center font-bold">
            Бүртгүүлэх
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Та иргэний үнэмлэх болон selfie зураг оруулснаар таны бүртгэл үүсэх
            юм.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="identityCard"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Иргэний үнэмлэхний зураг
                      </FormLabel>

                      <FormControl>
                        <FileUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="selfie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Селфи зураг
                      </FormLabel>
                      <FormControl>
                        <FileUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isLoading}>Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InitialModal;
