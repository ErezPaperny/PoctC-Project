import axios from 'axios'

interface UserServer {
  _id: string
  name: string
  type: string
  active: boolean
}

interface ResponseClient {
  success: boolean
  serverError?: number
  message?: string
  data?: UserClient
  dataList?: UserClient[]
}

export interface UserClient {
  key: string
  userName: string
  userType: string
  moreDetails?: string
  active: boolean
}

const serverToClientUser = (user: UserServer): UserClient => ({
  key: user._id,
  userName: user.name,
  userType: user.type,
  active: user.active,
})

const clientToServerUser = (
  user: Partial<UserClient>
): Partial<UserServer> => ({
  _id: user.key,
  name: user.userName,
  type: user.userType,
  active: user.active,
})

const handleCatchError = (error: unknown): ResponseClient => {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      serverError: error.response?.status || 0,
      message: error.response?.data || error.message,
    }
  } else {
    return {
      success: false,
      serverError: 0,
      message: error as string,
    }
  }
}

export const getUsers = async (
  { userName, userType, active }: Partial<UserClient>,
  accessToken: string
): Promise<ResponseClient> => {
  try {
    if (accessToken) {
      const optionsGet = {
        method: 'GET',
        url: `http://localhost:5000/users?name=${userName}&type=${userType}&active=${active}&page=1&limit=100`,
        headers: { authorization: `Bearer ${accessToken}` },
      }

      const dataJson = await axios.request(optionsGet)
      const dataList = dataJson.data.data.map((item: UserServer) =>
        serverToClientUser(item)
      )

      return { success: true, dataList }
    } else {
      return { success: false, serverError: 0, message: 'No accessToken' }
    }
  } catch (error) {
    return handleCatchError(error)
  }
}

export const userUpdate = async (
  id: string,
  updatedData: Partial<UserClient>
): Promise<ResponseClient> => {
  try {
    const serverData = clientToServerUser(updatedData)

    const response = await axios.patch(
      `http://localhost:5000/user/${id}`,
      serverData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = serverToClientUser(response.data.data)

    return { success: true, data }
  } catch (error) {
    return handleCatchError(error)
  }
}
