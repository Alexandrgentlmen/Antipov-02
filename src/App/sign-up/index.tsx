import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import styles from './SignUp.module.scss';
import { authSlice } from '~/store/authSlice';
import { useAppDispatch } from '~/store/hooks';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  console.log('before SignUp location', location);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: 'sasha',
      email: 'eve.holt@reqres.in',
      password: 'pistol',
      cpassword: 'pistol',
    },
  });
  interface IDataSubmit {
    name: string;
    email: string;
    password: string;
  }
  const onSubmit = (data: IDataSubmit) => {
    console.log('In Submit SignUp location', location);
    const fromPage =
      location.state?.from?.pathname ||
      location.state?.location?.pathname ||
      '/users';

    const name = data.name;
    const email = data.email;
    const password = data.password;
    dispatch(
      authSlice.thunks.authUserThunk({
        registrationPayload: { name, email, password },
        successCallback: () => {
          navigate(fromPage, { state: { location } });

          reset();
        },
      }),
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.signUp}>
        <h2 className={styles.title}>Регистрация</h2>
        <form className={styles.formTable} onSubmit={handleSubmit(onSubmit)}>
          <label className={styles.labelText} htmlFor="name">
            Имя
          </label>
          <input
            className={styles.inputMain}
            type="text"
            id="name"
            placeholder="Артур"
            {...register('username', {
              required: 'Введите имя обязательно!',
              minLength: {
                value: 5,
                message: 'Минимум 5 символов!',
              },
            })}
          />
          <div className={styles.error}>
            {errors?.username && (
              <p>{errors?.username?.message || 'Ошибка!'}</p>
            )}
          </div>
          <label className={styles.labelText} htmlFor="mail" validate="true">
            Электронная почта
          </label>
          <input
            className={styles.inputMain}
            type="email"
            id="mail"
            placeholder="example@mail.ru"
            {...register('email', {
              required: 'Введите почту обязательно!',
            })}
          />
          <div className={styles.error}>
            {errors?.email && (
              <p>{errors?.email?.message || 'Такой почты не существует!'}</p>
            )}
          </div>
          <label
            className={[styles.labelText, styles.labelText_first].join(' ')}
            htmlFor="password"
          >
            Пароль
          </label>
          <input
            className={styles.inputMain}
            type="password"
            id="password"
            {...register('password', {
              required: true,
            })}
          />
          <div className={styles.error}>
            {errors?.password && (
              <p>{errors?.password?.message || 'Вы ничего не ввели!'}</p>
            )}
          </div>
          <label className={styles.labelText} htmlFor="cpassword">
            Подтвердите пароль
          </label>
          <input
            className={styles.inputMain}
            type="password"
            id="cpassword"
            {...register('cpassword', {
              required: true,
              validate: (val) => {
                if (watch('password') !== val) {
                  return 'Пароль не совпадает!';
                }
              },
            })}
          />
          <div className={styles.error}>
            {<p>{errors?.cpassword?.message}</p>}
          </div>
          <input
            type="submit"
            className={styles.submitBtn}
            value="Зарегистрироваться"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};

export { SignUp };
