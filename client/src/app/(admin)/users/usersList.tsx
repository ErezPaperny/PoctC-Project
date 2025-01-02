import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Form, Select, Space, Table, Tooltip } from 'antd'
import type { TableProps } from 'antd'
import axios from 'axios'
import { useUser } from '@auth0/nextjs-auth0/client'
import { CloseOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons'

interface UserDataType {
  key: string
  name: string
  type: string
  moreDetails: string
  active: boolean
}

export const UsersList: React.FC<{
  filter: { name: string; type: string; active: boolean }
}> = ({ filter }) => {
  const { user, isLoading } = useUser()
  const [accessToken, setAccessToken] = useState()
  const [editModeKey, setEditModeKey] = useState<string | undefined>()
  const [data, setData] = useState()
  const [pageSize, setPageSize] = useState(10)
  const [form] = Form.useForm()
  const { Option } = Select

  const columns: TableProps<UserDataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (value: string, rec: UserDataType) =>
        rec.key === editModeKey ? (
          <Form.Item name="type" style={{ marginBottom: 0 }}>
            <Select style={{ minWidth: '100px' }}>
              <Option value="admin">Admin</Option>
              <Option value="employee">Employee</Option>
              <Option value="buyer">Buyer</Option>
            </Select>
          </Form.Item>
        ) : (
          value
        ),
    },
    {
      title: 'More Details',
      dataIndex: 'moreDetails',
      key: 'moreDetails',
    },
    {
      title: 'Active',
      key: 'active',
      dataIndex: 'active',
      render: (active: boolean, rec: UserDataType) =>
        rec.key === editModeKey ? (
          <Form.Item
            name="active"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox defaultChecked={rec.active} />
          </Form.Item>
        ) : (
          <Checkbox checked={active} disabled />
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_: unknown, rec: UserDataType) =>
        editModeKey ? (
          editModeKey === rec.key ? (
            <Space>
              <Tooltip title="Confirm Edit">
                <Button
                  shape="circle"
                  icon={<CheckOutlined />}
                  onClick={() => setEditModeKey(undefined)}
                />
              </Tooltip>
              <Tooltip title="Cancel Edit">
                <Button
                  shape="circle"
                  icon={<CloseOutlined />}
                  onClick={() => setEditModeKey(undefined)}
                />
              </Tooltip>
            </Space>
          ) : null
        ) : (
          <Space>
            <Tooltip title="Change User Type">
              <Button
                onClick={() => {
                  form.setFieldsValue({ type: rec.type, active: rec.active })
                  return setEditModeKey(rec.key)
                }}
                shape="circle"
                icon={<EditOutlined />}
              />
            </Tooltip>
          </Space>
        ),
    },
  ]

  useEffect(() => {
    const options = {
      method: 'POST',
      url: 'https://dev-twmpec4n6uralfn2.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || '',
        client_secret: process.env.NEXT_PUBLIC_AUTH0_CLIENT_SECRET || '',
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE || '',
      }),
    }

    if (user && !isLoading) {
      axios.request(options).then((response) => {
        return setAccessToken(response.data.access_token)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading, process.env])

  useEffect(() => {
    if (accessToken) {
      const optionsGet = {
        method: 'GET',
        url: `http://localhost:5000/users?name=${filter.name}&type=${filter.type}&active=${filter.active}&page=1&limit=50`,
        headers: { authorization: `Bearer ${accessToken}` },
      }

      axios.request(optionsGet).then((dataJson) => {
        const data = dataJson.data.data.map(
          (item: {
            _id: string
            name: string
            type?: string
            moreDetails?: string
            active?: string
          }) => {
            return {
              key: item._id,
              name: item.name,
              type: item.type || 'Admin',
              moreDetails: item.moreDetails || '',
              active: item.active,
            }
          }
        )
        setData(data)
      })
    }
  }, [accessToken, filter])

  return (
    <Form form={form} component={false}>
      <Table<UserDataType>
        columns={columns}
        dataSource={data}
        size="middle"
        pagination={{
          onChange: () => {
            setEditModeKey(undefined)
          },
          pageSize,
          position: ['topRight', 'bottomRight'],
          showSizeChanger: true,
          onShowSizeChange: (_c: number, newSize: number) => {
            setEditModeKey(undefined)
            setPageSize(newSize)
          },
        }}
      />
    </Form>
  )
}
