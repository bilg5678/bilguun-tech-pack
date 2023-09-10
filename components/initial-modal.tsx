"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
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
import { Stepper } from "./stepper";
import { useModal } from "@/hook/useModal";
import { ProfileInfo } from "./profile-info";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { BUCKET_NAME, IDENTITY_CARD_PATH, SELFIE_PATH } from "@/constant";
import { Label } from "./ui/label";
const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const Modal = useModal();
  const steps = [
    { label: "Иргэний үнэмлэхний зураг таньж байна" },
    { label: "Селфи зураг таньж байна" },
    { label: "Таны мэдээллийг шүүн ялгаж байна" },
  ];
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
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    const images: Array<File> = Object.values(values);
    const id = uuidv4();
    await uploadFile(
      {
        folderPath: IDENTITY_CARD_PATH,
        bucketName: BUCKET_NAME,
        contentType: "image/jpeg",
        id,
      },
      images[0],
    );
    setActiveStep(1);
    await uploadFile(
      {
        folderPath: SELFIE_PATH,
        bucketName: BUCKET_NAME,
        contentType: "image/jpeg",
        id,
      },
      images[1],
    );
    setActiveStep(2);
    try {
      const getResultInfo = await axios.post(
        process.env.NEXT_PUBLIC_AWS_BASE_URL + "/getResult",
        {
          sourcePath: `identityCard/${id}.${images[0].type.split("/")[1]}`,
          targetPath: `selfie/${id}.${images[1].type.split("/")[1]}`,
        },
      );
      toast.success("Амжилттай");
      Modal.close();
      Modal.show(<ProfileInfo profile={getResultInfo.data.data} />);
    } catch (err: any) {
      Modal.close();
      toast.error("Та зураг шалгах үед алдаа гарлаа зургаа нягтална уу");
    }
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex justify-center items-center">
      <Card className="w-5/6 md:w-[500px]">
        <CardContent className="bg-white text-black p-0 overflow-hidden">
          <CardHeader className="pt-8 px-6">
            <CardTitle className="text-2xl ext-center font-bold">
              Бүртгүүлэх
            </CardTitle>
            <CardDescription className="text-center text-zinc-500">
              Та иргэний үнэмлэх болон selfie зураг оруулснаар таны бүртгэл
              үүсэх юм.
            </CardDescription>
          </CardHeader>
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
                            isLoading={isLoading}
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
                            isLoading={isLoading}
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
              <CardFooter className="bg-gray-100 px-6 py-4">
                {isLoading ? (
                  <div className="flex justify-center items-center flex-col">
                    <Label>Та түр хүлээнэ үү</Label>
                    <Stepper steps={steps} activeStep={activeStep} />
                  </div>
                ) : (
                  <Button disabled={isLoading}>Create</Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InitialModal;
