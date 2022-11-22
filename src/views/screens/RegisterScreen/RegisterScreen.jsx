import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Text } from '@chakra-ui/react'

import cl from './RegisterScreen.module.scss';
import { RequiredMark } from '../../components/RequiredMark/RequiredMark';
import { AccountAPI } from '../../../modules/accounts/account.api';


export const RegisterScreen = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        const { fullname, username, email, password } = data;
        await AccountAPI.createAccount( fullname, username, email, password, password);
        navigate("/login");
    }

    return (
        <Box className={cl.registerScreen}>
            <Box className={cl.formWrapper}>
                <Heading size="lg" color="#555" pb="16px">
                    Регистрация
                </Heading>
                <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='fullname'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormControl {...field}>
                                <FormLabel>
                                    Полное имя<RequiredMark/>
                                </FormLabel>
                                <Input placeholder='John Doe' borderColor={errors.fullname && "red"} />
                                {errors.fullname && <FormHelperText color="red.400">Поле обязательно к заполнению</FormHelperText>}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name='username'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormControl {...field}>
                                <FormLabel>
                                    Никнейм<RequiredMark/>
                                </FormLabel>
                                <Input placeholder='jonhdoe' borderColor={errors.username && "red"} />
                                {errors.username && <FormHelperText color="red.400">Поле обязательно к заполнению</FormHelperText>}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name='email'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormControl {...field}>
                                <FormLabel>
                                    Почтовый адрес<RequiredMark/>
                                </FormLabel>
                                <Input placeholder='jonhdoe@example.com' type="email" borderColor={errors.email && "red"} />
                                {errors.email && <FormHelperText color="red.400">Поле обязательно к заполнению</FormHelperText>}
                            </FormControl>
                        )}
                    />
                    <Controller
                        name='password'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormControl {...field}>
                                <FormLabel>
                                    Пароль<RequiredMark/>
                                </FormLabel>
                                <Input placeholder='********' type="password" borderColor={errors.password && "red"} />
                                {errors.password && <FormHelperText color="red.400">Поле обязательно к заполнению</FormHelperText>}
                            </FormControl>
                        )}
                    />
                    <Button disabled={!isValid} type="submit" w="100%" colorScheme="teal">
                        Зарегистрироваться
                    </Button>
                    <HStack gap="0px">
                        <Text>Уже есть аккаунт?</Text>
                        <Link to="/login" className={cl.link}>Авторизоваться</Link>
                    </HStack>
                </form>
            </Box>
        </Box>
    )
}
