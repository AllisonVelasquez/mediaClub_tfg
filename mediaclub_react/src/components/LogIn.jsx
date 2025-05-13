import  { useState } from 'react';
import {logIn} from '../services/axios';

const LogIn =() =>{
    const [formData,setFormData]=useState({
        usuario: '',
        password:''
    })
    
}