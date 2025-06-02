export interface IPaginationProps {
  pagesLength: number;
  initialPage?: number;
  /**
   * El numero de paginas a mostrar al principio y al final de la paginacion
   */
  boundaries?: number;
  /**
   * El numero de paginas a la derecha y a la izquierda que se veran aparte de las de boundaries
   */
  siblings?: number;
  /**
   * El numero de paginas a brincar al tocar en un boton de dots
   */
  paginationJump?: number;
  showNextControls?: boolean;
  showLastControls?: boolean;
  pagesVisible?: number;
  onChange?: (page: number) => void;
}
