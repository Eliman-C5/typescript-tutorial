//Una interface es como el contrato que debe tener un objeto
export interface Sub {
  nick: string
  subMonths: number
  avatar: string
  description?: string
}

export type SubsRespondFromApi =  Array<{
  nick: string,
  months: number,
  profileUrl: string,
  description: string
}>