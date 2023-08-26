import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { LoginValidation } from '@/lib/validations/login.ts';
import Loader from '@/components/ui/Loader.tsx';
import { useToast } from '@/components/ui/use-toast.ts';
import { AxiosError } from 'axios';
import { useLoginMutation } from '@/redux/api/authApi.ts';

const LoginForm = () => {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const [logIn, { isLoading }] = useLoginMutation();

  const onSubmit = async (values: zod.infer<typeof LoginValidation>) => {
    try {
      await logIn({ username: values.username, password: values.password }).unwrap();
    } catch (error) {
      const err = error as AxiosError<{ errors: { field: 'username' | 'password'; message: string }[] | undefined }>;
      if (err.response && err.response.data.errors) {
        err.response.data.errors.forEach((d) => {
          form.setError(d.field, { message: d.message });
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
    <section className={'p-5 w-full bg-light-2 dark:bg-dark-4 max-w-[400px] rounded-2xl'}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} autoComplete={'off'} className="flex flex-col gap-10">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className={''}>
                <FormLabel className={'[:not(invalid)]:text-dark-3 :not(invalid)]:dark:text-light-1'}>Логін</FormLabel>
                <FormControl>
                  <Input type={'text'} disabled={isLoading} placeholder={'Ваш логін'} className={''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={'[:not(invalid)]:text-dark-3 :not(invalid)]:dark:text-light-1'}>Пароль</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} type={'password'} placeholder={'Ваш пароль'} className={''} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className={'w-full flex items-end justify-center gap-4'}>
            <Button type={'submit'} disabled={form.formState.isSubmitting} className={'w-[60%]'}>
              {isLoading ? <Loader /> : 'Увійти'}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
};

export default LoginForm;
