import React, { useEffect, useState } from 'react'
import { Checkbox, Form, Table } from 'antd'
import type { TableProps } from 'antd'
import { useUser } from '@auth0/nextjs-auth0/client'
import { notifyUser } from '@/components/notifyUser'
import {
  UserTypeSelectionFormItem,
  UserTypeListComponent,
} from '@/components/userType'
import { getUsers, UserClient, userUpdate } from '@/services/users'
import { getAccessToken } from '@/services/accessToken'
import {
  UsersListActionsEdit,
  UsersListActionsEditable,
} from './usersListButtons'

export const UsersList: React.FC<{
  filter: { userName: string; userType: string; active: boolean }
}> = ({ filter }) => {
  const { user, isLoading } = useUser()
  const [accessToken, setAccessToken] = useState<string | undefined>()
  const [editRecordKey, setEditRecordKey] = useState<string | undefined>()
  const [tableData, setTableData] = useState<UserClient[]>([])
  const [pageSize, setPageSize] = useState(10)
  const [form] = Form.useForm()

  useEffect(() => {
    if (!isLoading && user) {
      getAccessToken().then((accessToken) => {
        if (accessToken) {
          setAccessToken(accessToken)
        }
      })
    }
  }, [user, isLoading])

  useEffect(() => {
    if (accessToken) {
      getUsers(filter, accessToken).then((response) =>
        response.success === true
          ? setTableData(response.dataList || [])
          : notifyUser({
              status: 'error',
              message: 'Error fetching users',
              description: `error: ${response.serverError} message: ${response.message}`,
            })
      )
    }
  }, [accessToken, filter])

  const handleConfirmClicked = (
    id: string,
    updatedData: Partial<UserClient>
  ) => {
    userUpdate(id, updatedData).then((response) => {
      if (response.success) {
        const newTableData = tableData.map((record: UserClient) => {
          if (record.key === id) {
            return { ...record, ...response.data }
          }
          return record
        })
        setTableData([...newTableData])

        notifyUser({
          status: 'success',
          message: 'User updated successfully',
        })
      } else {
        notifyUser({
          status: 'error',
          message: 'Error Updating User',
          description: `error: ${response.serverError} message: ${response.message}`,
        })
      }
    })
    return setEditRecordKey(undefined)
  }

  const handleEditClicked = (record: UserClient) => {
    form.setFieldsValue({
      userType: record.userType,
      active: record.active,
    })
    return setEditRecordKey(record.key)
  }

  const columns: TableProps<UserClient>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: 'Type',
      dataIndex: 'userType',
      key: 'userType',
      render: (value: string, rec: UserClient) =>
        rec.key === editRecordKey ? (
          <UserTypeSelectionFormItem />
        ) : (
          <UserTypeListComponent value={value} />
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
      render: (value: boolean, rec: UserClient) =>
        rec.key === editRecordKey ? (
          <Form.Item
            name="active"
            valuePropName="checked"
            style={{ marginBottom: 0 }}
          >
            <Checkbox defaultChecked={rec.active} />
          </Form.Item>
        ) : (
          <Checkbox checked={value} disabled />
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'actions',
      render: (_: unknown, rec: UserClient) =>
        editRecordKey ? (
          editRecordKey === rec.key ? (
            <UsersListActionsEditable
              onCancelClicked={() => setEditRecordKey(undefined)}
              onConfirmClicked={() =>
                handleConfirmClicked(rec.key, form.getFieldsValue())
              }
            />
          ) : null
        ) : (
          <UsersListActionsEdit onEditClicked={() => handleEditClicked(rec)} />
        ),
    },
  ]

  return (
    <Form form={form} component={false}>
      <Table<UserClient>
        columns={columns}
        dataSource={tableData}
        size="middle"
        pagination={{
          onChange: () => {
            setEditRecordKey(undefined)
          },
          pageSize,
          position: ['topRight', 'bottomRight'],
          showSizeChanger: true,
          onShowSizeChange: (_c: number, newSize: number) => {
            setEditRecordKey(undefined)
            setPageSize(newSize)
          },
          showTotal: (total) => `Total ${total} items`,
        }}
      />
    </Form>
  )
}
