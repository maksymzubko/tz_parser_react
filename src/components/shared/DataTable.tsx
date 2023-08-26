import React from 'react';
import { convertDateToString } from '@/lib/utils.ts';
import { EditIcon, PlusIcon, TrashIcon, ViewIcon } from 'lucide-react';
import NoImg from '@/assets/no-img.png';
import { useNavigate } from 'react-router-dom';
import { links } from '@/router.tsx';
import YesNoDialog from '@/components/ui/yes-no-dialog.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button.tsx';
import { useDeleteArticleMutation } from '@/redux/api/articleApi.ts';
import { Article } from '@/redux/api/types/article.types.ts';

interface Props {
  data: Article[];
}

const DataTable = ({ data }: Props) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [deleteArticle, { isLoading }] = useDeleteArticleMutation();

  const onDelete = async (id: number) => {
    try {
      await deleteArticle(id.toString()).unwrap();
      toast({
        title: `Пост #${id} видалено.`,
        duration: 1500
      });
    } catch (error) {
      const err = error as AxiosError<{ errors: string[] | undefined }>;
      if (err.response && err.response.data.errors) {
        toast({
          title: 'Помилка :(',
          description: err.response.data.errors.at(0) ?? '',
          duration: 1500,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Помилка :(',
          description: 'Щось пішло не так, спробуйте ще!',
          duration: 1500,
          variant: 'destructive'
        });
      }
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[90%]">
      <div className={'flex w-full items-center justify-end mb-4'}>
        <Button
          onClick={() => navigate(links.create)}
          className={'text-body-medium font-medium flex gap-2 dark:text-dark-3 text-light-1'}>
          <PlusIcon size={20} /> Створити
        </Button>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className={'text-center'}>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Фото
            </th>
            <th scope="col" className="px-6 py-3">
              Дата
            </th>
            <th scope="col" className="px-6 py-3">
              Назва
            </th>
            <th scope="col" className="px-6 py-3">
              Вміст
            </th>
            <th scope="col" className="px-6 py-3">
              Посилання
            </th>
            <th scope="col" className="px-6 py-3">
              Налаштування
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((d) => (
              <tr key={d.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center">
                <th
                  scope="row"
                  className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white w-[100px]">
                  {d.id}
                </th>
                <td className="px-6 py-4 w-[240px]">
                  <img width={'200px'} src={d.image ?? NoImg} alt={'Image'} />
                </td>
                <td className="px-6 py-4 w-[240px]">{convertDateToString(d.date)}</td>
                <td
                  className={
                    'text-ellipsis whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[100px] px-6 py-4'
                  }>
                  {d.title}
                </td>
                <td
                  className={
                    'text-ellipsis whitespace-nowrap overflow-hidden overflow-ellipsis max-w-[100px] px-6 py-4'
                  }>
                  {d.content}
                </td>
                <td className="px-6 py-4 w-[240px]">
                  {d.sourceLink && d.sourceLink.length > 0 && (
                    <a href={d.sourceLink} target={'_blank'}>
                      Посилання
                    </a>
                  )}
                </td>
                <td className={'w-[50px] px-6 py-4'}>
                  <div className={'flex items-center justify-center gap-4 [&>*]:cursor-pointer'}>
                    <ViewIcon onClick={() => navigate(`${links.article}${d.id}`, { replace: false })} size={30} />
                    <EditIcon onClick={() => navigate(`${links.edit}${d.id}`)} size={30} />
                    <YesNoDialog
                      description={
                        'Цю дію неможливо буде відмінити. Після цього цей пост буде перманентно видалено з нашої бази данних.'
                      }
                      title={'Ви впевнені?'}
                      onSubmit={() => onDelete(d.id)}
                      isActionLoading={isLoading}
                      btnCancelName={'Відмінити'}
                      btnActionName={'Видалити'}>
                      <TrashIcon size={30} />
                    </YesNoDialog>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                colSpan={7}>
                Нічого не знайдено!
              </th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
