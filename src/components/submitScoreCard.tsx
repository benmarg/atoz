import { useState, type FormEvent } from "react";

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
  reset: () => void;
};

export function SubmitScoreCard({
  previousTime,
  currentTime,
  nickname,
  setNickname,
  userId,
  reset,
}: LeaderboardCardProps) {
  const setScore = api.leaderboard.setScore.useMutation();
  const [scoreUpdated, setScoreUpdated] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!userId) {
      return;
    }
    setScoreUpdated(true);
    await setScore.mutateAsync({
      userId: userId,
      time: currentTime,
      nickname: nickname,
    });
  }

  if (scoreUpdated) {
    return (
      <Card className="border-primary bg-secondary flex w-[350px] items-center justify-center shadow-lg shadow-slate-400">
        <CardHeader className="text-center">
          <CardTitle className="text-black">Submitted!</CardTitle>
          <CardDescription className="pb-4">
            Your time has been submitted to the leaderboard!
          </CardDescription>
          <Button onClick={() => reset()} variant={"outline"}>
            Restart
          </Button>
        </CardHeader>
      </Card>
    );
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
          <Button type="submit" className="w-full" variant="outline">
            {setScore.isPending ? "Submitting..." : "Submit"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
