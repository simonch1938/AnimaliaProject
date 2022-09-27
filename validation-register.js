const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input')

const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{8,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,10}$/ // 7 a 14 numeros.
}

const campos = {
	usuario: false,
	nombre: false,
	password: false,
	correo: false,
}

const validarformulario = (e) =>{
	switch (e.target.name) {
		case "usuario":
			validarcampo(expresiones.usuario, e.target, 'usuario');
			break;
		case "nombre":
			validarcampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "correo":
		    validarcampo(expresiones.correo, e.target, 'correo');
		break;
		case "password":
		    validarcampo(expresiones.password,e.target, 'password');
			validarpassword();
		break;
		case "password-repeat":
		    validarpassword();
		break;

	}
}

const validarpassword = () =>{
	const inputpassword1 = document.getElementById('password');
	const inputpassword2 = document.getElementById('password-repeat');
 
	if (inputpassword1.value !== inputpassword2.value){
		document.getElementById(`grupo__password-repeat`).classList.remove('formulario__grupo-correcto');
		document.getElementById(`grupo__password-repeat`).classList.add('formulario__grupo-incorrecto');
		document.querySelector(`#grupo__password-repeat i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo__password-repeat i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo__password-repeat .formulario__input-error`).classList.add('formulario__input-error-active');
		campos[campo] = false;
	}else{
		document.getElementById(`grupo__password-repeat`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password-repeat`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password-repeat i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo__password-repeat i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo__password-repeat .formulario__input-error`).classList.remove('formulario__input-error-active');
		campos[campo] = true;
	}
}

const validarcampo = (expresion,input,campo) =>{
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-active');
		campos[campo] = true;
	}else{
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-active');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarformulario);
	input.addEventListener('blur', validarformulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.usuario && campos.nombre && campos.password && campos.correo && terminos.checked){
		formulario.reset();
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto')
		})
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
	}else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}


});