// server/scripts/generateEnumsJson.ts
import { StatusChamadoEnum, AtendimentoEnum, StatusEnum, EspecialidadeEnum, DespesaEnum, SituacaoEnum, PrioridadeEnum } from "../utils/enums";
import * as fs from "fs";
import * as path from "path";

const enums = {
  StatusChamadoEnum,
  AtendimentoEnum,
  StatusEnum,
  EspecialidadeEnum,
  DespesaEnum,
  SituacaoEnum,
  PrioridadeEnum
};

// Define o caminho para salvar o arquivo JSON na pasta client
const outputPath = path.resolve(__dirname, "../../../client/src/utils/enums.json");

fs.writeFileSync(outputPath, JSON.stringify(enums, null, 2));
console.log("Enums exportados para o frontend com sucesso!");