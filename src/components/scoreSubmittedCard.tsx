import { type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";

type LeaderboardCardProps = {
  previousTime: number | undefined;
  currentTime: number;
  nickname: string;
  setNickname: (nickname: string) => void;
  userId: string;
  setScoreUpdated: (scoreUpdated: boolean) => void;
};

export function SubmitScoreCard({
  previousTime,
  currentTime,
  nickname,
  setNickname,
  userId,
  setScoreUpdated,
}: LeaderboardCardProps) {
  const { mutate: setScore, isPending } =
    api.leaderboard.setScore.useMutation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId) {
      return;
    }
    setScoreUpdated(true);
    setScore({
      userId: userId,
      time: currentTime,
      nickname: nickname,
    });
  }

  return (
    <Card className="border-primary bg-secondary w-[350px] shadow-lg shadow-slate-400">
      <CardHeader>
        <CardTitle className="text-slate-700">
          {previousTime
            ? "Update your time on the leaderboard!"
            : "Add your time on the leaderboard!"}
        </CardTitle>
        <CardDescription>
          {previousTime &&
            `You beat your previous time by ${(
              previousTime - currentTime
            ).toFixed(3)} seocnds!`}
        </CardDescription>
      </CardHeader>
      <form onSubmit={(e) => void handleSubmit(e)}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex">
          <Button
            type="submit"
            className="w-full"
            variant="outline"
            disabled={isPending}
          >
            {isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
