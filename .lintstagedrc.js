const TSLINT_COMMAND = 'tslint -p tsconfig.json -c tslint.json'
const MAXIMUM_NUMBER_OF_FILE_CHANGES = 5
const PRETTIER_COMMAND = 'prettier --write'

module.exports = {
  '**/*.js': (filenames) => `${PRETTIER_COMMAND} ${filenames.join(' ')}`,
  '**/*.ts': (filenames) => {
    console.log(`Total number of file changes before committing: ${filenames.length}`)
    if (filenames.length > MAXIMUM_NUMBER_OF_FILE_CHANGES) {
      console.log(
        `Changes has been made more than threshold(${MAXIMUM_NUMBER_OF_FILE_CHANGES}), running pre-commit command for the whole project`,
      )

      return [`${TSLINT_COMMAND} .`, `${PRETTIER_COMMAND} "src/**/*.ts"`]
    }

    return [`${TSLINT_COMMAND} ${filenames.join(' ')}`, `${PRETTIER_COMMAND} ${filenames.join(' ')}`]
  },
}
