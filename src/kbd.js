let keymaps = [
  {
    event: { key: 'u' },
    description: 'Undo',
    execute: ({ history }) => history.canUndo && history.undo(),
  },
  {
    event: { key: 'r', ctrlKey: true },
    description: 'Redo',
    execute: ({ history }) => history.canRedo && history.redo(),
  },
]

// TODO: Don't execute if inside a typeable area
export let onKeyPress = deps => e => {
  let keymap = keymaps.find(
    ({ event: x }) =>
      x.key === e.key &&
      (x.ctrlKey || false) === e.ctrlKey &&
      (x.metaKey || false) === e.metaKey &&
      (x.altKey || false) === e.altKey &&
      (x.shiftKey || false) === e.shiftKey
  )
  if (keymap) keymap.execute(deps)
}
