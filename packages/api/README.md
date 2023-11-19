# CLient Management API Blockchain 


# Arquitetura Hexagonal

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
  