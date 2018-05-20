export interface Request{
  _id: string,
  requester: {
    _id: string,
    name: string,
    last_name: string,
    profile_picture: string
  }
  status: string
}
