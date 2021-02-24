import { say } from 'cfonts'

import { version } from '../../package.json'

const welcome = (): void => {
  say('ADDConnect', {
    env: 'node',
    font: 'pallet',
    colors: ['#0641e6', '#5e7282'],
    letterSpacing: 4,
    space: false,
  })
  console.log('Version:', version)
  console.log('Environment:', process.env.NODE_ENV)
  console.log()
}

export default welcome

if (require.main === module) {
  welcome()
}
