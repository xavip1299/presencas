export type Caloiro = {
  id: string;
  numero_caloiro: string;
  nome: string;
  curso: string;
  data_nascimento: string;
};

export type Atividade = {
  id: string;
  titulo: string;
  data: string;
  tipo: string | null;
  observacoes: string | null;
};
