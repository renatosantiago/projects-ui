import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import { requestBackend } from "../../../../util/requests";

const IntegrantesProjetosList = () => {

  const [projetos, setProjetos] = useState([]);
  const [pessoas, setPessoas] = useState([]);

  const { control, handleSubmit, formState: { errors } } = useForm({
  });


  useEffect(() => {
    requestBackend({ url: '/membros/projetos' }).then((response) => {
      console.log(response.data);
      setProjetos(response.data.projetos);
      setPessoas(response.data.membros);
    });
  }, []);

  const onSubmit = (formData) => {
    console.log('submit');
    console.log(formData);
    const data = {
      idProjeto: Number(formData.projeto.id),
      idPessoa: Number(formData.pessoa.id),
    };


    const config = {
      method: 'POST',
      url: '/membros',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.success('Integrante cadastrado com sucesso', {theme: "colored"});
      })
      .catch(() => {
        toast.error('Erro ao cadastrar Integrante', {theme: "colored"})
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-5 mt-3">
            <label htmlFor="projeto">Projeto</label>
            <Controller
              name="projeto"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={projetos}
                  getOptionLabel={(projeto) => projeto.nome}
                  getOptionValue={(projeto) => String(projeto.id)}
                  inputId="projeto"
                />
              )}
            />
          </div>
          <div className="col-5 mt-3">
            <label htmlFor="pessoa">Integrante</label>
            <Controller
              name="pessoa"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={pessoas}
                  getOptionLabel={(pessoa) => pessoa.nome}
                  getOptionValue={(pessoa) => String(pessoa.id)}
                  inputId="pessoa"
                />
              )}
            />
          </div>
          <div className="col-2 mt-4">
            <button type="submit" className="btn btn-primary mt-3">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>

  );
}
export default IntegrantesProjetosList;