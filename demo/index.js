
import update from 'morphdom'
import h from 'h0'
import bikeshed from '@jxnblk/bikeshed'
import Color from 'color'
import hello from '../lib'

const dark = c => Color(c).dark()

const link = h('a')({
  style: {
    color: 'inherit',
    fontWeight: 'bold',
    marginRight: 16
  }
})

const pre = h('pre')({
  style: {
    fontFamily: 'Menlo, monospace',
    fontSize: 14,
    padding: 16,
  }
})

const label = h('label')({
  style: {
    position: 'absolute',
    height: 1,
    width: 1,
    overflow: 'hidden',
    clip: 'rect(1px,1px,1px,1px)'
  }
})

const input = h('input')({
  style: {
    fontFamily: 'Menlo, monospace',
    fontSize: 14,
    textAlign: 'center',
    padding: 16,
    color: 'inherit',
    backgroundColor: 'transparent',
    border: 0,
    outline: 'none',
    WebkitAppearance: 'none',
    appearance: 'none'
  }
})

const Main = ({ style, ...props }) => h('main')({
  ...props,
  style: {
    fontFamily: '-apple-system, sans-serif',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    padding: 32,
    transitionProperty: 'color, background-color',
    transitionTimingFunction: 'ease-out',
    transitionDuration: '1s, .5s',
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    ...style
  }
})

const Title = ({ color, base }) => h('div')({
  style: {
    fontSize: '2vw',
    textTransform: 'uppercase',
    letterSpacing: '.3em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 64
  }
})(
  h('h1')({
    style: {
      padding: 32,
      color: base,
      backgroundColor: color,
      transitionProperty: 'color, background-color',
      transitionTimingFunction: 'ease-out',
      transitionDuration: '1s, .5s'
    }
  })('hello'),
  h('h1')({
    style: {
      padding: 32,
    }
  })('color')
)

const Footer = ({ base }) => h('footer')({
  style: {
    fontFamily: '-apple-system, sans-serif',
    fontSize: 14,
    padding: 32,
    color: base,
    backgroundColor: dark(base) ? 'white' : 'black'
  }
})(
  link({
    href: 'https://github.com/jxnblk/hello-color',
  })('GitHub'),
  link({
    href: 'http://jxnblk.com',
  })('Made by Jxnblk')
)

const Root = ({
  color,
  backgroundColor,
  ...props
}) => {
  let level = 'AA Large'
  if (props.contrast > 7) {
    level = 'AA'
  }
  if (props.contrast > 4.5) {
    level = 'AAA'
  }

  const preText = `
    ${Math.round(props.contrast * 100) / 100} contrast
    ${level}
    ${props.maxed ? 'maxed out' : ''}
  `.replace(/[\n\s]+/g, ' ').trim()

  return h('div')(
    Main({
      style: {
        color,
        backgroundColor
      },
      onclick: e => render()
    })(
      Title({ color, ...props }),
      label({
        for: 'colors'
      })('Colors'),
      input({
        readonly: true,
        title: 'Click to select color values',
        onclick: e => {
          e.stopPropagation()
          e.target.setSelectionRange(0, e.target.value.length)
        },
        name: 'colors',
        value: `${color.toLowerCase()} : ${backgroundColor.toLowerCase()}`
      })(),
      pre(preText)
    ),
    Footer(props)
  )
}


const render = () => {
  const threshold = 3
  const result = hello({
    color: bikeshed(),
    saturation: .25,
    contrast: threshold
  })
  console.log(result)

  const next = Root({
    backgroundColor: result.base,
    ...result
  })

  if (tree) {
    update(tree, next)
  } else {
    return next
  }
}

const tree = render()
document.body.appendChild(tree)
