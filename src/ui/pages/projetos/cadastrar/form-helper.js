import { array, number, object, string, date } from 'yup';

const getSchema = () => object().shape({
  id: number(),
  nome: string().required(),
  gerente: object().required(),
  statusProjeto: object().required(),
  riscoProjeto: object().required(),
  dataInicio: date().required(),
  dataPrevisaoFim: date().required(),
  dataFim: date().nullable(),
  descricao: string().required()
});

const getDefaultValues = ({
  id = '',
  nome = '',
  statusProjeto = '',
  riscoProjeto = '',
  dataInicio = null,
  dataPrevisaoFim = null,
  dataFim = null,
  gerente = {},
  descricao = ''
}) => ({
  id,
  nome,
  statusProjeto: {label: statusProjeto, value: statusProjeto},
  riscoProjeto: {label: riscoProjeto, value: riscoProjeto},
  dataInicio: dataInicio ? new Date(dataInicio) : null,
  dataPrevisaoFim: dataPrevisaoFim ? new Date(dataPrevisaoFim) : null,
  dataFim: dataFim ? new Date(dataFim) : null,
  gerente,
  descricao
})

export { getDefaultValues, getSchema };