# Configuração de Prometheus e Grafana com Docker Compose\*\*

Este documento apresenta um tutorial passo a passo para configurar Prometheus e Grafana utilizando Docker Compose e monitorar nós Hyperledger Besu.

---

## **Pré-requisitos**

1. Docker e Docker Compose instalados.
2. Acesso aos arquivos necessários:
   - `docker-compose.yml` com Prometheus e Grafana.
   - Arquivo de configuração `prometheus.yml`.

---

## **Estrutura do Projeto**

```bash
project-root/
│
├── docker-compose.yml  # Docker Compose com Prometheus e Grafana
├── prometheus.yml      # Configuração do Prometheus
```

---

## **Passo 1: Configuração do Arquivo `docker-compose.yml`**

Crie o arquivo `docker-compose.yml` para subir Prometheus e Grafana:

```yaml
services:
  prometheus:
    container_name: prometheus
    image: prom/prometheus
    command:
      - --config.file=/etc/prometheus/prometheus.yml
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus
    ports:
      - "9090:9090"
    networks:
      - protocol

  grafana:
    container_name: grafana
    image: grafana/grafana:latest
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
      - GF_USERS_ALLOW_SIGN_UP=false
    volumes:
      - grafana_data:/var/lib/grafana
    ports:
      - "3000:3000"
    networks:
      - protocol
    depends_on:
      - prometheus

volumes:
  prometheus_data:
    driver: local
  grafana_data:
    driver: local

networks:
  protocol:
    external: true # Usando a rede externa existente
```

---

## **Passo 2: Configuração do Prometheus**

Crie o arquivo `prometheus.yml` na raiz do projeto:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "besu-nodes"
    metrics_path: /metrics
    static_configs:
      - targets:
          - "bootnode:9545"
          - "validator_1:9546"
          - "validator_2:9547"
          - "validator_3:9548"
```

---

## **Passo 3: Subir os Contêineres**

1. No diretório raiz do projeto, suba os serviços:

   ```bash
   docker-compose up -d
   ```

2. Verifique se os contêineres estão em execução:

   ```bash
   docker ps
   ```

3. Certifique-se de que todos os contêineres estão na rede `protocol`:
   ```bash
   docker network inspect protocol
   ```

---

## **Passo 4: Verificar Prometheus**

1. Acesse a interface do Prometheus:

   - URL: `http://localhost:9090`

2. Vá para **Status > Targets** e verifique se os nós estão marcados como **UP**.

---

## **Passo 5: Configuração do Grafana**

1. Acesse o Grafana:

   - URL: `http://localhost:3000`

2. Faça login com as credenciais:

   - **Usuário:** `admin`
   - **Senha:** `admin`

3. Vá para **Configuration > Data Sources** e adicione uma nova fonte de dados:
   - **Type:** Prometheus
   - **URL:** `http://prometheus:9090`
   - **Save & Test**

---

## **Passo 6: Importar Dashboard no Grafana**

1. Vá para **Create > Import** e insira o ID de um dashboard Prometheus:

   - **Exemplo:** `22008` (dashboard popular para Besu Full).

2. Escolha a fonte de dados como **Prometheus** e clique em **Import**.

---

## **Passo 7: Verificar Conectividade e Logs**

### Teste de Conectividade:

Entre no contêiner do Grafana e verifique a conectividade com o Prometheus:

```bash
docker exec -it grafana /bin/sh
curl http://prometheus:9090/metrics
```

### Logs de Debug:

Se algo não funcionar, verifique os logs:

```bash
docker logs grafana
docker logs prometheus
```

---

## **Solução de Problemas**

1. **Os Targets não Aparecem no Prometheus:**

   - Verifique se os contêineres estão na mesma rede.
   - Teste conectividade usando `ping` entre os contêineres.

2. **Erro de Conectividade no Grafana:**
   - Use o IP fixo do Prometheus em vez do nome do serviço na configuração da fonte de dados:  
     **Exemplo:** `http://172.16.239.10:9090`

---

## **Conclusão**

Seguindo este tutorial, você configurou Prometheus e Grafana para monitorar seus nós Hyperledger Besu. Agora você pode acompanhar métricas e criar dashboards personalizados para visualizar o desempenho e a saúde da sua rede.

---
