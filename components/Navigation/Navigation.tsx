import Link from 'next/link'

type MenuItem = {
  title: string
  link: string
}

export type Props = {
  menu: MenuItem[]
}

const Navigation: React.FC<Props> = ({ menu = [] }) => (
  <header className="w-full bg-white">
    <nav>
      {menu.map((item) => (
        <Link href={item.link}>{item.title}</Link>
      ))}
    </nav>
  </header>
)

export default Navigation
