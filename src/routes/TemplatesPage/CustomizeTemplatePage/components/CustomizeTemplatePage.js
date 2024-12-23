import React from 'react'
// utils
import _ from 'lodash'
import uploadData from 'store/helpers/uploadData'
// components
import LeftSidebar from './Sidebars/LeftSidebar'
import RightSidebar from './Sidebars/RightSidebar'
import MainCustomizingBar from './CustomizingBars/MainCustomizingBar'
import ElemCustomizingBar from './CustomizingBars/ElemCustomizingBar'
import OtherSettingsBar from './CustomizingBars/OtherSettingsBar'
import Template from './Template'
import {toastr} from 'react-redux-toastr'
// aceEditorElements
import AceEditor from 'react-ace'
import 'brace/mode/css'
import 'brace/theme/monokai'
import 'brace/ext/language_tools'
// styles
import styles from './CustomizeTemplate.scss'
import './PopupPreview.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default class CustomizeTemplatePage extends React.Component {
  static propTypes = {
    getTemplate: React.PropTypes.func.isRequired,
    uploadPopupImage: React.PropTypes.func.isRequired,
    createPopup: React.PropTypes.func.isRequired,
    getTemplates: React.PropTypes.func.isRequired,
    getPopup: React.PropTypes.func.isRequired,
    updatePopup: React.PropTypes.func.isRequired,
    templates: React.PropTypes.object.isRequired,
    location: React.PropTypes.object.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor (props) {
    super(...props)

    this.state = {
      selectedPage: 0,
      layoutHeight: '',
      mainBarOpen: true,
      otherSettingsOpen: false,
      elemSidebarOptions: {
        open: false,
        type: '',
        key: '',
        position: {
          x: 0,
          y: 0
        }
      },
      openRightSidebar: true,
      openEditor: false,
      popup: {},
      colorSchemas: []
    }
    this.grooveFeedback = document.getElementById('groove-feedback')
  }

  componentDidMount () {
    this.getCurrentTemplate()
    if (this.grooveFeedback) this.grooveFeedback.remove()
  }

  componentWillUnmount () {
    if (this.grooveFeedback) document.body.appendChild(this.grooveFeedback)
  }

  getCurrentTemplate (id) {
    const {location, getTemplate, getPopup} = this.props
    if (location.query.id || id) {
      return getTemplate(id || location.query.id)
        .then((response) => {
          const popup = {}
          const startPage = 0
          popup.settings = response.default_settings
          popup.settings.background_image = popup.settings.background_image || {}
          popup.settings.finish_action.params = popup.settings.finish_action.params || 'http://'
          popup.data = response.default_data
          popup.css = "/* Default Popup's CSS */\n\n" + response.css
          popup.css_override = '/* Override default CSS here */\n'
          if (response.color_schemas.length) {
            popup.color_schema_id = response.color_schemas[0].id
            popup.color_schema = response.color_schemas[0]
          }
          this.setState({popup: popup, selectedPage: startPage, colorSchemas: response.color_schemas})
          this.setUpPopupPreview()
        })
    }
    getPopup(location.query.campaign, location.query.popup).then((response) => {
      const startPage = 0
      getTemplate(response.popup_template.id).then((template) => {
        this.setState({colorSchemas: template.color_schemas})
        this.setUpPopupPreview()
      })
      response.popup_template = undefined
      response.target_sets = undefined
      response.color_schema_id = _.get(response.color_schema, 'id')
      this.setState({popup: response, selectedPage: startPage})
    })
  }

  switchTemplate (id, e) {
    e.preventDefault()
    const {router} = this.context
    router.push({
      pathname: '/customize-template',
      query: {id: id}
    })
    this.getCurrentTemplate(id)
  }

  changeDisplayEffect (e) {
    const popup = {...this.state.popup}
    popup.settings.appear_animation = e ? e.value : ''
    this.setState({popup: popup})
    this.playAppearAnimation()
  }

  playAppearAnimation () {
    document.getElementById('popup-animate-container').className = 'animated ' +
      _.get(this.state.popup, 'settings.appear_animation')
  }

  changeBackdropOpacity (e, x) {
    const popup = {...this.state.popup}
    popup.settings.backdrop_opacity = e.target.value
    this.setState({popup: popup})
  }

  changeColorSchema (colorSchema) {
    const popup = {...this.state.popup}
    popup.color_schema_id = colorSchema.id
    popup.color_schema = colorSchema
    this.setState({popup: popup})
  }

  onTextChange (key, text) {
    const popup = {...this.state.popup}
    if (popup.data[this.state.selectedPage][key]) {
      popup.data[this.state.selectedPage][key].text = text
    }
    this.setState({popup: popup})
  }

  changePage (index) {
    this.setState({selectedPage: index})
    this.showPagePreview(index)
    this.visibleElemBar(false)
  }

  handleChange (type, elem, e) {
    const popup = {...this.state.popup}
    if (elem === 'message') {
      popup.data[this.state.selectedPage][type].validations.required[elem] = e.target.value
    } else {
      popup.data[this.state.selectedPage][type][elem] = e.target.value
    }
    this.setState({popup: popup})
    this.setUpPopupPreview()
  }

  changeAction (type, action) {
    const popup = {...this.state.popup}
    const actionValue = action && type === 'action' ? action.value : undefined
    _.set(popup, `settings.finish_action.${type}`, type === 'action' ? actionValue : action.target.value)
    this.setState({popup: popup})
  }

  visibleElemBar (visible, e, type, key) {
    const layout = document.getElementById('templates-layout')
    const options = {
      open: visible,
      type: type,
      key: key,
      position: {
        x: _.get(e, 'x', 0),
        y: _.get(e, 'y', 0) + layout.scrollTop
      }
    }
    this.setState({elemSidebarOptions: options})
    visible ? setTimeout(this.windowLayoutHeight(), 10000) : this.setState({layoutHeight: ''})
  }

  windowLayoutHeight () {
    const layoutHeight = document.getElementById('templates-layout').scrollHeight
    this.setState({layoutHeight: layoutHeight})
  }

  savePopup () {
    const {createPopup, templates, location, updatePopup} = this.props
    const {router} = this.context
    const popup = {...this.state.popup}
    if (location.query.popup) {
      return updatePopup(location.query.campaign, location.query.popup, popup).then((response) => {
        router.push(`/campaigns/${response.campaign.id}/popups/${response.id}/target_sets`)
        toastr.success('', 'Your popup has been successfully updated!')
      })
    }
    popup.name = templates.resource.name
    popup.popup_template_id = templates.resource.id
    createPopup(popup).then((response) => {
      router.push(`/campaigns/${response.resource.campaign.id}/popups/${response.resource.id}/target_sets`)
      toastr.success('', 'Your popup has been successfully created!')
    })
  }

  toggleRightSidebar () {
    this.setState({
      openRightSidebar: !this.state.openRightSidebar,
      mainBarOpen: false,
      otherSettingsOpen: false
    })
  }

  onChangeAceCss (styles) {
    const popup = {...this.state.popup}
    popup.css = styles
    this.setState({popup: popup})
  }

  onChangeAceCssOverrides (styles) {
    const popup = {...this.state.popup}
    popup.css_override = styles
    this.setState({popup: popup})
  }

  toggleEditor (e) {
    e.preventDefault()
    this.setState({openEditor: !this.state.openEditor})
  }

  toggleMainBar () {
    this.setState({mainBarOpen: !this.state.mainBarOpen, otherSettingsOpen: false, openRightSidebar: true})
  }

  toggleOtherSettingsBar () {
    this.setState({otherSettingsOpen: !this.state.otherSettingsOpen, mainBarOpen: false, openRightSidebar: true})
  }

  changeColor (colors, type, element, selector) {
    const popup = {...this.state.popup}
    if (type === 'button') {
      popup.data[this.state.selectedPage][element][selector] = colors.color
      this.setUpPopupPreview()
    } else {
      popup.settings.background_color = colors.color
      this.setUpPopupPreview()
    }
    this.setState({popup: popup})
  }

  uploadImage (e) {
    const {uploadPopupImage} = this.props
    const entity = {}
    entity.image = _.head(e.target.files)
    const formData = uploadData(entity, true)
    uploadPopupImage(formData).then((response) => {
      e.target.targetImageComponent.src = response.resource.image.url
      const popup = {...this.state.popup}
      if (popup.data[e.target.currentPopupPage][e.target.targetElementName]) {
        popup.data[e.target.currentPopupPage][e.target.targetElementName].url = response.resource.image.url
        popup.data[e.target.currentPopupPage][e.target.targetElementName].image_id = response.resource.id
      }
      this.setState({popup: popup})
    })
  }

  uploadPopupBackgroundImage (e) {
    const {uploadPopupImage} = this.props
    const entity = {}
    entity.image = _.head(e.target.files)
    const formData = uploadData(entity, true)
    const popup = {...this.state.popup}
    uploadPopupImage(formData).then((response) => {
      popup.settings.background_image.url = response.resource.image.url
      popup.settings.background_image.image_id = response.resource.id
      this.setState({popup: popup})
      this.setUpPopupPreview()
    })
  }

  removePopupBackgroundImage () {
    const popup = this.state.popup
    popup.settings.background_image.url = ''
    this.setState({popup: popup})
    this.setUpPopupPreview()
  }

  changePopupBackgroundSize (size) {
    const popup = this.state.popup
    popup.settings.background_size = size ? size.value : undefined
    this.setState({popup: popup})
    this.setUpPopupPreview()
  }

  changePlaceWithConfirm (state, e) {
    e.preventDefault()
    const {router} = this.context
    const toastrConfirmOptions = {
      onOk: () => router.push(state)
    }
    toastr.confirm('Your changes have not yet been saved. Are you sure you want to continue?', toastrConfirmOptions)
  }

  render () {
    const {templates, getTemplates} = this.props
    const template = templates.resource
    const sidebarsOpened = this.state.mainBarOpen || this.state.otherSettingsOpen
    const layoutHeight = this.state.layoutHeight ? {height: `${this.state.layoutHeight - 60}px`} : null
    const backdropHeight = this.state.layoutHeight ? {height: `${this.state.layoutHeight - 150}px`} : null
    return (
      <div className='page-content' style={layoutHeight}>
        <LeftSidebar
          template={template}
          changePage={::this.changePage}
          toggleMainBar={::this.toggleMainBar}
          toggleOtherSettingsBar={::this.toggleOtherSettingsBar}
          mainBarOpen={this.state.mainBarOpen}
          otherSettingsOpen={this.state.otherSettingsOpen}
        />
        <MainCustomizingBar open={this.state.mainBarOpen} popup={this.state.popup}
          changeDisplayEffect={::this.changeDisplayEffect} changeBackdropOpacity={::this.changeBackdropOpacity}
          changeColorSchema={::this.changeColorSchema} colorSchemas={this.state.colorSchemas}
          toggleEditor={::this.toggleEditor} toggleMainBar={::this.toggleMainBar} changeColor={::this.changeColor}
          background={_.get(this.state, 'popup.settings.background_color')}
          uploadPopupBackgroundImage={::this.uploadPopupBackgroundImage}
          changePopupBackgroundSize={::this.changePopupBackgroundSize}
          removePopupBackgroundImage={::this.removePopupBackgroundImage}
        />
        <OtherSettingsBar open={this.state.otherSettingsOpen} toggleOtherSettingsBar={::this.toggleOtherSettingsBar}
          popup={this.state.popup} selectedPage={this.state.selectedPage} changeAction={::this.changeAction} />
        <ElemCustomizingBar elemSidebarOptions={this.state.elemSidebarOptions} changeColor={::this.changeColor}
          handleChange={::this.handleChange} visibleElemBar={::this.visibleElemBar}
          selectedPage={this.state.selectedPage} popupElements={_.get(this.state, 'popup.data')} />
        <div className='content-wrapper'>
          <div className={cx('page-header page-header-default no-margin-bottom', 'customize-template-header')}>
            <div className='page-header-content'>
              <div className='page-title text-center'>
                <h3>
                  Customize your template
                </h3>
                <div className='header-buttons-wrapper'>
                  <a href='#' className='btn bg-green btn-xlg'
                    onClick={this.changePlaceWithConfirm.bind(this, '/choose-template')}>Back</a>&nbsp;
                  <button className='btn bg-green btn-xlg' onClick={::this.savePopup}>Save</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className='position-relative'>
              <div className={cx('customizing-template-wrapper')}>
                <Template popup={this.state.popup} templateStyle={_.get(this.state, 'popup.css_override', '')}
                  template={template} sidebarsOpened={sidebarsOpened} backdropHeight={backdropHeight} />
              </div>
              <div className={styles['sidebar-switch-buttons']}>
                <button className='btn' type='button' onClick={::this.toggleRightSidebar}>
                  <p>T</p><p>E</p><p>M</p><p>P</p><p>L</p>
                  <p>A</p><p>T</p><p>E</p><p>S</p>
                  <i className={`fa fa-angle-double-${this.state.openRightSidebar ? 'left' : 'right'}`} />
                </button>
              </div>
            </div>
            <div className={cx('ace-editor-wrapper', {'ace-editor-open': this.state.openEditor})}>
              <div>
                <span>CSS editor</span>
                <i onClick={::this.toggleEditor} className='fa fa-chevron-down' />
              </div>
              <AceEditor
                className={cx('ace-editor', 'mr-10')}
                mode='css'
                theme='monokai'
                onChange={::this.onChangeAceCss}
                name='Ace_Editor_Css'
                editorProps={{$blockScrolling: true}}
                enableBasicAutocompletion={false}
                enableLiveAutocompletion={false}
                fontSize={16}
                height='350px'
                value={_.get(this.state, 'popup.css', '')}
              />
              <AceEditor
                className={cx('ace-editor', 'ml-10')}
                mode='css'
                theme='monokai'
                onChange={::this.onChangeAceCssOverrides}
                name='Ace_Editor_Css_Override'
                editorProps={{$blockScrolling: true}}
                enableBasicAutocompletion={false}
                enableLiveAutocompletion={false}
                fontSize={16}
                height='350px'
                value={_.get(this.state, 'popup.css_override', '')}
              />
            </div>
          </div>
        </div>
        <RightSidebar templates={templates} switchTemplate={::this.switchTemplate}
          openRightSidebar={this.state.openRightSidebar} getTemplates={getTemplates} />
      </div>
    )
  }

  setUpPopupPreview () {
    const {templates} = this.props
    const template = templates.resource
    const placeholder = document.getElementById('popup-content')
    placeholder.style.backgroundColor = this.state.popup.settings.background_color
    if (_.get(this.state.popup.settings, 'background_image.url')) {
      placeholder.style.backgroundSize = this.state.popup.settings.background_size || 'initial'
      placeholder.style.backgroundRepeat = 'no-repeat'
      placeholder.style.backgroundPosition = 'center center'
      placeholder.style.backgroundImage =
        `url(http://${__DEV__ ? 'localhost:3000' : 'converthero.com'}/${this.state.popup.settings.background_image.url})`
    } else {
      placeholder.style.backgroundSize = 'initial'
      placeholder.style.backgroundImage = 'none'
    }
    placeholder.innerHTML = template.html
    this.state.popup.data.map((pageData, i) => {
      const page = placeholder.querySelector('[page="' + i + '"]')
      // Text components should be set up only when page is visible due to problems with CKEditor
      this.setUpComponents('button', page, i)
      this.setUpComponents('input', page, i)
      this.setUpComponents('form', page, i)
      this.setUpComponents('countdown', page, i)
      this.setUpComponents('image', page, i)
      this.setUpComponents('fb-like', page, i)
    })
    this.showPagePreview(this.state.selectedPage)
    this.playAppearAnimation()
  }

  setUpComponents (type, container, pageIndex) {
    let components = container.querySelectorAll('[' + type + ']')
    _.each(components, (component) => {
      if (type === 'text') this.setUpTextComponent(component, pageIndex)
      if (type === 'button') this.setUpButtonComponent(component, pageIndex)
      if (type === 'input') this.setUpInputComponent(component, pageIndex)
      if (type === 'form') this.setUpFormComponent(component, pageIndex)
      if (type === 'countdown') this.setUpCountdownComponent(component, pageIndex)
      if (type === 'image') this.setUpImageComponent(component, pageIndex)
      if (type === 'fb-like') this.setUpFbLikeComponent(component, pageIndex)
    })
  }

  setUpTextComponent (element, pageIndex) {
    const key = element.getAttribute('text')
    element.innerHTML = this.state.popup.data[pageIndex][key].text
    element.setAttribute('contenteditable', 'true')
    // Prevent re-initializing CKEditor when it is already attached
    if (/cke_editable/.test(element.className)) return
    CKEDITOR.disableAutoInline = true
    const editor = CKEDITOR.inline(element)
    editor.on('blur', () => {
      this.onTextChange(key, element.innerHTML)
    })
  }

  setUpButtonComponent (element, pageIndex) {
    const key = element.getAttribute('button')
    element.innerText = this.state.popup.data[pageIndex][key].text
    element.style.backgroundColor = this.state.popup.data[pageIndex][key].background_color
    element.style.color = this.state.popup.data[pageIndex][key].color
    element.onclick = (e) => {
      this.visibleElemBar(true, e, 'button', key)
      return false
    }
  }

  setUpInputComponent (element, pageIndex) {
    const key = element.getAttribute('input')
    element.setAttribute('placeholder', this.state.popup.data[pageIndex][key].placeholder)
    // Append validation error message block
    const errorMessageBlock = document.createElement('span')
    errorMessageBlock.className = 'help-block validation-error-message'
    element.parentNode.insertBefore(errorMessageBlock, element.nextSibling)
    element.onclick = (e) => {
      this.visibleElemBar(true, e, 'input', key)
      return false
    }
  }

  setUpFormComponent (element, pageIndex) {
    element.onsubmit = () => {
      return false
    }
  }

  setUpCountdownComponent (element, pageIndex) {
    const key = element.getAttribute('countdown')
    const t = this.state.popup.data[pageIndex][key].time
    element.innerHTML =
      '<div class="days"> <span></span> <small>Days</small> </div>' +
      '<div class="hours"> <span></span> <small>Hours</small> </div>' +
      '<div class="minutes"> <span></span> <small>Minutes</small> </div>' +
      '<div class="seconds"> <span></span> <small>Seconds</small> </div>'
    // Hide days if initial time is less then a day
    if (t < 24 * 60 * 60) element.querySelector('.days').style.display = 'none'
    // Hide hours if initial time is less than a hour
    if (t < 60 * 60) element.querySelector('.hours').style.display = 'none'
    // Calculate days, hours, minutes and seconds from seconds
    const timeComponents = {
      seconds: Math.floor(t % 60),
      minutes: Math.floor((t / 60) % 60),
      hours: Math.floor((t / (60 * 60)) % 24),
      days: Math.floor(t / (60 * 60 * 24))
    }
    element.querySelector('.days span').innerText = timeComponents.days
    element.querySelector('.hours span').innerText = ('0' + timeComponents.hours).slice(-2)
    element.querySelector('.minutes span').innerText = ('0' + timeComponents.minutes).slice(-2)
    element.querySelector('.seconds span').innerText = ('0' + timeComponents.seconds).slice(-2)
    // Set click handler
    element.onclick = (e) => {
      this.visibleElemBar(true, e, 'countdown', key)
      return false
    }
  }

  setUpImageComponent (element, pageIndex) {
    const key = element.getAttribute('image')
    const input = document.createElement('input')
    input.className = 'image-upload-input'
    input.targetImageComponent = element
    input.currentPopupPage = pageIndex
    input.targetElementName = key
    input.setAttribute('type', 'file')
    input.addEventListener('change', ::this.uploadImage)
    element.parentNode.insertBefore(input, element.nextSibling)
    element.src = this.state.popup.data[pageIndex][key].url
  }

  setUpFbLikeComponent (element, pageIndex) {
    const key = element.getAttribute('fb-like')
    element.innerHTML =
      '<div class="fb-widget-placeholder"><i class="fa fa-facebook-official"></i><span>Like</span></div>'
    element.onclick = (e) => {
      this.visibleElemBar(true, e, 'fb-like', key)
      return false
    }
  }

  showPagePreview (index) {
    const placeholder = document.getElementById('popup-content')
    _.each(placeholder.querySelectorAll('[page]'), (page) => {
      page.style.display = 'none'
    })
    const page = placeholder.querySelector('[page="' + index + '"]')
    // Remove display style temporary
    page.style.display = ''
    // Get computed style to detect display specified in CSS
    const cssStyle = page.currentStyle || window.getComputedStyle(page, '')
    // Set display inline|inline-block|block depending on computed style if it is current page
    page.style.display = cssStyle.display
    // Set up text components only when when page is visible
    this.setUpComponents('text', page, index)
  }
}
