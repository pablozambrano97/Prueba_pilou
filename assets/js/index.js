const nombre_usuario=document.getElementById("user_name");
const edad=document.getElementById("age");
const numero_telefono=document.getElementById("displayed_phone_number");
const foto_perfil=document.getElementById("profile_photo");
const email=document.getElementById("email");
const carino_nombre=document.getElementById("username_carino");
const btn_registrar=document.getElementById("btn_registrar");
const toastr=document.getElementById("toastr");
let nombre=null;
let edad_usuario= null
let telefono=null;
let imagen=null;
let correo=null;
let nick=null;
let api=null;
async function get_contacts(){
    try {
        const res=await fetch("http://127.0.0.1:8000/contacts")
        const data= await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }
};

async function consult_contact_email(email){
    try {
        const res=await fetch(`http://127.0.0.1:8000//contacts/<${email}>`)
        const data=await res.json();
        return data;
    } catch (error) {
        console.log(error.message);
    }

}

async function consult_contact_email(phone){
    try {
        const res=await fetch(`http://127.0.0.1:8000//contacts/<${phone}>`)
    const data=await res.json();
    return data;
    } catch (error) {
        console.log(error.message);
    }
}

async function agregar_contact(name, age, phone, photo, email, nick){
    let myInit = {
        method: "POST",
        headers: myHeaders,
        mode: "cors",
        cache: "default",
    };
    try {
        const res=await fetch(`http://127.0.0.1:8000//contacts/<${phone}>`,myInit)
        const data=await res.json();
    return data;
    } catch (error) {
        console.log(error.message);
    }
}

const openToastr=(typeMessage, message)=>{
    toastr.style.display='flex';
    toastr.innerHTML=message;
    toastr.classList.add=(typeMessage);
    closeToastr(typeMessage);
}

const closeToastr = (typeMessage)=>{
    setTimeout(()=>{
        toastr.style.display='none';
        toastr.classList.remove(typeMessage);
    },2500)
};

nombre_usuario.addEventListener("change", event=>{
    nombre=nombre_usuario.value;
});
edad.addEventListener("change", event=>{
    if(edad.value>=18){
        edad_usuario=edad.value;
    }else{
        alert("Debe ser mayor de 18 años");
    }
});
foto_perfil.addEventListener("change", event=>{
    imagen=foto_perfil.files[0];
});

email.addEventListener("change", event=>{
    if((email.value).includes('@')){
        correo = email.value;
    }else{
        alert("correo electronio invalido");
    }
});

numero_telefono.addEventListener("change", event=>{
    if((numero_telefono.value).length>10){
        console.log("ingrese un número de telefono valido");
    }else if((numero_telefono.value).length==10){
        telefono=numero_telefono.value;
    }
});

carino_nombre.addEventListener("change", event=>{
    nick=carino_nombre.value;
});

btn_registrar.addEventListener("click", event=>{
    let consult_email=consult_contact_email(correo);
    let consult_phone=consult_contact_phone(telefono);
    
    if((consult_email[0].findIndex(correo))==(-1) && (consult_phone[0].findIndex(phone))==(-1)){
        agregar_contact(nombre,edad_usuario,telefono,imagen,correo,nick);
        openToastr('success', 'Registro Exitoso ✅');

    }else if((consult_email[0].findIndex(correo))!=(-1)){
        openToastr('error', 'Correo ya registrado en la pagina debes usar un correo electronico diferente ❌');
    }else if((consult_phone[0].findIndex(phone))!=(-1)){
        openToastr('error', 'número de telefóno ya registardo en la pagina debes usar un número telefónico diferente ❌');
    }
});

//api=get_contacts();