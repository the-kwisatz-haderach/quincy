import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SocialChannelLink } from '../../lib/types'

export type Props = {
  socialChannels: SocialChannelLink[]
}

const Footer: React.FC<Props> = ({ socialChannels }) => {
  return (
    <footer className="flex text-white flex-row flex-grow items-end bg-green-600 justify-between border-t-3 border-solid border-green-900 border-opacity-20">
      <div className="p-5">
        <FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()} Quincy
      </div>
      <div className="flex flex-row space-x-3 text-3xl p-5">
        {socialChannels.map((channel) => (
          <a
            key={channel.title}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:text-green-300"
            href={channel.url}
            title={channel.title}
          >
            <FontAwesomeIcon className="animate-enlarge" icon={channel.icon} />
          </a>
        ))}
      </div>
    </footer>
  )
}

export default Footer
