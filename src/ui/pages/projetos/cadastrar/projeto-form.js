import { Controller, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from "react";
import { requestBackend } from "../../../../util/requests";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import ptBR from 'date-fns/locale/pt-BR';
import { getSchema } from "./form-helper";
import { useHistory, useParams } from "react-router-dom";
import { optionsRisco, optionsStatus } from "../../../../util/select-options";
import "react-datepicker/dist/react-datepicker.css"
import { toast } from "react-toastify";
import CurrencyInput from "react-currency-input-field";

const ProjetoForm = ({ projeto = {} }) => {
  const history = useHistory();
  const { idProjeto } = useParams();
  const isEditing = idProjeto;
  const [selectGerente, setSelectGerente] = useState([]);
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(getSchema()),
    defaultValues: projeto
  });

  useEffect(() => {
    requestBackend({ url: '/pessoa' }).then((response) => {
      console.log(response.data);
      setSelectGerente(response.data);
    });
  }, []);

  const handleCancelar = () => { history.push('/projeto/listar'); }

  const onSubmit = (formData) => {
    console.log(formData)
    const data = {
      ...formData,
      statusProjeto: formData.statusProjeto.value,
      riscoProjeto: formData.riscoProjeto.value,
      orcamento: String(formData.orcamento).replace(',', '.'),
    };


    const config = {
      method: isEditing ? 'PUT' : 'POST',
      url: isEditing ? `/projeto/${idProjeto}` : '/projeto',
      data,
    };

    requestBackend(config)
      .then(() => {
        toast.success('Salvo com sucesso', { theme: "colored" });
        history.push('/projeto/listar');
      })
      .catch(() => {
        console.log('erro');
      });
  };

  return (
    <div className="container">
      <div className="mt-3 ms-2">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Projetos</li>
            <li className="breadcrumb-item active" aria-current="page">{isEditing ? 'Editar' : 'Cadastrar'}</li>
          </ol>
        </nav>
      </div>
      <div className="base-card">

        <form onSubmit={handleSubmit(onSubmit)} data-testid="projeto-form">

          <div className="row mt-3">
            <div className="col-6 mt-3">
              <label htmlFor="nome">Nome do Projeto</label>
              <input
                {...register('nome', {
                  required: 'Campo obrigatório',
                })}
                type="text"
                className={`form-control base-input ${errors.name ? 'is-invalid' : ''
                  }`}
                placeholder="Nome do projeto"
                name="nome"
                data-testid="nome"
                autocomplete="off"
              />
              {errors.nome && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
            <div className="col-6 mt-3">
              <label htmlFor="gerente" data-testid="gerente">Gerente</label>
              <Controller
                name="gerente"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={selectGerente}
                    classNamePrefix="gerente-projeto"
                    getOptionLabel={(pessoa) => pessoa.nome}
                    getOptionValue={(pessoa) => String(pessoa.id)}
                    inputId="gerente"
                  />
                )}
              />
              {errors.gerente && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-4 mt-3">
              <label htmlFor="dataInicio" data-testid="dataInicio">Data Início</label>
              <Controller
                control={control}
                name="dataInicio"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  formState: { errors },
                }) => (
                  <>
                    <DatePicker
                      showIcon
                      dateFormat="dd/MM/yyyy"
                      selected={value}
                      onChange={onChange}
                      className="form-control"
                      id="dataInicio"
                      locale={ptBR}
                      placeholderText="Data início"
                      autoComplete="off"
                    />
                    {errors.dataInicio && (
                      <div className="invalid-feedback d-block">Campo obrigatório</div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-3">
              <label htmlFor="dataPrevisaoFim" data-testid="dataPrevisaoFim">Data Previsão Fim</label>
              <Controller
                control={control}
                name="dataPrevisaoFim"
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  formState: { errors },
                }) => (
                  <>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={value}
                      onChange={onChange}
                      className="form-control"
                      id="dataPrevisaoFim"
                      locale={ptBR}
                      placeholderText="Previsão fim"
                      autoComplete="off"
                    />
                    {errors.dataPrevisaoFim && (
                      <div className="invalid-feedback d-block">Campo obrigatório</div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-3">
              <label htmlFor="dataFim">Data Fim</label>
              <Controller
                control={control}
                name="dataFim"
                render={({
                  field: { onChange, value },
                  formState: { errors },
                }) => (
                  <>
                    <DatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={value}
                      onChange={onChange}
                      className="form-control"
                      id="dataFim"
                      locale={ptBR}
                      placeholderText="Data fim"
                      autoComplete="off"
                    />
                    {errors.dataFim && (
                      <div className="invalid-feedback d-block">Campo obrigatório</div>
                    )}
                  </>
                )}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-3 mt-3">
              <label htmlFor="statusProjeto">Status</label>
              <Controller
                name="statusProjeto"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsStatus}
                    getOptionLabel={(status) => status.label}
                    getOptionValue={(status) => status.value}
                    inputId="statusProjeto"
                  />
                )}
              />
              {errors.statusProjeto && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>

            <div className="col-3 mt-3">
              <label htmlFor="riscoProjeto">Risco</label>
              <Controller
                name="riscoProjeto"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsRisco}
                    getOptionLabel={(status) => status.label}
                    getOptionValue={(status) => status.value}
                    inputId="riscoProjeto"
                  />
                )}
              />
              {errors.riscoProjeto && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-6 mt-3">
              <label htmlFor="orcamento">Orçamento</label>
              <Controller
                name="orcamento"
                rules={{ required: 'Campo obrigatório' }}
                control={control}
                render={({ field }) => (
                  <CurrencyInput
                    placeholder="Orçamento"
                    className="form-control"
                    value={field.value}
                    onValueChange={field.onChange}
                    data-testid="orcamento"
                    decimalScale={2}
                    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                  />
                )}
              />
              {errors.orcamento && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-6 mt-3">
              <label htmlFor="descricao">Descrição</label>
              <textarea
                rows={5}
                {...register('descricao', {
                  required: 'Campo obrigatório',
                })}
                className={`form-control base-input h-auto ${errors.descricao ? 'is-invalid' : ''}`}
                placeholder="Descrição"
                data-testid="descricao"
              />
              {errors.descricao && (
                <div className="invalid-feedback d-block">Campo obrigatório</div>
              )}
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Salvar
          </button>
          {
            isEditing && <button className="btn btn-primary mt-3 ms-1" onClick={() => handleCancelar()}>Cancelar</button>
          }

        </form>
      </div>
    </div>
  );
}
export default ProjetoForm;