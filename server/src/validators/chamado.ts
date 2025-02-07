import Ajv from 'ajv';
import { getSchemaByFileName } from '../utils/getSchema';

const ajv = new Ajv({ allErrors: true});
const schema = getSchemaByFileName('chamado');
const validarChamado = ajv.compile(schema);

export { validarChamado };