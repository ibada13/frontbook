'use client';
import Form from "../../../ui/Form";
import AppLayout from "../../layouts/layout";
import { postform } from "./function";

const CreateBook = () => { 

    return (
        <AppLayout middleware="auth">

        <Form onSubmit={postform}/>
        </AppLayout>
    );
}


export default CreateBook