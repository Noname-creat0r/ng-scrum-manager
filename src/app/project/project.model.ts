import { IterationModel } from "../iteration/iteration.model"

export interface ProjectModel {
  id: number,
  title: string,
  description: string,
  private: boolean,
  tags?: [{
    title: string,
  }],
  authorId?: number,
  author: {
    id: number,
    name: string,
    email: string,
    createdAt: Date,
  },
  iterations?: Array<IterationModel>,
  createdAt: Date,
  updatedAt: Date,
}

export interface ProjectSuccess {
  message?: string,
  projects: Array<ProjectModel>
}
