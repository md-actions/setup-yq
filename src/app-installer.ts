import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export async function install(version: string): Promise<void> {
  const toolName = 'yq'
  const url = getDownloadUrl(version, toolName)
  /* eslint-disable no-console */
  console.log(`install app called version : ${version} url : ${url}`)
  /* eslint-enable no-console */

  const appPath = await getBinary(toolName, version, url)

  /* eslint-disable no-console */
  console.log(`${toolName} has been cached at ${appPath}`)
  /* eslint-enable no-console */

  core.addPath(path.dirname(appPath))
}

function getDownloadUrl(version: string, tool: string): string {
  const platformMap: {[platform: string]: string} = {
    linux: 'linux',
    darwin: 'darwin',
    win32: 'windows'
  }
  const archMap: {[arch: string]: string} = {
    x64: 'amd64'
  }
  const arch = archMap[os.arch()]
  const platform = platformMap[os.platform()]
  const extension = getExecutableExtension()
  if (!arch || !platform) {
    const errormsg = `Unsupported platform.platform:${os.platform()},arch:${os.arch()}`
    throw new Error(errormsg)
  }
  return `https://github.com/mikefarah/yq/releases/download/v${version}/${tool}_${platform}_${arch}${extension}`
}

async function getBinary(
  toolName: string,
  version: string,
  url: string
): Promise<string> {
  let cachedToolpath: string
  cachedToolpath = tc.find(toolName, version)

  if (!cachedToolpath) {
    core.debug(`Downloading ${toolName} from: ${url}`)

    let downloadPath: string | null = null
    try {
      downloadPath = await tc.downloadTool(url)
    } catch (error) {
      core.debug(error)
      throw new Error(`Failed to download version ${version}: ${error}`)
    }

    cachedToolpath = await tc.cacheFile(
      downloadPath,
      toolName + getExecutableExtension(),
      toolName,
      version
    )
  }

  const executablePath = path.join(
    cachedToolpath,
    toolName + getExecutableExtension()
  )

  fs.chmodSync(executablePath, '777')

  return executablePath
}

function getExecutableExtension(): string {
  if (os.type().match(/^Win/)) {
    return '.exe'
  }
  return ''
}
