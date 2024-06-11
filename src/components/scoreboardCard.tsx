import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type Score } from "@prisma/client";

type ScoreboardCardProps = {
  fasterTimes: Score[];
  slowerTimes: Score[];
  currentTime: number;
  rank: number;
  userId: string;
};

export function ScoreboardCard({
  fasterTimes,
  slowerTimes,
  currentTime,
  rank,
  userId,
}: ScoreboardCardProps) {
  return (
    <Card className="border-primary bg-secondary w-[350px] shadow-lg shadow-slate-400">
      <CardHeader>
        <CardTitle className="text-slate-700">
          Check out your position on the leaderboard!
        </CardTitle>
        <CardDescription>
          You are currently rank {rank} in the world!{" "}
          {!userId && "Sign in to save your score!"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center">
          <div className="flex flex-col space-y-1.5 overflow-hidden">
            <p>Times:</p>
            <ol>
              {fasterTimes?.map((score, index) => (
                <li key={index}>
                  {rank - Math.abs(index - fasterTimes.length)}. {score.time}{" "}
                  {score.nickname}
                </li>
              ))}
              <li className="text-[#A4AC96]">
                {rank}. {currentTime} Your High Score
              </li>
              {slowerTimes?.map((score, index) => (
                <li key={index}>
                  {rank + (index + 1)}. {score.time} {score.nickname}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
