'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      // Replace with your login logic
      console.log('Login form values:', values);

      toast({ title: 'Login successful' });
      router.push('/dashboard'); // Change path to wherever you want to go after login
    } catch (err) {
      toast({
        title: 'Login failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="" style={{ height: '100vh' }}>
      <div className="row py-5">
        <div className="col-12 d-flex justify-content-center">
          <div className="col-4">
            <div className="row py-5">
              <div
                className="col-12 rounded py-5"
                style={{
                  backgroundColor: '#F9F9F9',
                }}
              >
                <h1 className="d-flex justify-content-center">Welcome Back!</h1>
                <div className="col-12">
                  <div className="row d-flex justify-content-center py-5">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="col-md-9 px-5 py-5">
                      <div className="mb-3 input-group-lg">
                        <label htmlFor="email" className="form-label">
                          Email*
                        </label>
                        <input
                          {...form.register('email')}
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="name@example.com"
                        />
                        {form.formState.errors.email && (
                          <small className="text-danger">{form.formState.errors.email.message}</small>
                        )}
                      </div>

                      <div className="mb-3 input-group-lg">
                        <label htmlFor="password" className="form-label">
                          Password*
                        </label>
                        <input
                          {...form.register('password')}
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="############"
                        />
                        {form.formState.errors.password && (
                          <small className="text-danger">{form.formState.errors.password.message}</small>
                        )}
                      </div>

                      <div className="input-group-lg">
                        <Button className="btn col-12" style={{ backgroundColor: '#7D78FF' }} type="submit">
                          Login
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
