import { NavLink } from "react-router-dom";


const NavBar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mt-2">
        <div className="container-fluid">
          <span className="navbar-brand ms-3"><h3>My Brand</h3></span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Projetos
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink to="/projeto/cadastrar" className="dropdown-item" activeClassName='active'>
                      Cadastrar Projeto
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/projeto/listar" className="dropdown-item" activeClassName='active'>
                      Listar
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <NavLink to="/projeto/cadastrar/integrante" className="dropdown-item" activeClassName='active'>
                      Novo Integrante
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/projeto/cadastrar/pessoa" className="nav-link" activeClassName='active'>
                  Cadastrar Pessoa
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;