import "react-datepicker/dist/react-datepicker.css"
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { requestBackend } from "../../../util/requests";
import ptBR from 'date-fns/locale/pt-BR';
import { toast } from "react-toastify";
import { useEffect } from "react";


const PessoaForm = () => {

  const { register, control, reset, formState, handleSubmit } = useForm()

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, formState.submittedData, reset]);

  const onSubmit = (formData) => {
    console.log(formData);
    const data = {
      ...formData,
    };

    console.log(data);

    const config = {
      method: 'POST',
      url: '/pessoa',
      data,
    };

    requestBackend(config)
      .then(() => {
        reset()
        toast.success('Salvo com sucesso', { theme: "colored" });
      })
      .catch(() => {
        toast.error('Erro ao cadastrar pessoa', { theme: "colored" });
      });
  }


  return (
    <div className="container">
      <div className="mt-3 ms-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Pessoa</li>
            <li className="breadcrumb-item active" aria-current="page">Cadastrar</li>
          </ol>
        </nav>
      </div>
      <div className="base-card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-3">
            <div className="col-6">
              <label htmlFor="nome">Nome</label>
              <Controller
                control={control}
                name="nome"
                rules={{ required: true }}
                render={({ field }) => <input {...field} type="text" className="form-control" placeholder="Nome" autocomplete="off"/>}
              />
              {formState.errors.nome && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
            <div className="col-4">
              <label htmlFor="cpf">CPF</label>
              <Controller
                control={control}
                name="cpf"
                rules={{ required: true }}
                render={({ field }) => <input {...field} type="text" maxLength={14} className="form-control" placeholder="CPF" autocomplete="off"/>}
              />
              {formState.errors.cpf && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
            <div className="col-2">
              <label htmlFor="dataNascimento">Data Nascimento</label>
              <Controller
                control={control}
                name="dataNascimento"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  formState: { errors },
                }) => (
                  <>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      showIcon
                      selected={value}
                      onChange={onChange}
                      className="form-control"
                      locale={ptBR}
                      placeholderText="Data Nascimento"
                      autocomplete="off"
                    />
                  </>
                )}
              />
              {formState.errors.dataNascimento && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
          </div>
          <div className="mt-3">
            <div className="form-check">
              <input {...register('funcionario')} className="form-check-input" type="checkbox" id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">
                Funcionário
              </label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Salvar</button>
        </form>
      </div>
    </div>
  );
}
export default PessoaForm;