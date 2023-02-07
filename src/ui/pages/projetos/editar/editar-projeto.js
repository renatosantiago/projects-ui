import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from "react"
import { requestBackend } from "../../../../util/requests";
import ProjetoForm from "../cadastrar/projeto-form";
import { getDefaultValues } from '../cadastrar/form-helper';

const EditarProjeto = () => {
  const { idProjeto } = useParams();
  const [projeto, setProjeto] = useState({})
  const [isLoading, setIsLoading] = useState();
  
  const getProjeto = useCallback(() => {
    const config = {
      method: 'GET',
      url: `/projeto/${idProjeto}`,
    };

    requestBackend(config).then((response) => {
      console.log(response.data);
      setProjeto(getDefaultValues(response.data));
      setIsLoading(false);
    });
  }, [idProjeto]);

  useEffect(() => {
    setIsLoading(true);
    getProjeto();
  }, [getProjeto]);

  return(
    !isLoading && <ProjetoForm projeto={projeto} />
  );
}

export default EditarProjeto;