import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

type WorseTimeCardProps = {
  previousTime: number | undefined;
  currentTime: number;
  reset: () => void;
};

export function WorseTimeCard({
  previousTime,
  currentTime,
  reset,
}: WorseTimeCardProps) {
  return (
    <Card className="border-primary bg-secondary flex w-[350px] flex-col items-center justify-between shadow-lg shadow-slate-400">
      <CardHeader>
        <CardTitle className="text-slate-700">
          Your didn&apos;t quite beat your previous time!
        </CardTitle>
        <CardDescription className="pt-4">
          Your time was {(currentTime - previousTime!).toFixed(3)} seconds
          slower. Please try again!
        </CardDescription>
      </CardHeader>
      <Button
        className="mb-6 w-[80%]"
        variant={"outline"}
        onClick={() => reset()}
      >
        Restart
      </Button>
    </Card>
  );
}
