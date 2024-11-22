FROM rust:1.79 AS builder

WORKDIR /app

COPY Cargo.toml Cargo.lock ./

RUN mkdir src && echo "// placeholder" > src/lib.rs

RUN cargo fetch

COPY . .


RUN cargo build --release


FROM debian:bullseye-slim


RUN apt-get update && apt-get install -y libssl-dev ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app


COPY --from=builder /app/target/release/wallet-engine .


EXPOSE 8084

CMD ["./wallet-engine"]
