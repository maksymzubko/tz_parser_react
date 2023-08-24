import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog.tsx';
import Loader from '@/components/ui/Loader.tsx';

interface Props {
  description: string;
  title: string;
  btnCancelName?: string;
  btnActionName?: string;
  isActionLoading?: boolean;
  onCancel?: () => void;
  onSubmit?: () => void;
  children: any;
}

const YesNoDialog = ({
  description,
  title,
  isActionLoading,
  btnActionName,
  btnCancelName,
  onCancel,
  onSubmit,
  children
}: Props) => {
  const onClickCancel = () => {
    if (onCancel) onCancel();
  };

  const onClickSubmit = () => {
    if (onSubmit) onSubmit();
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={'text-dark-3 dark:text-light-1'}>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={'text-dark-3 dark:text-light-1'} onClick={onClickCancel}>
            {btnCancelName ?? 'Cancel'}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onClickSubmit}>
            <span className={`${isActionLoading ? 'hidden' : 'flex'}`}>{btnActionName ?? 'Continue'}</span>
            {isActionLoading && <Loader />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default YesNoDialog;
