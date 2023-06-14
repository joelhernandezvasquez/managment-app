
import Image from 'next/image';
import mobileHeaderLogo from '../../assets/mobileNavLogo.svg';

const Logo = () => {
  return (
    <Image
    src = {mobileHeaderLogo}
    width={24}
    height={25}
    alt="company logo"
    />
  )
}

export default Logo