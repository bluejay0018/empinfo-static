import { ChevronUpIcon, ChevronDownIcon } from '../Icons/icons';

interface SortIconProps {
  col: string;
  sortCol: string;
  sortDir: 'asc' | 'desc';
}

const SortIcon = ({ col, sortCol, sortDir }: SortIconProps) => {
  if (col !== sortCol) return null;
  return sortDir === 'asc' ? <ChevronUpIcon /> : <ChevronDownIcon />;
};

export default SortIcon;
