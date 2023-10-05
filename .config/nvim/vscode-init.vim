set clipboard=unnamedplus

"Mapping Space to Leader
nnoremap <SPACE> <Nop>
let mapleader=" "

"Wrapped Lines
"set wrap

"When pasting, go to the end of the pasted block
noremap p gp
noremap P gP

"When yanking in visual mode, go to the end of the block after the yank
vmap y y']

"Delete line but don't yank it
nnoremap <leader>d "_d
