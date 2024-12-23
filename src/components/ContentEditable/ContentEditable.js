import React from 'react'

export default class ContentEditable extends React.Component {
  static propTypes = {
    html: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool.isRequired,
    children: React.PropTypes.element,
    tagName: React.PropTypes.string
  }

  constructor () {
    super()
    this.emitChange = this.emitChange.bind(this)
  }

  shouldComponentUpdate (nextProps) {
    return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML ||
      this.props.disabled !== nextProps.disabled
  }

  componentDidUpdate () {
    if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML) {
      this.htmlEl.innerHTML = this.props.html
    }
  }

  emitChange (evt) {
    if (!this.htmlEl) return
    var html = this.htmlEl.innerHTML
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html }
      this.props.onChange(evt)
    }
    this.lastHtml = html
    if (evt.type === 'blur') {
      this.props.onChange('blur')
    }
  }

  render () {
    return React.createElement(
      this.props.tagName || 'div',
      Object.assign({}, this.props, {
        ref: (e) => { this.htmlEl = e },
        onInput: this.emitChange,
        onBlur: this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: {__html: this.props.html}
      }),
      this.props.children)
  }
}
