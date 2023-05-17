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
  }
}

export interface ProjectSuccess {
  message?: string,
  projects: Array<ProjectModel>
}
