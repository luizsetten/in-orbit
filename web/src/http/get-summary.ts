export type SummaryResponse = {
  completed: number
  total: number
  goalsPerDay: GoalsPerDay
}

type GoalsPerDay = Record<
  string,
  {
    id: string
    title: string
    completedAt: Date
  }[]
>

export const getSummary = async (): Promise<SummaryResponse> => {
  const resp = await fetch('http://localhost:3333/summary')
  const data = await resp.json()
  return data.summary
}
