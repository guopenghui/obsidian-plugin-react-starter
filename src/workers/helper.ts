import WorkerCode from "worker:./sample.worker.ts"
// @ts-ignore
import {fromScriptText} from "@aidenlx/esbuild-plugin-inline-worker/utils"

export function createWorker(name: string): Worker{
  return fromScriptText(WorkerCode, { name })
}