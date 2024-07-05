const emptyFn = () => {}

type TDragEvents = {
  onDrag?: (event: DragEvent) => void
  onDragend?: (event: DragEvent) => void
  onDragenter?: (event: DragEvent) => void
  onDragexit?: (event: DragEvent) => void
  onDragleave?: (event: DragEvent) => void
  onDragover?: (event: DragEvent) => void
  onDragstart?: (event: DragEvent) => void
}

const useDrag = (events: TDragEvents = {}) => {
  // onDrag,onDragend,onDragenter,onDragstart

  const {
    onDrag = emptyFn,
    onDragend = emptyFn,
    onDragenter = emptyFn,
    onDragexit = emptyFn,
    onDragleave = emptyFn,
    onDragover = emptyFn,
    onDragstart = emptyFn
  } = events

  return {
    fns: { onDrag, onDragend, onDragenter, onDragexit, onDragleave, onDragover, onDragstart }
  }
}

export default useDrag
