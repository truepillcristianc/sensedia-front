type User = {
  id: string
  name: string
  email: string
  blocked: boolean
  password?: string
  posts?: Post[]
  albums?: Album[]
}