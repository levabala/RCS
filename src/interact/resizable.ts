import * as interact from 'levabala_interactjs';

export function createResizeConfig(): interact.ResizableOptions {
  let startWidth = 0;
  let startHeight = 0;
  let startRWidth = 0;
  let startRHeight = 0;

  return {
    edges: {
      bottom: true,
      right: true
    },
    onmove: (
      e: interact.InteractEvent & {
        rect: ClientRect;
      }
    ) => {
      const {
        target
      }: {
        target: HTMLElement;
      } = e;
      const { width, height } = e.rect;
      const resizeTarget = (target.querySelector(".sizeController") ||
        target) as HTMLElement;
      resizeTarget.style.width = `${startRWidth + width - startWidth}px`;
      resizeTarget.style.height = `${startRHeight + height - startHeight}px`;
    },
    onstart: (
      e: interact.InteractEvent & {
        rect: ClientRect;
      }
    ) => {
      const {
        target
      }: {
        target: HTMLElement;
      } = e;
      const { width, height } = e.rect;
      const resizeTarget =
        target.querySelector(".sizeController") || (target as HTMLElement);
      const rRecr = resizeTarget.getBoundingClientRect();
      startRHeight = rRecr.height;
      startRWidth = rRecr.width;
      startWidth = width;
      startHeight = height;
    }
  };
}
