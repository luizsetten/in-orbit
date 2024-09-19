import { Check, Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingGoals } from "../http/get-pending.goals";
import { createGoalCompletion } from "../http/create-goal-completion";

export const PendingGoals = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: getPendingGoals,

    staleTime: 1000 * 60, // 5 minutes
  });

  if (!data) return null;

  const handleCompleteGoal = async (goalId: string) => {
    await createGoalCompletion(goalId);

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        const goalCompleted =
          goal.completionCount >= goal.desiredWeeklyFrequency;

        return (
          <OutlineButton
            key={goal.id}
            disabled={goalCompleted}
            onClick={() => handleCompleteGoal(goal.id)}
          >
            {goalCompleted ? (
              <Check className="size-4 text-purple-400" />
            ) : (
              <Plus className="size-4 text-zinc-600" />
            )}
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
};
