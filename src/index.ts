import chalk from 'chalk'
import fs from 'node:fs'
import path from 'node:path'
import prompts from 'prompts'
import { fileURLToPath } from 'node:url'

const cwd = process.cwd()
const defaultTargetDir = 'typescript-lib'
const renameFiles: Record<string, string> = {
  _gitignore: '.gitignore',
  _eslintrc: '.eslintrc.js',
  _prettierrc: '.prettierrc.js',
  _eslintignore: '.eslintignore'
}

async function init() {
  let targetDir = defaultTargetDir
  try {
    await prompts([
      {
        type: 'text',
        name: 'projectName',
        message: 'Project name: ',
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = state.value || defaultTargetDir
        }
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
    write('package.json', JSON.stringify(pkg, null, 2) + '\n')

    console.log(
      chalk.greenBright(`${targetDir} created successfully! Happy Coding!`)
    )
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

init().catch((e) => {
  console.log(e)
})
