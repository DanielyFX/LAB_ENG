import Ajv from 'ajv';
import { getSchemaByFileName } from '../utils/getSchema';

const ajv = new Ajv({ allErrors: true});
const schema = getSchemaByFileName('atendente');
const validarAtendente = ajv.compile(schema);

export { validarAtendente };
