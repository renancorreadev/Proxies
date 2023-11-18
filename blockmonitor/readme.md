# ClientManager Blockchain Events Monitor 


`cmd: Contém os pontos de entrada da aplicação, como executáveis. Cada subdiretório representa um aplicativo diferente, contendo seu próprio main.go.`

* internal: Diretório para o código privado da aplicação. Não pode ser importado por código em outros módulos.

* app: Contém a lógica de negócios e casos de uso.
* usecase: Contém os casos de uso específicos do aplicativo.
* repository: Interface para interação com a camada de dados.
* delivery: Contém adaptadores para diferentes formas de entrega (HTTP, gRPC, etc.).
* pkg: Contém bibliotecas compartilhadas que podem ser usadas por outros aplicativos ou serviços.
* api: Armazena especificações de API, como OpenAPI (Swagger) para definições de HTTP API.
* config: Contém arquivos de configuração e scripts relacionados para a aplicação.
* scripts: Scripts auxiliares para tarefas como build, deploy, etc.