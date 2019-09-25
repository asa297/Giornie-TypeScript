export interface OrganizationFormBody {
  orgType: {
    id: number
    label: string
    value: any
  }
  orgName: string
  orgComA: number
  orgComB?: number
  orgCode: string
}
