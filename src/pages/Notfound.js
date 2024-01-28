import { Link, NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <> 
        <div className='container pt-5 d-flex justify-content-center align-items-center'>
            <div className="notFoundPage">
                <h2>404</h2>
                <p>The page you were looking for does not exists.</p>
                <NavLink to="/">
                    <button className='green pe-3 ps-3'>Go Back to Homepage</button>
                </NavLink>
            </div>
        </div>
      </>
    );
};
  
export default NotFound;