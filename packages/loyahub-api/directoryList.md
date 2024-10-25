|-- packages
    |-- .dockerignore
    |-- .env
    |-- .env.example
    |-- .eslintrc.js
    |-- .gitignore
    |-- .nycrc.json
    |-- .prettierrc
    |-- README.md
    |-- nest-cli.json
    |-- package.json
    |-- tsconfig.build.json
    |-- tsconfig.json
    |-- tsconfig.paths.json
    |-- .vscode
    |   |-- launch.json
    |   |-- settings.json
    |-- src
    |   |-- app.module.ts
    |   |-- main.ts
    |   |-- config
    |   |   |-- Blockchain
    |   |   |   |-- connection.ts
    |   |   |-- Database
    |   |       |-- DatabaseConnection.ts
    |   |-- helper
    |   |   |-- APIErrors.ts
    |   |   |-- AppConstants.ts
    |   |   |-- blockchain
    |   |   |   |-- ClientManagerBlockchainConnector.ts
    |   |   |   |-- PointsCoreBlockchainConnector.ts
    |   |   |   |-- connector
    |   |   |   |   |-- ClientManagerConnector.ts
    |   |   |   |   |-- PointManagerConnector.ts
    |   |   |   |   |-- index.ts
    |   |   |   |   |-- interfaces
    |   |   |   |       |-- IClientManagerConnector.ts
    |   |   |   |       |-- IPointManagerConnector.ts
    |   |   |   |-- types
    |   |   |       |-- contracts
    |   |   |           |-- client-manager-types.ts
    |   |   |           |-- points-core-types.ts
    |   |   |-- vault
    |   |   |   |-- index.ts
    |   |   |-- walletCreator
    |   |       |-- index.ts
    |   |-- modules
    |       |-- Authentication
    |       |   |-- Adapters
    |       |   |   |-- Input
    |       |   |   |   |-- AuthenticationKeycloakWebAdapter.ts
    |       |   |   |   |-- AuthenticationWebAdapter.ts
    |       |   |   |-- Output
    |       |   |       |-- AuthenticationAdapter.ts
    |       |   |       |-- KeycloakAdapter.ts
    |       |   |-- Domain
    |       |   |   |-- AuthenticationService.ts
    |       |   |   |-- KeycloakAuthenticationService.ts
    |       |   |   |-- DTO
    |       |   |       |-- HTTPRequest
    |       |   |       |   |-- AuthenticationRequest.ts
    |       |   |       |-- Swagger
    |       |   |           |-- LoginDtoSwagger.ts
    |       |   |-- Guards
    |       |   |   |-- Auth.Guard.ts
    |       |   |-- Port
    |       |   |   |-- Input
    |       |   |   |   |-- AuthenticationTokenUseCase.ts
    |       |   |   |-- Output
    |       |   |       |-- AuthenticationKeycloakTokenOutputPort.ts
    |       |   |       |-- AuthenticationTokenOutputPort.ts
    |       |   |-- Strategies
    |       |       |-- Jwt.Strategy.ts
    |       |       |-- KeycloakStrategy.ts
    |       |-- Blockchain
    |       |   |-- Client
    |       |   |   |-- Adapters
    |       |   |   |   |-- Output
    |       |   |   |   |   |-- ClientBlockChainAdapter.ts
    |       |   |   |   |   |-- db
    |       |   |   |   |       |-- CustomerDBAdapter.ts
    |       |   |   |   |       |-- CustomerDBStorageAdapter.ts
    |       |   |   |   |       |-- entity
    |       |   |   |   |           |-- CustomerEntity.ts
    |       |   |   |   |-- input
    |       |   |   |       |-- ClientWebAdapter.ts
    |       |   |   |       |-- CustomerDBWebAdapter.ts
    |       |   |   |-- Domain
    |       |   |   |   |-- ClientBlockchainService.ts
    |       |   |   |   |-- CustomerDBService.ts
    |       |   |   |   |-- Dto
    |       |   |   |       |-- HTTPRequest
    |       |   |   |       |   |-- ClientBlockchainRequestDto.ts
    |       |   |   |       |-- HTTPResponse
    |       |   |   |           |-- GetClientResponse.ts
    |       |   |   |           |-- LocationResponse.ts
    |       |   |   |-- Port
    |       |   |       |-- Input
    |       |   |       |   |-- ClientBlockchainTokenUseCase.ts
    |       |   |       |   |-- db
    |       |   |       |       |-- CustomerDBStorageTokenUseCase.ts
    |       |   |       |       |-- CustomerDBTokenUseCase.ts
    |       |   |       |-- Output
    |       |   |           |-- ClientBlockchainTokenOutputPort.ts
    |       |   |           |-- db
    |       |   |               |-- CustomerDBStorageOutputPort.ts
    |       |   |               |-- CustomerDBTokenOutputPort.ts
    |       |   |-- Points
    |       |       |-- Adapters
    |       |       |   |-- Output
    |       |       |   |   |-- PointsBlockChainAdapter.ts
    |       |       |   |   |-- PointsDBStorageAdapter.ts
    |       |       |   |-- input
    |       |       |       |-- PointsBlockchainWebAdapter.ts
    |       |       |-- Domain
    |       |       |   |-- PointsBlockchainService.ts
    |       |       |   |-- Dto
    |       |       |       |-- HTTPRequest
    |       |       |       |   |-- AddPointsRequestDto.ts
    |       |       |       |   |-- GetAllNFTsRequestDTO.ts
    |       |       |       |-- HTTPResponse
    |       |       |           |-- GetClientLevelResponse.ts
    |       |       |           |-- GetClientPointsResponse.ts
    |       |       |           |-- GetMultiplesNFTResponse.ts
    |       |       |           |-- GetUniqueNFTResponse.ts
    |       |       |-- Port
    |       |           |-- Input
    |       |           |   |-- PointsBlockchainTokenUseCase.ts
    |       |           |-- Output
    |       |               |-- PointsBlockchainTokenOutputPort.ts
    |       |               |-- PointsDBStorageOutputPort.ts
    |       |-- Metadata
    |       |   |-- Adapters
    |       |   |   |-- Input
    |       |   |   |   |-- MetadataWebAdapter.ts
    |       |   |   |-- Output
    |       |   |       |-- MetadataAdapter.ts
    |       |   |       |-- MetadataStorageAdapter.ts
    |       |   |       |-- Entity
    |       |   |           |-- MetadataEntity.ts
    |       |   |-- Domain
    |       |   |   |-- MetadataService.ts
    |       |   |   |-- Dto
    |       |   |       |-- HTTPRequest
    |       |   |       |   |-- DeleteMetadataRequestDTO.ts
    |       |   |       |   |-- MetadataAtributes.ts
    |       |   |       |   |-- MetadataStorageDTORequest.ts
    |       |   |       |   |-- RegisterMetadataRequestDTO.ts
    |       |   |       |   |-- UpdateMetadataRequestDTO.ts
    |       |   |       |   |-- index.ts
    |       |   |       |-- HTTPResponse
    |       |   |       |   |-- MetadataResponse.ts
    |       |   |       |-- Swagger
    |       |   |           |-- MetadataSwaggerBodyAPI.ts
    |       |   |           |-- UpdateMetadataSwaggerAPI.ts
    |       |   |           |-- index.ts
    |       |   |-- Port
    |       |       |-- Input
    |       |       |   |-- MetadataTokenUseCase.ts
    |       |       |   |-- index.ts
    |       |       |-- Output
    |       |           |-- MetadataStorageOutputPort.ts
    |       |           |-- MetadataTokenOutputPort.ts
    |       |           |-- index.ts
    |       |-- MinIO
    |       |   |-- minio-service.ts
    |       |-- Redis
    |       |   |-- regis.module.ts
    |       |-- User
    |           |-- Adapters
    |           |   |-- Input
    |           |   |   |-- UserWebAdapter.ts
    |           |   |-- Output
    |           |       |-- UserAdapter.ts
    |           |       |-- db
    |           |           |-- UserEntity.ts
    |           |-- Domain
    |           |   |-- UserService.ts
    |           |   |-- @types
    |           |   |   |-- user.ts
    |           |   |-- DTO
    |           |   |   |-- HTTPRequest
    |           |   |   |   |-- userHttpRequest.ts
    |           |   |   |-- HTTPResponse
    |           |   |   |   |-- userHttpResponse.ts
    |           |   |   |-- Swagger
    |           |   |       |-- LoginDtoSwagger.ts
    |           |   |       |-- getUserResponseSwagger.ts
    |           |   |       |-- index.ts
    |           |   |       |-- userUpdaterSwagger.ts
    |           |   |-- errors
    |           |       |-- user.errors.ts
    |           |-- Port
    |               |-- Input
    |               |   |-- UserTokenUseCase.ts
    |               |-- Output
    |                   |-- UserTokenOutputPort.ts
