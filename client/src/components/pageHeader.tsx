import Breadcrumb, { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import Link from 'antd/es/typography/Link'

export const PageHeader = ({
  items,
  actionText,
  actionCallback,
}: Readonly<{
  items: ItemType[]
  actionText?: string
  actionCallback?: () => void
}>) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <Breadcrumb
          items={items}
          style={{
            margin: '16px 0',
          }}
        />
      </div>
      <div>
        {actionText && <Link onClick={actionCallback}>{actionText}</Link>}
      </div>
    </div>
  )
}
