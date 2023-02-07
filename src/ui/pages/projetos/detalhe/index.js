import { Link } from "react-router-dom";
import { requestBackend } from "../../../../util/requests";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";
import "./style.css";

const ProjetoCard = ({ projeto, onDelete }) => {

  const handleDelete = (idProjeto) => {

    if (!window.confirm("Tem certeza que deseja deletar?")) {
      return;
    }

    const config = {
      method: 'DELETE',
      url: `/projeto/${idProjeto}`,
    };

    requestBackend(config).then(() => {
      onDelete();
    }).catch((error) => {
      toast.error(error.response.data.message, { theme: "colored" });
      console.log(error.response.data.message);
    });;
  };

  return (


    <div className="col-3 mr-1">
      <div className={`card mt-3`}>
        <div className="card-body">
          <h5 className="card-title">{projeto.nome}</h5>
          <div className="projeto-card-container">
              <h6 className="card-subtitle mb-2 text-muted">{projeto.statusProjeto}</h6>
              <span className="badge rounded-pill text-bg-secondary card-subtitle mb-2 ms-1">{projeto.riscoProjeto}</span>
          </div>
          <p className="card-text">{projeto.descricao}</p>
          <button onClick={() => handleDelete(projeto.id)} className="btn btn-outline-danger me-1">
            Excluir
          </button>
          <Link to={`/projeto/editar/${projeto.id}`} className="btn btn-primary" >Editar</Link>
        </div>
      </div>

    </div>
  );
}

ProjetoCard.propTypes = {
  projeto: PropTypes.object,
  onDelete: PropTypes.func,
};
export default ProjetoCard;