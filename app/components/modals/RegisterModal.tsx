"use client"
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc"
import { useCallback,useState } from "react";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form'
import useLoginModal from "@/app/hooks/UseLoginModal";
import useRegisterModal from "@/app/hooks/UseRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";


const RegisterModal = () => {
    const registerModal = useRegisterModal()
    const [isLoding,setIsLoading] = useState(false)
    const loginModal = useLoginModal()
    const {
        register,
        handleSubmit,
        formState : {
            errors,
        }
    } = useForm <FieldValues>({
        defaultValues : {
           name : '' ,
           email : '',
           password : '' 
        }
    });

    const onSubmit : SubmitHandler<FieldValues> = (data) =>{
       setIsLoading(true);
       axios.post ('api/register',data)
       .then(()=>{
        toast.success('Success')
        registerModal.onClose()
        loginModal.onOpen()
       })
       .catch((error)=>{
        toast.error('Something Went Wrong')
       })
       .finally(()=>{
        setIsLoading(false)
       })
    }
    const toggle = useCallback(()=>{
        loginModal.onOpen()
        registerModal.onClose();

    }, [registerModal, loginModal])
    const bodyContent = (
        <div className="flex  flex-col gap-4">
           <Heading
           title="Welcome to airbnb"
           subtitle="create an account"
           />
           <Input
           id="email"
           label="Email"
           disabled={isLoding}
           register={register}
           errors={errors}
           required
           />
            <Input
           id="name"
           label="Name"
           disabled={isLoding}
           register={register}
           errors={errors}
           required
           />
            <Input
           id="password"
           label="Password"
           disabled={isLoding}
           register={register}
           errors={errors}
           required
           />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr/>
            <Button
            outline
            label="Continue with google"
            icon={FcGoogle}
            onClick={()=>signIn('google')}
            />
             <Button
            outline
            label="Continue with github"
            icon={AiFillGithub}
            onClick={()=>signIn('github')}
            />
            <div className="text-neutral-500 text-center mt-4 font-light">
                  <div className="justify-center flex flex-row items-center gap-2">
                    <div>
                       Already Have An Account
                    </div>
                    <div onClick={toggle} className="text-neutral-500 cursor-pointer hover:underline">
                       Log in
                    </div>
                  </div>
            </div >

        </div>
    )


    return ( 
       <Modal
       disabled = {isLoding}
       isOpen ={registerModal.isOpen}
       title="Register"
       actionLabel="Continue"
       onClose={registerModal.onClose}
       onSubmit={handleSubmit(onSubmit)}
       body = {bodyContent}
       footer={footerContent}
       />
       
     );
}
 
export default RegisterModal;