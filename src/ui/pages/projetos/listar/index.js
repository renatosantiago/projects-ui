import { useCallback, useEffect, useState } from "react";
import { requestBackend } from "../../../../util/requests";
import ProjetoCard from "../detalhe";
import './style.css';

const ProjetoList = () => {
  const [projetos, setProjetos] = useState([])

  const getProjetos = useCallback(() => {
    const config = {
      method: 'GET',
      url: '/projeto/listar',
    };

    requestBackend(config).then((response) => {
      setProjetos(response.data);
    });
  }, []);

  useEffect(() => {
    getProjetos();
  }, [getProjetos]);


  return (
    <div className="container">
      <div className="mt-3 ms-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Projetos</li>
            <li className="breadcrumb-item active" aria-current="page">Listar</li>
          </ol>
        </nav>
      </div>
      <div className="card-columns projeto-card-container">
        {
          projetos.map((projeto) => <ProjetoCard projeto={projeto} onDelete={getProjetos} key={projeto.id}/>)
        }
      </div>
    </div>
  );
}
export default ProjetoList;
