import {
  EPivotPosition,
  EStrategy,
  IPoint,
  IRect,
  PivotPosition,
  Strategy,
} from "../types/utility";

export interface IComputePositionArg {
  targetElement: HTMLElement;
  anchorElement: HTMLElement;
  options?: Partial<IComputePositionOptionsArg>;
}

export interface IComputePositionOptionsArg {
  /**
   * Punto de referecia del elemento target
   */
  anchor: PivotPosition;
  /**
   * Punto de referecia del elemento anchor
   */
  pivot: PivotPosition;

  strategy: Strategy;
}

export const CP_INIT_CONFIG: IComputePositionOptionsArg = {
  anchor: EPivotPosition.TOP_LEFT,
  pivot: EPivotPosition.TOP_LEFT,
  strategy: EStrategy.FIXED,
};

/**
 * Function para obtener las cordenadas x e y para
 * posicionar un elemento con referencia a otro
 * siguiendo un objeto de configuracion
 */
export function computePosition({
  targetElement,
  anchorElement,
  options = CP_INIT_CONFIG,
}: IComputePositionArg) {
  /**
   * Asignando el objeto config
   * TODO: luego chequear una mejor via
   */
  options.anchor = options.anchor || CP_INIT_CONFIG.anchor;
  options.pivot = options.pivot || CP_INIT_CONFIG.pivot;
  options.strategy = options.strategy || CP_INIT_CONFIG.strategy;

  const {
    x: targetElementX,
    y: targetElementY,
    height: targetElementHeight,
    width: targetElementWidth,
  } = targetElement.getBoundingClientRect();
  const { height: anchorHeight, width: anchorWidth } =
    anchorElement.getBoundingClientRect();

  const anchorPosition: IPoint = assignAnchorPosition({
    anchor: options.anchor,
    targetRect: {
      x: targetElementX,
      y: targetElementY,
      height: targetElementHeight,
      width: targetElementWidth,
    },
  });

  const anchorPivotPosition: IPoint = assignAnchorPivotPosition({
    pivot: options.pivot,
    pivotRect: {
      x: 0,
      y: 0,
      height: anchorHeight,
      width: anchorWidth,
    },
  });

  const finalPosition = {
    x: anchorPosition.x - anchorPivotPosition.x,
    y: anchorPosition.y - anchorPivotPosition.y,
  };

  if (options.strategy === EStrategy.ABSOLUTE) {
    finalPosition.x += window.scrollX;
    finalPosition.y += window.scrollY;
  }

  return finalPosition;
}

function assignAnchorPivotPosition({
  pivot,
  pivotRect,
}: {
  pivot: PivotPosition;
  pivotRect: IRect;
}) {
  return assignPivot({ pivot: pivot, rect: pivotRect });
}

function assignAnchorPosition({
  anchor,
  targetRect,
}: {
  anchor: PivotPosition;
  targetRect: IRect;
}) {
  return assignPivot({ pivot: anchor, rect: targetRect });
}

function assignPivot({ pivot, rect }: { pivot: PivotPosition; rect: IRect }) {
  const position: IPoint = {
    x: 0,
    y: 0,
  };

  const horizontalLeft = rect.x;
  const horizontalMiddle = rect.x + rect.width / 2;
  const horizontalRight = rect.x + rect.width;

  const verticalTop = rect.y;
  const verticalCenter = rect.y + rect.height / 2;
  const verticalBottom = rect.y + rect.height;

  switch (pivot) {
    case EPivotPosition.TOP_LEFT:
      position.x = horizontalLeft;
      position.y = verticalTop;
      break;
    case EPivotPosition.TOP:
      position.x = horizontalMiddle;
      position.y = verticalTop;
      break;
    case EPivotPosition.TOP_RIGHT:
      position.x = horizontalRight;
      position.y = verticalTop;
      break;
    case EPivotPosition.CENTER_LEFT:
      position.x = horizontalLeft;
      position.y = verticalCenter;
      break;
    case EPivotPosition.CENTER:
      position.x = horizontalMiddle;
      position.y = verticalCenter;
      break;
    case EPivotPosition.CENTER_RIGHT:
      position.x = horizontalRight;
      position.y = verticalCenter;
      break;
    case EPivotPosition.BOTTOM_LEFT:
      position.x = horizontalLeft;
      position.y = verticalBottom;
      break;
    case EPivotPosition.BOTTOM:
      position.x = horizontalMiddle;
      position.y = verticalBottom;
      break;
    case EPivotPosition.BOTTOM_RIGHT:
      position.x = horizontalRight;
      position.y = verticalBottom;
      break;
  }
  return position;
}
