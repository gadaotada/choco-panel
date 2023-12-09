'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';

import { errorTrigger } from '@/lib/global-helper'
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";

const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('Name is required').min(3, 'Name has to include at least 3 characters').max(20, 'Name has to include at most 20 characters'),
    password: Yup.string().required('Password is required').min(6, 'Password has to include at least 6 characters')
});

const LoginComp = () => {

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Await the result of the validate function
            await loginValidationSchema.validate({ username, password }, { abortEarly: false });
    
            const res = await signIn('credentials', {
                username: username,
                password: password,
                redirect: false,
                callbackUrl: '/dashboard'
            });
    
            if (res?.error) {
                toast.error('Wrong Name or Password!')
            } else {
                router.push('/dashboard');
                router.refresh();
            }
           
            setError([]);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                // Handle the validation error
                const yupError = error;
                setError(yupError.errors);
                // Get the errors as a string with multiple lines
                const errorsString = yupError.errors.join('\n');
                toast.error(errorsString);
            } else {
                // Handle other types of errors
                console.error(error);
                toast.error('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='mt-4'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
                <Input 
                    type="text" 
                    placeholder="Name" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                    className={(errorTrigger(error, 'Name ') ? ' border-red-500' : ' border-input')}
                />
                <Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className={(errorTrigger(error, 'Password ') ? ' border-red-500' : ' border-input')}
                />
                <Button 
                    type="submit" 
                    disabled={loading}
                    className='mt-4'
                >
                        Вход
                </Button>
            </form>
        </div>
    )
};

export default LoginComp;