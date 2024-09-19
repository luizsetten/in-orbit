import { CheckCircle2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { DialogTrigger } from "./ui/dialog";
import { InOrbitIcon } from "./in-orbit-icon";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../http/get-summary";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";
import { PendingGoals } from "./pending-goals";

dayjs.locale(ptBR);

export const Summary = () => {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  const firstDayOfWeek = dayjs().startOf("week").format("D MMM");
  const lastDayOfWeek = dayjs().endOf("week").format("D MMM");
  const completedPercentage = data
    ? Math.round((data?.completed * 100) / data?.total)
    : 100;
  return (
    <div className="py-10 max-w-[480px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {`${firstDayOfWeek} - ${lastDayOfWeek}`}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={data?.completed} max={data?.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{data?.completed ?? 0}</span> de{" "}
            <span className="text-zinc-100">{data?.total ?? 0}</span> meta
            {data && data.total > 1 ? "s" : ""}
            nessa semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>
      <Separator />

      <PendingGoals />

      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {data &&
          Object.entries(data?.goalsPerDay).map(([key, value]) => {
            const parsedWeekDay = dayjs(key).format("dddd");
            const parsedDate = dayjs(key).format("D [de] MMMM");
            return (
              <div className="flex flex-col gap-4" key={key}>
                <h3 className="font-medium ">
                  <span className="capitalize">{parsedWeekDay} </span>
                  <span className="text-zinc-400 text-xs">({parsedDate})</span>
                </h3>

                <ul className="flex flex-col gap-3">
                  {value.map((goal) => (
                    <li className="flex items-center gap-2" key={goal.id}>
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{" "}
                        <span className="text-zinc-100">
                          {dayjs(goal.completedAt).format("HH:mm[h]")}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
};
