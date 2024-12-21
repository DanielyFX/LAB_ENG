import CEP from './cep';
import CNPJ  from './cnpj';
import CPF  from './cpf';
import Data  from './data';
import DataPrevisaoAtendimento  from './data-atendimento';
import DataContrato  from './data-contrato';
import Email  from './email';
import Key  from './key';
import NomePF  from './nome-pf';
import NomePJ  from './nome-pj';
import NomeServico  from './nome-servico';
import NonEmptyField  from './non-emptyfield';
import Senha  from './senha';
import Str  from './str';
import TelefoneCelular  from './telefone-celular';
import TelefoneFixo  from './telefone-fixo';

export default class Validar {
    static CPF = CPF.isNumericValid;
    static CNPJ = CNPJ.isNumericValid;
    static TelFixo = TelefoneFixo.isFormatValid;
    static TelCel = TelefoneCelular.isFormatValid;
    static NomePF = NomePF.isValid;
    static NomePJ = NomePJ.isValid;
    static Email = Email.isValid;
    static Senha = Senha.isValid;
    static DataContrato = DataContrato.isValid;
    static CEP = CEP.isFormatValid;
    static Data = Data.isValid;
    static NonEmptyField = NonEmptyField.isValid;
    static DataPrevisaoAtendimento = DataPrevisaoAtendimento.isValid;
    static NomeServico = NomeServico.isValid;
    static Str = Str;
    static Key = Key;
}