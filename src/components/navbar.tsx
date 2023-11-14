import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  // simple nav bar component

  // logout function here
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth)
      .then((success) => {
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>
          Chat Box
        </a>
        <button onClick={logOut}>Logout</button>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
      </div>
    </nav>
  );
};
export default NavBar;
