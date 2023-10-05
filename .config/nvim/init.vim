"------------------------------------------------------------------------------
" Plugins

call plug#begin()

" let g:plug_url_format = 'git@github.com:%s.git'

Plug 'junegunn/fzf', { 'do': { -> fzf#install() } } |
            \ Plug 'junegunn/fzf.vim'

" Editing Utils
Plug 'tpope/vim-surround'

" IDE Stuff
Plug 'tpope/vim-vinegar'  " better netrw
Plug 'tpope/vim-repeat'   " `.` now repeats plugin commands as well
Plug 'tpope/vim-sensible' " sensible setup
Plug 'preservim/nerdtree' |
            \ Plug 'Xuyuanp/nerdtree-git-plugin' |
            \ Plug 'ryanoasis/vim-devicons' 
Plug 'rbgrouleff/bclose.vim' |
            \ Plug 'francoiscabrol/ranger.vim'
Plug 'prettier/vim-prettier', {
  \ 'do': 'yarn install --frozen-lockfile --production',
  \ 'for': ['javascript', 'typescript', 'css', 'less', 'scss', 'json', 'graphql', 'markdown', 'vue', 'svelte', 'yaml', 'html'] }
Plug 'easymotion/vim-easymotion'
Plug 'mattn/emmet-vim'
Plug 'jiangmiao/auto-pairs'
Plug 'matze/vim-move'
Plug 'machakann/vim-highlightedyank'
Plug 'Yggdroot/indentLine'
Plug 'mg979/vim-visual-multi', {'branch': 'master'}
Plug 'kshenoy/vim-signature'

" Theming and UI
Plug 'joshdick/onedark.vim'
Plug 'sheerun/vim-polyglot'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'lilydjwg/colorizer'
Plug 'airblade/vim-gitgutter'

" Git
Plug 'tpope/vim-fugitive' " git goodness
Plug 'junegunn/gv.vim'    " git browser

"LSP & Autocomplete
Plug 'neovim/nvim-lspconfig'
Plug 'prabirshrestha/vim-lsp'
Plug 'mattn/vim-lsp-settings'
Plug 'prabirshrestha/asyncomplete.vim'
Plug 'prabirshrestha/asyncomplete-lsp.vim'
Plug 'ycm-core/YouCompleteMe'
Plug 'uiiaoo/java-syntax.vim'

call plug#end()

"------------------------------------------------------------------------------
" Theming Setup

" One Dark
set termguicolors
let g:onedark_color_overrides = {
\ "black": {"gui": "#21222c", "cterm": "235", "cterm16": "0" },
\ "purple": { "gui": "#C678DF", "cterm": "170", "cterm16": "5" }
\}
colorscheme onedark

" Airline
let g:airline_theme = 'onedark'
let g:airline#extensions#tabline#enabled = 1
let g:airline#extensions#tabline#buffer_nr_show = 1
let g:airline_powerline_fonts = 1

" machakann/vim-highlightedyank
let g:highlightedyank_highlight_duration = 500

" Yggdroot/indentLine
let g:indentLine_char_list = ['|', '┊', '┆', '¦']

"------------------------------------------------------------------------------
" General Configs

filetype on
set encoding=UTF-8
set clipboard=unnamedplus
set wildmenu
set hidden

" Indentation
set shiftwidth=2
set backspace=indent,eol,start
set tabstop=2
set expandtab
set smarttab

" Line Numbering
set relativenumber
set number

" IDE Stuff
set scrolloff=5
set list
set ruler
set colorcolumn=81
set signcolumn=yes
set updatetime=100

" Mapping Space to Leader
nnoremap <SPACE> <Nop>
let mapleader=" "

" Wrapped Lines
set nowrap
nmap j gj
nmap k gk

" When pasting, go to the end of the pasted block
noremap p gp
noremap P gP

" When yanking in visual mode, go to the end of the block after the yank
vmap y y']

" Delete line but don't yank it
nnoremap <leader>d "_d

" Source Vim Config
nnoremap <leader><CR> :so ~/.config/nvim/init.vim<CR>

" Save all files
nnoremap <C-s> :wa<CR>

" Scrolling also centers
nnoremap <C-d> <C-d>zz
nnoremap <C-u> <C-u>zz

" FZF
nnoremap <C-p> :GFiles<CR>
nnoremap <C-f> :Rg<CR>
nnoremap <C-e> :Ranger<CR>

" Formatting
nnoremap <A-S-f> :Prettier<CR>

" Going through editors
nmap <C-k> <C-w>k " Above
nmap <C-j> <C-w>j " Below
nmap <C-h> <C-w>h " Left
nmap <C-l> <C-w>l " Right

" Creating Splits
nmap <A-S-k> :aboveleft split<CR>  " Above
nmap <A-S-j> :split<CR>            " Below
nmap <A-S-h> :vsplit<CR>           " Left
nmap <A-S-l> :aboveleft vsplit<CR> " Right

" NERDTree
nmap <leader>n :NERDTree<CR>

"------------------------------------------------------------------------------
" LSP

" Height of the popup box of suggestions
set pumheight=20

" Tab selects next suggestion if suggestions are visible
inoremap <expr> <TAB> pumvisible() ? "<C-n>" : "<TAB>"

nnoremap <C-k><C-h> :LspHover<CR>
nnoremap <C-k><C-d> :LspDefinition<CR>
nnoremap <C-k><C-e> :LspNextError<CR>
nnoremap <C-k><C-r> :LspRename<CR>
"------------------------------------------------------------------------------
