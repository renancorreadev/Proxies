# CLient Management API Blockchain 

Eu tenho um back end NestJS com typescript configurado para usar o contexto de port, adapters com inputs e outputs com arquitetura hexagonal. 

as pastas são organizada assim: 

```log
api/
├── src
 │   ├── modules
 │   │    ├── Blockchain 
 │   │    │    ├── Client 
 │   │    │    │    ├── Adapter
 │   │    │    │    │    ├── Input
 │   │    │    │    │    ├── Output
 │   │    │    │    ├── Domain 
 │   │    │    │    │    ├── DTO
 │   │    │    │    │    ├── Service.ts
 │   │    │    │    ├── Port  
 │   │    │    │    │    ├── Input
 │   │    │    │    │    ├── Output
 │   │    │    ├── Payment
 │   │    │    │    ├── Adapter
 │   │    │    │    │    ├── Input
 │   │    │    │    │    ├── Output
 │   │    │    │    ├── Domain 
 │   │    │    │    │    ├── DTO
 │   │    │    │    │    ├── Service.ts
 │   │    │    │    ├── Port  
 │   │    │    │    │    ├── Input
 │   │    │    │    │    ├── Output
 │   │    │    ├── Management
 │   │    │    │    ├── Adapter
 │   │    │    │    │    ├── Input
 │   │    │    │    │    ├── Output
 │   │    │    │    ├── Domain 
 │   │    │    │    │    ├── DTO
 │   │    │    │    │    ├── Service.ts
 │   │    │    │    ├── Port  
 │   │    │    │    │    ├── Input
 │   │    │    │    │    ├── Output
 │   │    ├── Gym
```
  
