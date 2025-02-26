'use client';
import Form from "../../../ui/Form";
import AppLayout from "../../layouts/layout";


const CreateBook = () => { 

    return (
        <AppLayout middleware="auth">

        <Form/>
        </AppLayout>
    );
}


export default CreateBook