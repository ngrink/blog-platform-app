import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, FormControl, FormHelperText, FormLabel, Heading, HStack, Input, Text } from '@chakra-ui/react';

import { AuthAPI } from "../../../modules/auth";
import { RequiredMark } from '../../components/RequiredMark/RequiredMark';
import cl from './LoginScreen.module.scss';


export const LoginScreen = () => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        const { login, password } = data;
        await AuthAPI.login(login, password);
        navigate("/");
    }

    return (
        <Box className={cl.loginScreen}>
            <Box className={cl.formWrapper}>
                <Heading size="lg" color="#555" pb="16px">
                    Авторизация
                </Heading>
                <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name='login'
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <FormControl {...field}>
                                <FormLabel>
                                    Логин<RequiredMark/>
                                </FormLabel>
                                <Input borderColor={errors.login && "red"} />
                                {errors.login && <FormHelperText color="red.400">Поле обязательно к заполнению</FormHelperText>}
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
                                <Input type="password" borderColor={errors.password && "red"} />
                                {errors.password && <FormHelperText color="red.400">Поле обязательно к заполнению</FormHelperText>}

                            </FormControl>
                        )}
                    />
                    <Button disabled={!isValid} type="submit" w="100%" colorScheme="teal">
                        Авторизоваться
                    </Button>
                    <HStack gap="0px">
                        <Text>Нет аккаунта?</Text>
                        <Link to="/register" className={cl.link}>Зарегистрироваться</Link>
                    </HStack>
                </form>
            </Box>
        </Box>
    )
}
