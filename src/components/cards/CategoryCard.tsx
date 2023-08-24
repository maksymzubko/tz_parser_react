import React from 'react';
import { Badge } from '@/components/ui/badge.tsx';
import { TrashIcon } from 'lucide-react';

interface Props {
  name: string;
  onDelete: () => void;
}

const CategoryCard = ({ name, onDelete }: Props) => {
  return (
    <Badge className={'group select-none relative overflow-hidden'}>
      {name}
      <div
        className={
          'group-hover:opacity-100 group-hover:z-50 z-[-10] opacity-0 flex transition ease-in-out translate-x-[-50%] translate-y-[-50%] left-1/2 top-1/2 absolute w-full h-full bg-dark-3 dark:bg-light-2 items-center justify-center'
        }
      >
        <TrashIcon onClick={onDelete} className={'cursor-pointer'} />
      </div>
    </Badge>
  );
};

export default CategoryCard;
