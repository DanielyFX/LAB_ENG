import Ajv from 'ajv';
import { getSchemaByFileName } from '../utils/getSchema';

const ajv = new Ajv({ allErrors: true});
const schema = getSchemaByFileName('orcamento');
const validarOrcamento = ajv.compile(schema);

export { validarOrcamento };