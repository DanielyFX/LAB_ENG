import Ajv from 'ajv';
import { getSchemaByFileName } from '../utils/getSchema';

const ajv = new Ajv({ allErrors: true});
const schema = getSchemaByFileName('cliente');
const validarCliente = ajv.compile(schema);

export { validarCliente };