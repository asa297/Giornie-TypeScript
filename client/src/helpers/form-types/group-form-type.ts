export interface GroupFormBody {
  org: {
    id: number
    label: string
    value: any
  }
  groupCode: string
  groupStickerNumber: number
  guideName?: number
  groupRemark?: string
}
