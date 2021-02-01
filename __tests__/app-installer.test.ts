import * as core from '@actions/core'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'
import * as installer from '../src/app-installer'

describe('app installer tests', () => {
  it('check the installation', async () => {
    const toolDir = process.env['RUNNER_TOOL_CACHE'] as string
    const version = '4.4.1'
    await installer.install(version)
    const dir = path.join(toolDir, 'yq', version, os.arch())
    core.debug(`dir ${dir}`)
    if (process.platform === 'win32') {
      expect(fs.existsSync(path.join(dir, 'yq.exe'))).toBe(true)
    } else {
      expect(fs.existsSync(path.join(dir, 'yq'))).toBe(true)
    }
  })
})
