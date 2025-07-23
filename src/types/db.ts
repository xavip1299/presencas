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

export type Usuario = {
  id: string;
  auth_id: string;
  email: string;
  nome: string;
  role: 'admin' | 'doutor';
  created_at: string;
};

export type LogEntry = {
  id: string;
  user_id: string | null;
  tabela: string;
  acao: 'INSERT' | 'UPDATE' | 'DELETE';
  row_id: string | null;
  created_at: string;
  extra: Record<string, unknown>; // ← em vez de any
};
