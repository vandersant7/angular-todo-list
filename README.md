# Lista de Tarefas (ToDo List)

Esse projeto foi criado usando a versão [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Como executar esse projeto em seu computador

Faça um fork ou download desse projeto para seu computador. Escolha sua IDE de preferência e rode o seguinte comando: `ng s o`.

## Objetivo

Embora criar uma lista de tarefas possa parecer um projeto básico, este é um ótimo exercício para implementar as operações de CRUD (Create, Read, Update e Delete).

## Dificuldades enfretadas

Inicialmente, tive algumas dificuldades, como:

- Obter o valor do input. Porém, uma boa pesquisa no StackOverflow e na documentação do Angular me ajudaram a resolver esse problema. Após a refatoração, outros erros surgiram na aplicação.

Por exemplo, no arquivo 'todolist.component.html' encontrei o erro: "Can't bind to 'formGroup' since it isn't a known property of 'form'". Ao pesquisar no StackOverflow, descobri que, por estar trabalhando com formulários reativos, precisava importar o módulo 'ReactiveFormsModule' no 'app.module.ts'.

Para melhorar a manutenibilidade e a compreensão do código, decidi separar as responsabilidades. Inicialmente, todo o código e a regra de negócio estavam concentrados no arquivo 'todolist.component.ts'.

Para organizar melhor o projeto, criei um novo diretório chamado 'model' e outro chamado 'services'. No diretório 'model', criei um arquivo chamado 'todomodel.ts' para servir como modelo de dados para as tarefas.

No diretório 'services', criei um novo serviço usando o comando `ng g s`. Nesse serviço, concentrei toda a lógica de adicionar itens à lista, atualizar e excluir tarefas. Além disso, implementei a lógica de salvar as tarefas no localStorage.

Essa separação de responsabilidades tornou o código mais modular e fácil de manter. Agora, o componente 'todolist.component.ts' fica responsável apenas pela interação do usuário, enquanto o serviço cuida da lógica de negócio.

Apesar desses desafios iniciais, consegui implementar com sucesso as funcionalidades de CRUD na minha lista de tarefas. O projeto, embora simples, me permitiu colocar em prática conceitos importantes do Angular.

## 🔗 Links importantes

### Solução para os erros encontrados

[Property '...' has no initializer and is not definitely assigned in the constructor](https://stackoverflow.com/questions/49699067/property-has-no-initializer-and-is-not-definitely-assigned-in-the-construc)  
[Can't bind to 'formGroup' since it isn't a known property of 'form'](https://stackoverflow.com/questions/39152071/cant-bind-to-formgroup-since-it-isnt-a-known-property-of-form)  
[FormGroup](https://v17.angular.io/api/forms/FormGroup#description)  
[FormControlName](https://v17.angular.io/api/forms/FormControlName)

### Código antes da refatoração

Inicialmente, concencetrei toda a regra no 'todolist.component.ts'. Veja o resultado abaixo e compare com a versão final.

```typescript
interface TaskModel {
  taskName: string;
  isCompleted: boolean;
}

@Component({
  selector: "app-todolist",
  templateUrl: "./todolist.component.html",
  styleUrl: "./todolist.component.scss",
})
export class TodolistComponent implements OnInit {
  taskArray: TaskModel[] = [];

  ngOnInit(): void {
    this.GetAll();
  }

  onSubmit(form: NgForm) {
    this.taskArray.push({
      taskName: form.controls["task"].value,
      isCompleted: false,
    });

    this.Save();

    form.reset();
  }

  onDelete(index: number) {
    this.taskArray.splice(index, 1);
    this.Save();
  }

  onChecked(index: number) {
    console.log(this.taskArray);

    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.Save();
  }

  Save() {
    localStorage.setItem("todo", JSON.stringify(this.taskArray));
  }

  GetAll() {
    let value = localStorage.getItem("todo");
    if (value) {
      this.taskArray = JSON.parse(value);
    } else {
      this.taskArray = [{ taskName: "Adicione uma tarefa", isCompleted: false }];
    }
  }
}
```
