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
      <div className="card-columns projeto-card-container">
        {
          projetos.map((projeto) => <ProjetoCard projeto={projeto} onDelete={getProjetos} key={projeto.id}/>)
        }
      </div>
    </div>
  );
}
export default ProjetoList;
