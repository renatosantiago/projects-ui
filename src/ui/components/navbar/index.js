import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-2">
        <span className="navbar-brand ms-3"><h3>My Brand</h3></span>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Projetos
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <NavLink to="/projeto/cadastrar" className="nav-item nav-link" activeClassName='active'>
                  Cadastrar Projeto
                </NavLink>
                <NavLink to="/projeto/listar" className="nav-item nav-link" activeClassName='active'>
                  Listar
                </NavLink>
                <NavLink to="/projeto/cadastrar/integrante" className="nav-item nav-link" activeClassName='active'>
                  Novo Integrante
                </NavLink>
              </div>
            </li>
            <li className="nav-item">
              <NavLink to="/projeto/cadastrar/pessoa" className="nav-link">
                Cadastrar Pessoa
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;