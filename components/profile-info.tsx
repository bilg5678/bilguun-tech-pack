"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useModal } from "@/hook/useModal";
import { Profile } from "@/typing";
import axios from "axios";
import toast from "react-hot-toast";
import { Avatar } from "./avatar";
import { useRouter } from "next/navigation";
import { useState } from "react";
type Props = {
  profile: Profile;
};
export function ProfileInfo({ profile }: Props) {
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onCancel = () => {
    modal.close();
  };

  const onSubmit = async () => {
    setLoading(true);
    try {
      const pro = await axios.post(
        process.env.NEXT_PUBLIC_AWS_BASE_URL + "/createProfile",
        profile,
      );
      toast.success("Амжилттай хэрэглэгч үүслээ");
      modal.close();
      router.push(`profile/${pro.data.data.profile._id}`);
    } catch {
      toast.error("Хэрэглэгч бүртгэгдсэн");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="w-[350px] z-[120]">
      <CardHeader>
        <Avatar thumbnail={profile?.thumbnail} />
        <CardTitle>Сайн уу</CardTitle>
        <CardDescription>
          Таны мэдээлэл үнэн зөв бол Үргэлжүүлэх товч даран бүртгэлээ үүсгээрэй
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Нэр</Label>
            <h1>
              {profile?.lastName} {profile?.firstName}
            </h1>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Регистерийн дугаар</Label>
            <h1>{profile?.registrationNumber}</h1>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Төрсөн он сар</Label>
            <h1>{profile?.birthday}</h1>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button disabled={loading} onClick={onCancel} variant="outline">
          Болих
        </Button>
        <Button disabled={loading} onClick={onSubmit}>
          Үргэлжлүүлэх
        </Button>
      </CardFooter>
    </Card>
  );
}
