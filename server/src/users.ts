import { Request, Response } from 'express'
import { Users } from './dbConnection'
const { ObjectId } = require('mongodb')

export const getUsers = async (req: Request, res: Response) => {
  try {
    const {
      name = '',
      type = '',
      active = false,
      page = '1',
      limit = '10',
    } = req.query

    const pageNumber = parseInt(`${page}`, 10)
    const limitNumber = parseInt(`${limit}`, 10)

    const query = {
      name: { $regex: name, $options: 'i' },
      type: { $regex: type, $options: 'i' },
    } as any

    if (active === 'true') {
      query.active = true
    }

    const users = await Users.find(query)
      .sort({ name: 1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
    const total = await Users.countDocuments({})

    res.json({
      total,
      page: pageNumber,
      limit: limitNumber,
      data: users,
    })
  } catch (err) {
    console.error('Error fetching users:', err)
    res.status(500).json({ error: (err as any).message })
  }
}

export const patchUser = async (req: Request<any>, res: Response<any>) => {
  try {
    const id = req.params.id
    const updateData = req.body

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: `Invalid user ID-${id}` })
    }

    const updatedUser = await Users.findByIdAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { returnDocument: 'after' }
    )

    if (!updatedUser) {
      return res
        .status(404)
        .json({ error: `User not found ID-${id}, updateDate-${updateData}` })
    }

    res
      .status(200)
      .json({ message: 'User patch successfully', data: updatedUser })
  } catch (err) {
    console.error(`Error patching user:`, err)
    res
      .status(500)
      .json({ error: `Error patching user: ${(err as any).message}` })
  }
}
