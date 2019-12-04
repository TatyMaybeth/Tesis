import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../../servicios/usuarios.service';
import { Router } from '@angular/router';
// Para validar el formulario
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/share/user.class';
// para visualizar carga o mensajes
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.page.html',
  styleUrls: ['./personal.page.scss'],
})
export class PersonalPage implements OnInit {

  // recibe valores de las redes sociales
  nombre: string;
  apellido: string;
  email: string;
  user: User; // usuario del form que se guardara en la bdd real time
  regForm: FormGroup;
  validation_messages = {
    'nombre': [
      { type: 'required', message: 'Nombre es requerido' }
    ],
    'apellido': [
      { type: 'required', message: 'Apellido es requerido' }
    ],
    'email': [
      { type: 'required', message: 'Email es requerido' },
      { type: 'pattern', message: 'Ingrese un email válido' }
    ],
    'date': [
      { type: 'required', message: 'Fecha es requerida' }
    ],
    'peso': [
      { type: 'required', message: 'Peso es requerido' },
      { type: 'min', message: 'Peso contiene valores entre 30 y 200 kg' },
      { type: 'max', message: 'Peso contiene valores entre 30 y 200 kg' }
    ],
    'altura': [
      { type: 'required', message: 'Altura es requerido' },
      { type: 'min', message: 'Altura contiene valores entre 130 y 220 cm' },
      { type: 'max', message: 'Altura contiene valores entre 130 y 220 cm' }
    ],
  };
  constructor(private userService: UsuariosService, private AFauth: AngularFireAuth,
    public router: Router, private formBuilder: FormBuilder, public toastController: ToastController,
    public loadingController: LoadingController) {
    this.AFauth.authState.subscribe(usuario => {
      if (usuario.displayName) {
        const name = usuario.displayName.split(' ');
        this.nombre = name[0];
        this.apellido = name[1];
      } else {
        this.nombre = '';
        this.apellido = '';
      }
      this.email = usuario.email;
    });
  }

  ngOnInit() {
    this.regForm = this.createFormGroup();
  }

  createFormGroup() {
    return this.formBuilder.group({
      genero: new FormControl('mujer', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      objetivo: new FormControl('perder peso', Validators.required),
      date: new FormControl('1994-09-21', Validators.required),
      peso: new FormControl('', Validators.compose([
        Validators.required, Validators.min(30) , Validators.max(200)
      ])),
      altura: new FormControl('', Validators.compose([
        Validators.required, Validators.min(130) , Validators.max(220)
      ])),
    });
  }

  registrar() {
    this.user = this.regForm.value;
    // console.log(this.user);
    this.AFauth.authState.subscribe(auth => {
      this.userService.generic_register(auth, this.user).then(() => {
        this.OKToast();
        this.router.navigate(['/tabs/home']);
      });
    });
  }

  /* MENSAJES TOAST y LOADER*/
  async OKToast() {
    const toast = await this.toastController.create({
      message: 'Bienvenido: Usuario logeado con exito',
      duration: 2000,
      color: 'dark',
      position: 'middle',
      animated: true
    });
    toast.present();
  }

 
}
