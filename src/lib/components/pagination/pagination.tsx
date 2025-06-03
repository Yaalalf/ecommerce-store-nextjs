"use client";
import { useMemo, useState } from "react";
import Button from "../button";
import { List } from "../structure";
import { IPaginationProps } from "./types";
import { Row } from "../layout";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { clamp } from "@/lib/utils/numeric_utility";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const PAGINATION_INITIAL_PAGE = 1;
/**
 * Cantidad de paginas a ver en el centro de la paginacion
 */
const PAGINATION_MIDDLE_QTY_PAGES = 1;
/**
 * Numero que representa los dots en las pages
 */
const PAGINATION_DOT_PAGES = 1;
export default function Pagination({
  initialPage = 1,
  showNextControls = false,
  showLastControls = false,
  pagesLength,
  boundaries = 1,
  siblings = 1,
  paginationJump = 5,
  onChange,
}: IPaginationProps) {
  const [selectedPage, setSelectedPage] = useState(initialPage);

  let currentBoundaries = boundaries;
  let currentSiblings = siblings;

  /**
   * Validando que los boundaries y siblings esten en el rango de los length
   * */
  if (
    boundaries * 2 + siblings * 2 + PAGINATION_MIDDLE_QTY_PAGES >
    pagesLength
  ) {
    currentBoundaries = 0;
    currentSiblings = 0;

    console.warn(
      "the pagination boundaries and siblings together exceed the length"
    );
  }
  /**
   * Crea la data de las paginas comenzando desde 1 hasta el numero especificado por pagesLength
   */
  const paginationDataItems = useMemo(
    () =>
      Array(pagesLength)
        .fill(1)
        .map((data, index) => index + 1),
    [pagesLength]
  );

  const isFirstIndex = selectedPage === PAGINATION_INITIAL_PAGE;
  const isLastIndex = selectedPage === pagesLength;

  const boundariesInitIndex = 0 + currentBoundaries;
  const boundariesEndIndex = pagesLength - currentBoundaries;

  const selectedPageIndex = selectedPage - currentBoundaries;
  const paginationDataSizeLength = boundariesEndIndex - boundariesInitIndex;

  /**
   * Revisa si el indice actual de paginacion es mayor que la mitad de las paginas a ver,
   * en el caso de ser verdadero significa que hay que
   * esconder parte de las paginas y mostrar el boton de ... al principio de la paginacion
   * el comportamiento es que el boton ... visualmente sustituye a una page
   */
  const isPagesVisibleMinIndex =
    selectedPage >
    boundariesInitIndex +
      currentSiblings +
      PAGINATION_MIDDLE_QTY_PAGES +
      PAGINATION_DOT_PAGES;

  /**
   * Revisa si el indice actual de paginacion es menor que la mitad de las paginas a ver,
   * en el caso de ser verdadero significa que hay que
   * esconder parte de las paginas y mostrar el boton de ... al final de la paginacion
   * el comportamiento es que el boton ... visualmente sustituye a una page
   */
  const isPagesVisibleMaxIndex =
    selectedPage <=
    boundariesEndIndex -
      currentSiblings -
      PAGINATION_MIDDLE_QTY_PAGES -
      PAGINATION_DOT_PAGES;

  const pagesVisibleInitIndex = isPagesVisibleMinIndex
    ? isPagesVisibleMaxIndex
      ? selectedPageIndex - (currentSiblings + PAGINATION_DOT_PAGES)
      : paginationDataSizeLength -
        (currentSiblings * 2 +
          PAGINATION_MIDDLE_QTY_PAGES +
          PAGINATION_DOT_PAGES)
    : 0;
  const pagesVisibleEndIndex = isPagesVisibleMinIndex
    ? isPagesVisibleMaxIndex
      ? selectedPageIndex + currentSiblings
      : pagesLength
    : currentSiblings * 2 + PAGINATION_MIDDLE_QTY_PAGES + PAGINATION_DOT_PAGES;
  /**
   * La cantidad de las pages que seran para los boundaries inicial y final.
   */
  const paginationDataInitBoundaries = paginationDataItems.slice(
    0,
    currentBoundaries
  );
  const paginationDataEndBoundaries = paginationDataItems.slice(
    pagesLength - currentBoundaries
  );
  /**
   * Las pages que se veran entre los boundaries
   */
  const paginationDataSizeVisible = paginationDataItems
    .slice(currentBoundaries, pagesLength - currentBoundaries)
    .slice(pagesVisibleInitIndex, pagesVisibleEndIndex);

  function handlePaginationIndex(page: number, isBoundary: boolean) {
    if (isBoundary) {
      return;
    }
    setPaginationIndex(page);
  }
  function setPaginationIndex(page: number) {
    if (onChange) {
      onChange(page);
    }
    setSelectedPage(page);
  }
  return (
    <Row className="pagination">
      {showLastControls && (
        <Button
          icon={<FaAnglesLeft />}
          onClick={() => {
            handlePaginationIndex(PAGINATION_INITIAL_PAGE, isFirstIndex);
          }}
          disabled={isFirstIndex}
        />
      )}
      {showNextControls && (
        <Button
          icon={<FaChevronLeft />}
          onClick={() => {
            handlePaginationIndex(selectedPage - 1, isFirstIndex);
          }}
          disabled={isFirstIndex}
        />
      )}

      {paginationDataInitBoundaries && (
        <List
          align="center"
          justify="center"
          data={paginationDataInitBoundaries}
        >
          {(item) => (
            <Button
              onClick={() => {
                setPaginationIndex(item);
              }}
              severity={selectedPage === item ? "primary" : "base"}
            >
              {item}
            </Button>
          )}
        </List>
      )}

      {isPagesVisibleMinIndex && (
        <Button
          icon={<BiDotsHorizontalRounded />}
          onClick={() => {
            setPaginationIndex(
              clamp(
                selectedPage - paginationJump,
                PAGINATION_INITIAL_PAGE,
                pagesLength
              )
            );
          }}
          disabled={isFirstIndex}
        />
      )}

      <List align="center" justify="center" data={paginationDataSizeVisible}>
        {(item) => (
          <Button
            onClick={() => {
              setPaginationIndex(item);
            }}
            severity={selectedPage === item ? "primary" : "base"}
          >
            {item}
          </Button>
        )}
      </List>
      {isPagesVisibleMaxIndex && (
        <Button
          icon={<BiDotsHorizontalRounded />}
          onClick={() => {
            setPaginationIndex(
              clamp(
                selectedPage + paginationJump,
                PAGINATION_INITIAL_PAGE,
                pagesLength
              )
            );
          }}
          disabled={isLastIndex}
        />
      )}
      {paginationDataEndBoundaries && (
        <List
          align="center"
          justify="center"
          data={paginationDataEndBoundaries}
        >
          {(item) => (
            <Button
              onClick={() => {
                setPaginationIndex(item);
              }}
              severity={selectedPage === item ? "primary" : "base"}
            >
              {item}
            </Button>
          )}
        </List>
      )}
      {showNextControls && (
        <Button
          icon={<FaChevronRight />}
          onClick={() => {
            handlePaginationIndex(selectedPage + 1, isLastIndex);
          }}
          disabled={isLastIndex}
        />
      )}
      {showLastControls && (
        <Button
          icon={<FaAnglesRight />}
          onClick={() => {
            handlePaginationIndex(pagesLength, isLastIndex);
          }}
          disabled={isLastIndex}
        />
      )}
    </Row>
  );
}
