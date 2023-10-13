#-----------------------------------------------------------

# Powerlevel10k

# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.
# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

#-----------------------------------------------------------

# PATH

export PATH="/opt/homebrew/opt/python/libexec/bin:$PATH"

#-----------------------------------------------------------

# Aliases

alias vim=nvim
alias ls=exa
alias zshconfig="vim ~/.zshrc"
alias vimconfig="vim ~/.config/nvim/init.vim"

#-----------------------------------------------------------

# Oh My Zsh

export ZSH="$HOME/.oh-my-zsh"

ZSH_THEME="powerlevel10k/powerlevel10k"

CASE_SENSITIVE="true"

zstyle ':omz:update' mode auto 
zstyle ':omz:update' frequency 13

plugins=(aws git)

source $ZSH/oh-my-zsh.sh

#-----------------------------------------------------------

# pnpm

export PNPM_HOME="/Users/phili/Library/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac

#-----------------------------------------------------------

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

#-----------------------------------------------------------
