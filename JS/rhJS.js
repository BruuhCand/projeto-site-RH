
function calculaINSS(Salario){
    
    var aux;

    if(Salario <= 1302){
        aux = Salario - (Salario * 0.075);
    }
    else if(Salario >= 1302.01 && Salario <= 2571.29){
        aux = Salario - (Salario * 0.09); 
    }
    else if(Salario >= 2571.30 && Salario <= 3856.94){
        aux = Salario - (Salario * 0.12);  
    }
    else{
        aux = Salario - (Salario * 0.14); 
    }

    return aux;
}

function calculaIRRF(novoSala){

    if(novoSala >= 2112.01 && novoSala <= 2826.65){
        novoSala = novoSala - (novoSala * 0.075) + 156.40;
    }
    else if(novoSala >= 2826.66 && novoSala <= 3751.05){
        novoSala = novoSala - (novoSala * 0.15) + 370.40;
    }
    else if(novoSala >= 3751.06 && novoSala <= 4664.68){
        novoSala = novoSala - (novoSala * 0.225) + 651.73;

    }
    else if( novoSala >= 4664.69){
        novoSala = novoSala - (novoSala * 0.275) + 884.96;

    }

    return novoSala

}

function calcularSalario(){
    var salarioRec = parseFloat(document.getElementById("salarioBruto").value); //todas informações que entram no js entram como String

    
    var adc = parseFloat(document.getElementById("outDesc").value);

    if(isNaN(adc)){
        adc = 0;
    }

    var novoSala = calculaINSS(salarioRec);

    novoSala = calculaIRRF(novoSala);

    novoSala = novoSala - adc;
    
    var resposta = `R$ ${novoSala.toFixed(2)}`

    document.getElementById("resposta").innerHTML=resposta; //enviar para o html    
}

function bloqueiaInput(){

    const select = document.getElementById("termino").value;
    //const campoParaAtivar = document.getElementById("op-aviso1");
    //const campoParaAtivar2 = document.getElementById("op-aviso2");
    const labelElement = document.getElementById("label-aviso");

    
        if (select == "disp-c-ju") {
            labelElement.style.display = "none";
            //campoParaAtivar.style.display = "none";
            //campoParaAtivar2.style.display = "none";
        } 
        else{
            labelElement.style.display = "inline-block";
            //campoParaAtivar.style.display = "inline-block";
            //campoParaAtivar2.style.display = "inline-block";
    }
}
    
function calculaRecisao(){

    const dataIni = new Date(document.getElementById("data-ini").value);
    const datafim = new Date(document.getElementById("data-fim").value);
    var salarioBruto = parseFloat(document.getElementById("salarioBruto").value); 
    const select = document.getElementById("termino").value;
    const feriasVenc = document.getElementById("opcao1").checked;
    const avisoP = document.getElementById("op-aviso1");

    console.log(feriasVenc)

    var resposta;

    if(dataIni > datafim){
        resposta = "ERRO: Data fim contrato superior a data de início"
    }
    else if(dataIni.getTime() == datafim.getTime()){
        resposta = "ERRO: Data fim contrato igual a data de início"
    }
    else{
        
        
        var desconto = 0;
        var valorTotal = (salarioBruto / 30) * (datafim.getDate() + 1); //valor do salario mensal proporcional aos dias trabalhados
        console.log(valorTotal) // deu certo
        //demissão com justa causa
            
       

        if(select == "disp-c-ju"){

            valorTotal = calculaINSS(valorTotal);
            valorTotal = calculaIRRF(valorTotal);

            if(feriasVenc){
                valorTotal += salarioBruto + (salarioBruto / 3);
            }

            resposta = `Demissão com justa causa: R$ ${valorTotal.toFixed(2)}`

        }
        // pedido demissão e demissão sem justa causa
        else{

            
            var ferias = 0;
            var decimoT;

            
            //decimo terceiro
            if(datafim.getDate() + 1 >= 15){
                decimoT = (salarioBruto / 12) * (datafim.getMonth() + 1) ;
            }
            else{
                decimoT = (salarioBruto / 12) * (datafim.getMonth());
            }


            //calculo ferias vencida
            if(feriasVenc){
                ferias = salarioBruto + (salarioBruto/3);
            }

            


            // pedido de demissão
            if(select === "pedido-demi"){   
                
                decimoT = calculaINSS(decimoT);
                decimoT = calculaIRRF(decimoT);

                valorTotal = calculaINSS(valorTotal);
                valorTotal = calculaIRRF(valorTotal);
                
                if(avisoP.checked == false){
                    valorTotal -= salarioBruto;
                }
                

                valorTotal += ferias + decimoT;
                
                resposta = `Pedido de demissão: R$ ${valorTotal.toFixed(2)}`

                


            }
            //demissão sem justa causa
            else{

                decimoT += salarioBruto / 12;
                ferias += salarioBruto/12 + (salarioBruto / 12 /3);
               
                if(avisoP.checked == false){
                    valorTotal += salarioBruto + (salarioBruto / 12 * 3);
                }

                decimoT = calculaINSS(decimoT);
                decimoT = calculaIRRF(decimoT);

                valorTotal = calculaINSS(valorTotal);
                valorTotal = calculaIRRF(valorTotal);

              

                valorTotal += decimoT + ferias;

                resposta = `Demissão sem justa causa: R$ ${valorTotal.toFixed(2)}`

                

                
            }
        }

    }
    document.getElementById("resposta").innerHTML=resposta
}  

function calcularFerias(){

    var salarioBruto = document.getElementById("salarioBruto").value;
    var dias = document.getElementById("dias").value;
    var resposta;

    if(dias > 30){
        resposta = "ERRO: Férias maior que 30 dias";
    }
    else{
       var valorTotal = (salarioBruto / 30) * dias;

        valorTotal += valorTotal / 3;

        valorTotal = calculaINSS(valorTotal);
        valorTotal = calculaIRRF(valorTotal);

        resposta = `Valor a ser recebido pelas férias: R$ ${valorTotal.toFixed(2)}`
    }
    
    document.getElementById("resposta").innerHTML=resposta

}





