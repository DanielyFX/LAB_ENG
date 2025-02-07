import Ajv from 'ajv';
import { getSchemaByFileName } from '../utils/getSchema';

const ajv = new Ajv({ allErrors: true});
const schema = getSchemaByFileName('tecnico');
const validarTecnico = ajv.compile(schema);

export { validarTecnico };