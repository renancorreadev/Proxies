FROM node:20.10.0-buster-slim

# Install Git, Zsh, and Wget
RUN apt-get update && apt-get install -y git zsh wget curl build-essential python3

RUN npm install bufferutil utf-8-validate

# Download and Install Golang
RUN curl -LO "https://go.dev/dl/go1.21.5.linux-arm64.tar.gz" \
    && tar -C /usr/local -xzf "go1.21.5.linux-arm64.tar.gz" \
    && rm "go1.21.5.linux-arm64.tar.gz"

# Set PATH so it includes Go binaries
ENV PATH="/usr/local/go/bin:${PATH}"

# Set Zsh as the default shell for the node user
RUN chsh -s /bin/zsh node

# Change to the node user to install Oh My Zsh
USER node

# Install Oh My Zsh for the node user
RUN wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh | sh

# Clone various zsh plugins and themes
RUN git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting && \
    git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/themes/powerlevel10k && \
    git clone https://github.com/nvie/gitflow.git ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/plugins/git-flow && \
    git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/plugins/zsh-autosuggestions && \
    git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/plugins/zsh-completions

# Configure Oh My Zsh, zsh-syntax-highlighting plugin, and create zsh history directory
RUN if [ -f /home/node/.zshrc ]; then \
    sed -i 's/ZSH_THEME="robbyrussell"/ZSH_THEME="powerlevel10k\/powerlevel10k"/' /home/node/.zshrc && \
    echo 'export LS_COLORS="di=1;34:ln=35"' >> /home/node/.zshrc && \
    sed -i 's/plugins=(git zsh-syntax-highlighting)/plugins=(git zsh-syntax-highlighting git-flow zsh-autosuggestions zsh-completions)/' /home/node/.zshrc && \
    echo 'source ${ZSH_CUSTOM:-/home/node/.oh-my-zsh/custom}/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh' >> /home/node/.zshrc && \
    mkdir -p /home/node/zsh && \
    echo 'HISTFILE=/home/node/zsh/.zsh_history' >> /home/node/.zshrc; \
    fi

# Download and set the Powerlevel10k config file
RUN wget -O /home/node/.p10k.zsh https://raw.githubusercontent.com/romkatv/powerlevel10k/master/config/p10k-rainbow.zsh

# Ensure the .p10k.zsh file is sourced in .zshrc
RUN echo '[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh' >> /home/node/.zshrc

# Set Zsh as the default shell for subsequent commands

# Configure user and working directory
USER root
SHELL ["/bin/zsh", "-c"]
ENV PNPM_HOME="/home/node/.pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN mkdir -p $PNPM_HOME && chown -R node:node $PNPM_HOME
# Instalação do pnpm
RUN npm install -g pnpm@latest
RUN chmod -R a+w /usr/local/lib/node_modules
# Configurando o diretório .pnpm-store no home do usuário
RUN mkdir -p /home/node/.pnpm-store && chmod -R a+w /home/node/.pnpm-store


USER node
WORKDIR /home/node/app


# Default command to keep the container running
CMD ["tail", "-f", "/dev/null"]
