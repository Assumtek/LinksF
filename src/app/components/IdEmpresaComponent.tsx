import { useParams } from 'next/navigation';

export function IdEmpresaComponent() {
  const params = useParams();
  return params.id;
}