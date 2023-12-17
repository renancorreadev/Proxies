# Customer Rewards API 

## Visão Geral

Nesse repositóri está presente o projeto back-end para o protocolo do custemer rewards em blockchain, esse projeto está elaborado e arquitetado para trabalhar na arquitetura hexagonal no conceito de ports e adapters, melhorando a visão e manutenção de código legível. 

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
  