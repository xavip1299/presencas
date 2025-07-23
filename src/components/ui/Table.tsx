export function Table({
  head,
  children,
}: {
  head: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-auto border border-gray-700 rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-800 sticky top-0">{head}</thead>
        <tbody className="divide-y divide-gray-800">{children}</tbody>
      </table>
    </div>
  );
}
