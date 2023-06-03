export interface TaskModel {
  title: string,
  description: string,
  storyPoints: number,
  iterationId: number,
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

