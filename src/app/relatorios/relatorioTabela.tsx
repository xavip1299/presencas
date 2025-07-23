'use client';

type Row = { caloiro_id: string; nome: string; numero_caloiro: string; total: number };
type Props = { rows: Row[] };

export default function RelatorioTabela({ rows }: Props) {
  function downloadCSV() {
    const header = 'numero_caloiro;nome;total\n';
    const body = rows.map(r => `${r.numero_caloiro};${r.nome};${r.total}`).join('\n');
    const blob = new Blob([header + body], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'relatorio_presencas.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <table className="border w-full text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Nº Caloiro</th>
            <th className="border p-2 text-left">Nome</th>
            <th className="border p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.caloiro_id}>
              <td className="border p-2">{r.numero_caloiro}</td>
              <td className="border p-2">{r.nome}</td>
              <td className="border p-2 text-right">{r.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={downloadCSV} className="border px-3 py-1 mt-4">
        Exportar CSV
      </button>
    </>
  );
}
