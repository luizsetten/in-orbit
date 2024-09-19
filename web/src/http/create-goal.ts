export type CreateGoalRequest = {
  title: string
  desiredWeeklyFrequency: number
}

export const createGoal = async ({
  desiredWeeklyFrequency,
  title,
}: CreateGoalRequest) => {
  await fetch('http://localhost:3333/goals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, desiredWeeklyFrequency }),
  })
}
