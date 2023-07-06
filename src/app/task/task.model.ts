export interface TaskModel {
  id: number,
  title: string,
  description: string,
  storyPoints: number,
  iterationId?: number | null,
  projectId?: number,
  bContainerPos: number,
  iContainerPos: number,
  status: {
    status: string
  }
}

export interface TaskDisplayContainer {
  title: string,
  data: Array<{
    content: TaskModel,
    disabled: boolean
  }>
}

export interface TaskSuccess {
  tasks: Array<TaskModel>
}

export interface TaskPositionItem {
  id: number,
  bContainerPos?: number,
  iContainerPos?: number,
  status: string
}

