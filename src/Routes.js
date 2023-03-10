import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./ui/components/navbar";
import PessoaForm from "./ui/pages/pessoa";
import EditarProjeto from "./ui/pages/projetos/editar/editar-projeto";
import ProjetoList from "./ui/pages/projetos/listar";
import ProjetoForm from "./ui/pages/projetos/cadastrar/projeto-form";
import IntegrantesProjetosList from "./ui/pages/projetos/integrante/cadastrar";

const Routes = () => {
  return (
    <BrowserRouter>
    <NavBar />
    <Switch>
        <Route path="/projeto/cadastrar" exact>
          <ProjetoForm />
        </Route>
        <Route path="/projeto/editar/:idProjeto" exact>
          <EditarProjeto />
        </Route>
        <Route path="/projeto/listar">
          <ProjetoList/>
        </Route>
        <Route path="/projeto/cadastrar/integrante" exact>
          <IntegrantesProjetosList/>
        </Route>
        <Route path="/projeto/cadastrar/pessoa">
          <PessoaForm/>
        </Route>
    </Switch>
  </BrowserRouter>
  );
};

export default Routes;