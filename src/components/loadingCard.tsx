import { Card } from "@/components/ui/card";

export function LoadingCard() {
  return (
    <Card className="border-primary bg-secondary flex w-[350px] flex-col items-center justify-center shadow-lg shadow-slate-400">
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-800 dark:text-white"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </Card>
  );
}
