import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BASE_URL } from '../../../../util/requests';


const gerentes = [
  { id: 1, nome: 'José da Silva' },
  { id: 2, nome: 'Maria da Silva' },
]

const projetos = [
  {
    "id": 1,
    "nome": "projeto 1",
    "descricao": "texto descricao",
    "dataInicio": "2023-02-05T03:00:00Z",
    "dataFim": null,
    "dataPrevisaoFim": "2023-02-05T03:00:00Z",
    "gerente": {
      "id": 1,
      "nome": "José da Silva"
    },
    "statusProjeto": "Em Análise",
    "riscoProjeto": "Baixo"
  },
  {
    "id": 2,
    "nome": "projeto 2",
    "descricao": "texto descricao",
    "dataInicio": "2023-02-05T03:00:00Z",
    "dataFim": null,
    "dataPrevisaoFim": "2023-02-05T03:00:00Z",
    "gerente": {
      "id": 1,
      "nome": "José da Silva"
    },
    "statusProjeto": "Encerrado",
    "riscoProjeto": "Médio"
  },
];

export const projeto = {
  "id": 1,
  "nome": "projeto 1",
  "descricao": "texto descricao",
  "dataInicio": "2023-02-05T03:00:00Z",
  "dataFim": null,
  "dataPrevisaoFim": "2023-02-05T03:00:00Z",
  "gerente": {
    "id": 1,
    "nome": "José da Silva"
  },
  "statusProjeto": "Em Análise",
  "riscoProjeto": "Baixo"
}

export const server = setupServer(
  rest.get(`${BASE_URL}/pessoa`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(gerentes)
    );
  }),
  rest.post(`${BASE_URL}/projeto`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json(projeto)
    );
  }),
  rest.get(`${BASE_URL}/projeto/listar`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(projetos)
    );
  }),
);