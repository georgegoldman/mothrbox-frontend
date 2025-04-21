'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
// import other components...

const schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Confirm Password must be at least 6 characters' }),
  // ... add the rest
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });;

type FormValues = z.infer<typeof schema>;


export default function Signup() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values: FormValues) => {
        try {
          // await signup logic here
          const { confirmPassword, ...signupData } = values;

          toast({ title: 'Success!' });
          router.push('/');
        } catch (err) {
          toast({ title: 'Failed', description: 'Could not sign up', variant: 'destructive' });
        }
      };

    return (
        <div className="" style={{height: "100vh"}}>
            <div className="row py-5">
                <div className="col-12 d-flex justify-content-center">
                    
                    <div className="col-4">
                        <div className="row py-5">
                            <div className="col-12 rounded py-5" style={{
                                backgroundColor: "#F9F9F9"
                            }}>

                                <h1 className='d-flex justify-content-center'>Welcome to Mothrbox!</h1>
                                <div className="col-12">
                                    <div className="row d-flex justify-content-center py-5">
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="col-md-9 px-5 py-5">
                                        {/* Form Fields */}
                                        <div className="mb-3 input-group-lg">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">Email*</label>
                                            <input {...form.register('email')} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                                            {form.formState.errors.email && (
                                            <small className="text-danger">{form.formState.errors.email.message}</small>
                                            )}
                                        </div>
                                        <div className="mb-3 input-group-lg">
                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Password*</label>
                                            <input {...form.register('password')} type="password" className="form-control" id="exampleFormControlInput1" 
                                            //  aria-describedby="inputGroup-sizing-lg"
                                            placeholder="############" />
                                            {form.formState.errors.password && (
                                            <small className="text-danger">{form.formState.errors.password.message}</small>
                                            )}  
                                        </div>

                                        <div className="mb-3 input-group-lg">
                                            <label className="form-label">Confirm Password*</label>
                                            <input
                                            {...form.register('confirmPassword')}
                                            type="password"
                                            className="form-control"
                                            placeholder="############"
                                            />
                                            {form.formState.errors.confirmPassword && (
                                            <small className="text-danger">{form.formState.errors.confirmPassword.message}</small>
                                            )}
                                        </div>

                                        <div className="input-group-lg">
                                            <Button className='btn col-12 ' style={{backgroundColor: "#7D78FF !important"}} type="submit">Sign Up</Button>
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
    )
}