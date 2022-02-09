import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import '../css/Header.css';
import logoSVG from '../css/logo.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.renderName();
  }

   renderName = async () => {
     const user = await getUser();
     this.setState({
       user: user.name,
       loading: false,
     });
   }

   render() {
     const { user, loading } = this.state;
     if (loading) {
       return <Carregando />;
     }
     return (
       <header data-testid="header-component">
         <div className="title">
           <img src={ logoSVG } alt="" />
           <h2 data-testid="header-user-name">{user}</h2>
         </div>
         <nav className="nav-search">
           <ul>
             <Link
               className="link"
               data-testid="link-to-search"
               to="/search"
             >
               <li>Search</li>

             </Link>

             <Link
               className="link"
               data-testid="link-to-favorites"
               to="/favorites"
             >
               <li>  Favoritos</li>

             </Link>

             <Link
               className="link"
               data-testid="link-to-profile"
               to="/profile"
             >
               <li>Profile</li>

             </Link>
           </ul>
         </nav>
       </header>
     );
   }
}

export default Header;
