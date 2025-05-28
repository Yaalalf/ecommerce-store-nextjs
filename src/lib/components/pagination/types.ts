export interface IPaginationProps {
  length: number;
  initialPage?: number;
  onChange?: (page: number) => void;
}
