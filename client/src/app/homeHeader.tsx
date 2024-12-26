import { Flex, Image, Typography } from 'antd'

export function HomeHeader() {
  const { Paragraph } = Typography

  return (
    <Flex gap={'100px'}>
      <Image src={'/next.svg'} alt="logo" width={'180px'} height={'38px'} />
      <Flex vertical gap={'space-between'}>
        <Paragraph>Managing your store its easy</Paragraph>
        <Paragraph>Buying from stores are easiest</Paragraph>
      </Flex>
    </Flex>
  )
}
