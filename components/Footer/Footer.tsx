import { faAccusoft } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <footer className="flex flex-row flex-grow items-end bg-green-100 justify-between border-t-2 border-solid border-green-800 border-opacity-20">
      <div className="p-5">© {new Date().getFullYear()} Quincy</div>
      <div className="p-5">
        <FontAwesomeIcon icon={faAccusoft} />
      </div>
    </footer>
  )
}

export default Footer
