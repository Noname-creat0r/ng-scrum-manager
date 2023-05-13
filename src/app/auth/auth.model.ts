export interface SignUpModel {
  email: string,
  password: string,
  name: string
}

export interface SignInModel {
  email: string,
  password: string
}

export interface AuthSuccess {
  token: string,
  userId: string
}
