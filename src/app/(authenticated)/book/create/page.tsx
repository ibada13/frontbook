'use client';
import Form from "../../../(optional)/books/ui/Form";
import AppLayout from "../../layouts/layout";


const CreateBook = () => { 

    return (
        <AppLayout middleware="auth">

        <Form/>
        </AppLayout>
    );
}


export default CreateBook