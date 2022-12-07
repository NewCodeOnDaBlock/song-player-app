import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic } from '@fortawesome/free-solid-svg-icons';

const Nav = ({libraryStat, setLibraryStat}) => {

  const toggleLibrary = () => {
    console.log('toggleLibrary triggered');
    setLibraryStat(!libraryStat)
  }

  return (
    <div className='nav-container'>
      <h1>Raden's Song Player</h1>
      <button onClick={toggleLibrary}>
        Library<span></span>
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  )
}

export default Nav
