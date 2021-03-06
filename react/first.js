import React from 'react'
import {FormattedMessage, FormattedHTMLMessage} from 'react-intl'

const FirstStep = () =>
  <div>
    <h2>
      <FormattedMessage id="getting-started.first-steps-header"/>
    </h2>
    <p>
      <FormattedHTMLMessage id="getting-started.toolbelt"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-white pa3">
{`  $ npm install -g vtex
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.workspace-creation"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-white pa3">
{`  $ vtex login
? Email: seuemail@vtex.com
? Account: ${global.__RUNTIME__.account}
! Please check your email - we've sent you a temporary code.
? Code:
? Workspaces: Create new workspace...
? New workspace name: meu-workspace-unico
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.workspace-description"/>
    </p>
    <p>
      <FormattedMessage id="getting-started.clone"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-white pa3">
{`  $ git clone git@github.com:vtex-apps/getting-started.git
  $ cd getting-started
  $ vtex setup eslint
`}
      </pre>
    </code>
    <p>
      <FormattedMessage id="getting-started.synchronize"/> ✨
    </p>
    <p>
      <FormattedHTMLMessage id="getting-started.watch"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-white pa3">
{`  $ vtex install vtex.builder-hub@0.x
info:    Installed app vtex.builder-hub@0.x successfully
  $ vtex link
info:    Linking app vtex.getting-started
Your URL: http://meu-workspace-unico.basedevmkp.myvtex.com/getting-started
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.online"/>
    </p>
    <p>
      <FormattedMessage id="getting-started.edit-file"
        values={{ fileName: <i>react/second.js</i> }}
      />
    </p>
    <p>
      <FormattedMessage id="getting-started.change-css"/>
    </p>
    <code className="code">
      <pre className="pre bg-near-white pa3">
{`  // ANTES
<h2 className='dn'>

// DEPOIS
<h2 className='green'>
`}
      </pre>
    </code>
    <p>
      <FormattedHTMLMessage id="getting-started.save"/>
    </p>
  </div>

export default FirstStep
