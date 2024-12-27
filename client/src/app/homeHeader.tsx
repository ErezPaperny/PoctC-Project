import { Flex, Image } from 'antd'

export function HomeHeader() {
  return (
    <Flex gap={'30px'} align="center" justify="center">
      <Image src={'/papaBayLogo.svg'} alt="logo" width={'5%'} height={'5%'} />
      <Flex vertical gap={'space-between'}>
        Managing your store its easy
        <br />
        Buying from stores are easiest
      </Flex>
    </Flex>
  )
}
