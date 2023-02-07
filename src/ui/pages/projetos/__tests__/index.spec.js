import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from 'react-router-dom';
import { server } from "./fixtures";
import selectEvent from "react-select-event";
import { ToastContainer } from 'react-toastify';
import ProjetoForm from "../cadastrar/projeto-form";
import ProjetoList from "../listar/";
import history from "../../../../util/history";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe('ProjetoForm test', () => {

  test('deve validar campos, salvar, mostrar mensagem de sucesso e redirecionar para listagem', async () => {

    render(
      <Router history={history}>
        <ToastContainer />
        <ProjetoForm />
      </Router>
    );

    const nomeInput = screen.getByTestId("nome");
    const gerenteInput = screen.getByLabelText("Gerente");
    const dataInicioInput = screen.getByLabelText("Data Início");
    const dataPrevFimInput = screen.getByTestId("dataPrevisaoFim");
    const statusInput = screen.getByLabelText("Status");
    const riscoInput = screen.getByLabelText("Risco");
    const orcamento = screen.getByTestId("orcamento");
    const descricaoInput = screen.getByTestId("descricao");

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(gerenteInput, 'José da Silva');
    await selectEvent.select(statusInput, 'Em Análise');
    await selectEvent.select(riscoInput, 'Baixo');

    userEvent.type(nomeInput, 'Projeto 1');
    userEvent.type(dataInicioInput, '05/02/2023');
    userEvent.type(dataPrevFimInput, '05/02/2023');
    userEvent.type(orcamento, '200.000,00');
    userEvent.type(descricaoInput, 'descricao');

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Salvo com sucesso');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/projeto/listar');

  });

  test('deve listar projetos', async () => {
    render(
      <Router history={history}>
        <ProjetoList />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('projeto 1')).toBeInTheDocument();
    });
  });

});
