import { lightGreen, lightCyan } from 'kolorist'
import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import spawn from 'cross-spawn'
import { fileURLToPath } from 'node:url'

const cwd = process.cwd()
const defaultTargetDir = 'typescript-lib'
const renameFiles: Record<string, string> = {
  _git: '.git',
  _husky: '.husky',
  _gitignore: '.gitignore',
  _eslintrc: '.eslintrc.js',
  _prettierrc: '.prettierrc.js',
  _eslintignore: '.eslintignore',
  _npmignore: '.npmignore'
}

async function init() {
  let targetDir = defaultTargetDir
  try {
    const { pkgManager } = await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'Project name: ',
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = state.value || defaultTargetDir
        }
      },
      {
        type: 'select',
        name: 'pkgManager',
        message: 'Package manager:',
        initial: 0,
        choices: [
          { title: 'npm', value: 'npm' },
          { title: 'yarn', value: 'yarn' },
          { title: 'pnpm', value: 'pnpm' }
        ]
      }
    ])

    const root = path.join(cwd, targetDir)

    fs.mkdirSync(targetDir)

    const templateDir = path.resolve(
      fileURLToPath(import.meta.url),
      '../..',
      `template`
    )

    const write = (file: string, content?: string) => {
      const targetPath = path.join(root, renameFiles[file] ?? file)
      if (content) {
        fs.writeFileSync(targetPath, content)
      } else {
        copy(path.join(templateDir, file), targetPath)
      }
    }

    const files = fs.readdirSync(templateDir)
    for (const file of files.filter((f) => f !== 'package.json')) {
      write(file)
    }

    const pkg = JSON.parse(
      fs.readFileSync(path.join(templateDir, 'package.json'), 'utf-8')
    )

    pkg.name = targetDir
    pkg.main = `dist/${targetDir}.umd.js`
    pkg.module = `dist/${targetDir}.es5.js`
    pkg.typings = `dist/types/${targetDir}.d.ts`

    write('package.json', JSON.stringify(pkg, null, 2) + '\n')

    const useYarn = pkgManager === 'yarn'
    const child = spawn(
      pkgManager,
      ['install'].concat(
        !useYarn ? ['--prefix', targetDir] : ['--cwd', targetDir]
      ),
      {
        stdio: 'inherit'
      }
    )

    child.on('close', (code) => {
      if (code !== 0) {
        console.log('install with something wrong')
        process.exit(1)
      }

      printSuccessInfo(pkgManager, targetDir)
      process.exit(0)
    })
  } catch (e) {
    console.log(e)
  }
}

function copy(src: string, dest: string) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    copyDir(src, dest)
  } else {
    fs.copyFileSync(src, dest)
  }
}

function copyDir(srcDir: string, destDir: string) {
  fs.mkdirSync(destDir, { recursive: true })
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file)
    const destFile = path.resolve(destDir, file)
    copy(srcFile, destFile)
  }
}

function printSuccessInfo(pkgManager: string, pkgName: string) {
  console.log()

  const useYarn = pkgManager === 'yarn'

  console.log(`${lightGreen('Success!')} Created ${pkgName} at ${pkgName}`)
  console.log('Inside that directory, you can run several commands:')
  console.log()
  console.log(lightCyan(`  ${pkgManager} ${useYarn ? '' : 'run '}dev`))
  console.log('    Starts the development server.')
  console.log()
  console.log(lightCyan(`  ${pkgManager} ${useYarn ? '' : 'run '}test`))
  console.log(
    '    Test the test cases under the test/ directory.'
  )
  console.log()
  console.log(lightCyan(`  ${pkgManager} ${useYarn ? '' : 'run '}build:dev`))
  console.log(
    '    Builds the libarary for development with sourcemap and no terser.'
  )
  console.log()
  console.log(lightCyan(`  ${pkgManager} ${useYarn ? '' : 'run '}build:pro`))
  console.log('    Builds the libarary for production.')
  console.log()
  console.log('You can begin by typing:')
  console.log()
  console.log(lightCyan('  cd'), pkgName)
  console.log(`  ${lightCyan(`${pkgManager} ${useYarn ? '' : 'run '}dev`)}`)
  process.exit(0)
}

init().catch((e) => {
  console.log(e)
})
