import { faCopyright, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type SocialChannelLink = {
  title: string
  link: string
  icon: IconDefinition
}

export type Props = {
  socialChannels: SocialChannelLink[]
}

const Footer: React.FC<Props> = ({ socialChannels }) => {
  return (
    <footer className="flex flex-row flex-grow items-end bg-green-100 justify-between border-t-2 border-solid border-green-800 border-opacity-20">
      <div className="p-5">
        <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} Quincy
      </div>
      <div className="flex flex-row space-x-3 text-3xl text-green-900 p-5">
        {socialChannels.map((channel) => (
          <a
            className="hover:text-green-500"
            href={channel.link}
            title={channel.title}
          >
            <FontAwesomeIcon icon={channel.icon} />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
