//como declarar variavel 

var nome = "Bruna"; //literal
var nome1 = 'Bruna'; //literal
var numero = 20
var numero1 = 20.5

let x //pesquisar
const pi = 3.14 // não altera

nome = 25 //dinamicamente tipada -> muda o tipo sem precisar mudar a declaração

var soma = numero + numero1

console.log(soma) // imprime

//if e else 
if(soma <= 20){
    console.log("entrou no if")
}
else{
    console.log("entrou no else")
}

//for
for(let i = 0; i < 20; i++){
    console.log(i)
}

//função
function CalculaArea(num1, num2){
    let area = num1 + num2
    return area
}

var resposta = CalculaArea(10,20)
console.log(resposta)

function calcularSalario(){
    //pegar do html pelo id do elemento
    var salarioRec = parseFloat(document.getElementById("salarioBruto").value); //todas informações que entram no js entram como String

    var resposta = `R$ ${salarioRec}`

    document.getElementById("resposta").innerHTML=resposta; //enviar para o html    


}
