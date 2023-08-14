const colors = require('colors')

function checkDependencies() {
  const packageJson = require('../package.json')
  const dependencies = Object.keys(packageJson.dependencies)
  const devDependencies = Object.keys(packageJson.devDependencies)
  let error = false

  console.log(colors.yellow.bold('Checking dependencies...'))

  dependencies.forEach(dependency => {
    const version = packageJson.dependencies[dependency]
    if (version.includes('^') || version.includes('~')) {
      error = true
      throw new Error(colors.red(`${dependency} has ^ or ~ in its version number: ${version}`))
    }
  })

  devDependencies.forEach(devDependency => {
    const version = packageJson.devDependencies[devDependency]
    if (version.includes('^') || version.includes('~')) {
      error = true
      throw new Error(colors.red(`${devDependency} has ^ or ~ in its version number: ${version}`))
    }
  })

  if (!error) {
    console.log(colors.green.bold('All dependencies are correct!'))
  }
}

checkDependencies()
