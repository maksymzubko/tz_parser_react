import { Button } from '@/components/ui/button.tsx';
import { PageMeta } from '@/redux/api/types/article.types.ts';

interface Props {
  meta: PageMeta;
  onNext: () => void;
  onPrev: () => void;
}

const Pagination = ({ meta, onNext, onPrev }: Props) => {
  return (
    <div className={'flex gap-4 items-center justify-center'}>
      <Button disabled={!meta.hasPreviousPage} onClick={onPrev}>
        {meta.hasPreviousPage ? meta.page - 1 : meta.page}
      </Button>
      {meta.hasNextPage && meta.hasPreviousPage && <Button disabled>{meta.page}</Button>}
      <Button disabled={!meta.hasNextPage} onClick={onNext}>
        {meta.hasNextPage ? meta.page + 1 : meta.page}
      </Button>
    </div>
  );
};

export default Pagination;
