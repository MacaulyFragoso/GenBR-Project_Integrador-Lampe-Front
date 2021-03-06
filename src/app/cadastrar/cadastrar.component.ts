import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../model/UsuarioModel';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  usuarioModel: UsuarioModel = new UsuarioModel();
  confirmarSenha: string;

  constructor(private authService: AuthService, private router: Router, private alertas: AlertasService) {}

  ngOnInit() {
    window.scroll(0, 0);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  noPicture(){
    this.usuarioModel.foto = 'https://i.imgur.com/Avqx7ov.jpg' 
  }

  cadastrar() {
    if(this.usuarioModel.foto == null){
      this.noPicture()
    }
    if (this.usuarioModel.senhaUsuario != this.confirmarSenha) {
      this.alertas.showAlertType('As senhas estão diferentes');
    } else {
      this.authService
        .cadastrar(this.usuarioModel)
        .subscribe((resp: UsuarioModel) => {
          this.usuarioModel = resp;
          this.router.navigate(['/entrar']);
          this.alertas.showAlertType('Usuario cadastrado com sucesso!');
        }, erro=>{
      if(erro.status == 400){
        this.alertas.showAlertType('Este usuário já está cadastrado!')
      }
    });
    }
  }
}
