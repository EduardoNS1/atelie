# Search

## Descrição
Esta pasta contém a implementação da funcionalidade de busca da aplicação. O sistema permite que os usuários pesquisem por posts utilizando uma query específica. A busca é realizada através de um componente interativo que se conecta a um banco de dados.

## Estrutura

### Componentes Principais

1. **Search** (`[query].js`)
   - Componente responsável por gerenciar a busca. Ele:
     - Obtém a query de busca a partir dos parâmetros da rota.
     - Usa a função `searchPosts` para buscar os dados.
     - Exibe os resultados em uma lista de `PostCard`.
     - Atualiza os resultados automaticamente quando a query muda.

2. **SearchInput**
   - Componente que permite ao usuário inserir uma query.
   - Verifica se o usuário está na rota de busca e atualiza a URL ou muda os parâmetros da rota conforme necessário.

3. **PostCard**
   - Componente que exibe as informações de cada post, como título, thumbnail, vídeo, criador e avatar.

4. **EmptyState**
   - Componente que é mostrado quando não há resultados para a busca, informando o usuário de que nenhum vídeo foi encontrado.

## Como Funciona

1. O usuário insere uma busca no componente `SearchInput`.
2. O `SearchInput` atualiza a URL ou os parâmetros da rota usando `router.setParams`, dependendo de onde o usuário está.
3. O componente `Search` escuta mudanças na query através do hook `useEffect` e realiza uma nova busca usando `refetch`.
4. Os resultados são exibidos como uma lista de `PostCard`. Se não houver resultados, o componente `EmptyState` é exibido.

## Exemplos de Uso
- Para buscar por posts relacionados a um tema específico, o usuário pode acessar a rota `/search/some-query`.
- O sistema irá buscar e exibir todos os posts que correspondem à query fornecida.

## Dependências
- `expo-router`: Para gerenciamento de rotas.
- `react-native`: Para os componentes da interface do usuário.
- `Appwrite`: Para interação com a base de dados de posts.

## Contribuição
Sinta-se à vontade para contribuir com melhorias ou correções. Para isso, siga as diretrizes de contribuição do projeto.

