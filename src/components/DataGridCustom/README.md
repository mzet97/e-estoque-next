# DataGridCustom Component

Componente reutilizável baseado no MUI DataGrid que implementa funcionalidades server-side para filtro, ordenação e paginação.

## Características

- **Paginação Server-Side**: Carrega apenas os dados necessários para a página atual
- **Ordenação Server-Side**: Ordena os dados no servidor para melhor performance
- **Filtro Server-Side**: Aplica filtros no servidor reduzindo a transferência de dados
- **Busca Global**: Permite busca em múltiplos campos
- **Ações Customizáveis**: Botões de editar e deletar configuráveis
- **Responsivo**: Interface adaptável para diferentes tamanhos de tela
- **TypeScript**: Totalmente tipado para melhor experiência de desenvolvimento

## Uso Básico

```tsx
import DataGridCustom from '@/components/DataGridCustom';
import { GridColDef } from '@mui/x-data-grid';
import { ServerSideParams, PaginatedResponse } from '@/types/DataGridTypes';

const MyPage = () => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Nome', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
  ];

  const fetchData = async (params: ServerSideParams): Promise<PaginatedResponse<MyDataType>> => {
    // Implementar chamada para API
    return await myApiService.getData(params);
  };

  return (
    <DataGridCustom<MyDataType>
      columns={columns}
      fetchData={fetchData}
      title="Minha Lista"
      createButtonText="Criar Novo"
      onCreateClick={() => console.log('Criar')}
      onEditClick={(id) => console.log('Editar:', id)}
      onDeleteClick={(id) => console.log('Deletar:', id)}
    />
  );
};
```

## Props

| Prop | Tipo | Obrigatório | Padrão | Descrição |
|------|------|-------------|--------|-----------|
| `columns` | `GridColDef[]` | ✅ | - | Definição das colunas do grid |
| `fetchData` | `(params: ServerSideParams) => Promise<PaginatedResponse<T>>` | ✅ | - | Função para buscar dados do servidor |
| `title` | `string` | ✅ | - | Título exibido no cabeçalho |
| `createButtonText` | `string` | ❌ | 'Create' | Texto do botão de criar |
| `onCreateClick` | `() => void` | ❌ | - | Callback para o botão criar |
| `onEditClick` | `(id: string) => void` | ❌ | - | Callback para o botão editar |
| `onDeleteClick` | `(id: string) => void` | ❌ | - | Callback para o botão deletar |
| `showActions` | `boolean` | ❌ | `true` | Mostrar coluna de ações |
| `initialPageSize` | `number` | ❌ | `25` | Tamanho inicial da página |

## Tipos

### ServerSideParams
```typescript
interface ServerSideParams {
  page: number;          // Página atual (0-based)
  pageSize: number;      // Itens por página
  sortModel?: SortModel[];    // Modelo de ordenação
  filterModel?: FilterModel[]; // Modelo de filtros
  search?: string;       // Busca global
}
```

### PaginatedResponse
```typescript
interface PaginatedResponse<T> {
  data: T[];           // Dados da página atual
  total: number;       // Total de registros
  page: number;        // Página atual
  pageSize: number;    // Itens por página
  totalPages: number;  // Total de páginas
}
```

## Implementação no Backend

O backend deve aceitar os seguintes parâmetros de query:

- `page`: Número da página (1-based no backend, 0-based no frontend)
- `pageSize`: Quantidade de itens por página
- `sortField`: Campo para ordenação
- `sortOrder`: Direção da ordenação ('asc' ou 'desc')
- `filter[0][field]`: Campo do filtro
- `filter[0][operator]`: Operador do filtro ('contains', 'equals', etc.)
- `filter[0][value]`: Valor do filtro
- `search`: Termo de busca global

### Exemplo de Endpoint

```
GET /api/categories/paginated?page=1&pageSize=25&sortField=name&sortOrder=asc&filter[0][field]=name&filter[0][operator]=contains&filter[0][value]=electronics
```

## Funcionalidades Disponíveis

### Paginação
- Navegação entre páginas
- Seleção de itens por página (10, 25, 50, 100)
- Informações de total de registros

### Ordenação
- Clique no cabeçalho da coluna para ordenar
- Suporte a ordenação ascendente e descendente
- Indicador visual da coluna ordenada

### Filtros
- Filtros por coluna através do menu do cabeçalho
- Operadores: contains, equals, startsWith, endsWith, etc.
- Múltiplos filtros simultâneos

### Busca Global
- Campo de busca na toolbar
- Busca em múltiplos campos configuráveis

### Ações
- Botões de editar e deletar por linha
- Tooltips informativos
- Callbacks customizáveis

## Exemplo Completo

Veja o arquivo `src/app/dashboard/category/page.tsx` para um exemplo completo de implementação.