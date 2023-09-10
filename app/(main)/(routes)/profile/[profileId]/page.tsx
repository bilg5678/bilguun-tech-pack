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
import { Avatar } from "@/components/avatar";
import axios from "axios";
type Props = {
  params: {
    profileId: string;
  };
};
async function getProfile(id: string) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_AWS_BASE_URL}/getProfile?id=${id}`,
  );
  return res.data?.data?.profile;
}
export default async function ProfilePage({ params }: Props) {
  const profile: Profile = await getProfile(params.profileId);
  return (
    <Card className="w-[350px] z-[120]">
      <CardHeader>
        <Avatar thumbnail={profile?.thumbnail} />
        <CardTitle>Сайн уу</CardTitle>
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
    </Card>
  );
}
