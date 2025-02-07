import Ajv from 'ajv';
import { getSchemaByFileName } from '../utils/getSchema';

const ajv = new Ajv({ allErrors: true});
const schema = getSchemaByFileName('servico');
const validarServico = ajv.compile(schema);

export { validarServico };