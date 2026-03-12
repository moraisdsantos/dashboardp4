import { useEffect, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';
import fichaTecnicaCsv from '../../imports/ficha_tecnica.csv?raw';
import passosAplicacaoCsv from '../../imports/passos_aplicacao.csv?raw';

interface CSVUploaderProps {
  onFichaTecnicaLoad: (file: File) => Promise<void>;
  onPassosLoad: (file: File) => Promise<void>;
  fichaTecnicaLoaded: boolean;
  passosLoaded: boolean;
}

export const CSVUploader = ({
  onFichaTecnicaLoad,
  onPassosLoad,
  fichaTecnicaLoaded,
  passosLoaded,
}: CSVUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEmbeddedCSVs = async () => {
      if (initialized) return;

      try {
        setLoading(true);
        setError(null);

        const fichaFile = new File(
          [fichaTecnicaCsv],
          'ficha_tecnica.csv',
          { type: 'text/csv;charset=utf-8' }
        );

        const passosFile = new File(
          [passosAplicacaoCsv],
          'passos_aplicacao.csv',
          { type: 'text/csv;charset=utf-8' }
        );

        await onFichaTecnicaLoad(fichaFile);
        await onPassosLoad(passosFile);

        setInitialized(true);
      } catch (err) {
        console.error('Erro ao carregar CSVs embutidos:', err);
        setError('Não foi possível carregar os CSVs incorporados.');
      } finally {
        setLoading(false);
      }
    };

    void loadEmbeddedCSVs();
  }, [initialized, onFichaTecnicaLoad, onPassosLoad]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Dados dos Métodos</h2>

      {loading && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Loader2 className="w-4 h-4 animate-spin" />
          Carregando arquivos CSV incorporados...
        </div>
      )}

      {!loading && !error && fichaTecnicaLoaded && passosLoaded && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-2 text-green-700 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Ficha Técnica carregada
            </div>
            <p className="text-xs text-gray-500 mt-2">
              CSV carregado automaticamente de <code>src/import/ficha_tecnica.csv</code>
            </p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
            <div className="flex items-center gap-2 text-green-700 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              Passos de Aplicação carregados
            </div>
            <p className="text-xs text-gray-500 mt-2">
              CSV carregado automaticamente de <code>src/import/passos_aplicacao.csv</code>
            </p>
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};
