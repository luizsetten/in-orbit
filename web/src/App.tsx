import { Dialog } from "./components/ui/dialog";

import { CreateGoal } from "./components/create-goal";
import { Summary } from "./components/summary";
import { EmptyGoals } from "./components/empty-gaols";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "./http/get-summary";

export const App = () => {
  const { data } = useQuery({
    queryKey: ["summary"],
    queryFn: getSummary,
    staleTime: 1000 * 60,
  });

  return (
    <Dialog>
      {data && data.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  );
};

export default App;
