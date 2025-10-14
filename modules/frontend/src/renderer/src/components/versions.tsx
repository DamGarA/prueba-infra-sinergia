import { useState } from 'react'
import { Card } from './ui/card'
import pkg from '../../../../package.json'
const version = pkg.version

function Versions(): React.JSX.Element {
  const [versions] = useState(window.electron.process.versions)
  console.log(versions)
  return (
    <Card className="mx-auto p-2 w-full">
      <ul className="flex gap-6 justify-around">
        <li className="electron-version">Electron v{versions.electron}</li>
        <li className="chrome-version">Chromium v{versions.chrome}</li>
        <li className="node-version">Node v{versions.node}</li>
        <li className="v8-version">App v{version}</li>
      </ul>
    </Card>
  )
}

export default Versions
