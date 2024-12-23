import React from 'react'
import styles from './Templates.scss'
import ReactQuill from 'react-quill'
import classNames from 'classnames/bind'
import _ from 'lodash'

const cx = classNames.bind(styles)

export default class Test extends React.Component {
  static propTypes = {
    popup: React.PropTypes.object.isRequired,
    visibleElemBar: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    selectedPage: React.PropTypes.number.isRequired,
    popupElements: React.PropTypes.array.isRequired,
    templateStyles: React.PropTypes.string.isRequired
  }

  constructor (props) {
    super(...props)

    this.state = {
      visible: {
        title: false,
        description: false
      }
    }
  }

  handleToggleToolbar (selected, type) {
    const visibleBar = { ...this.state.visible }
    visibleBar[type] = selected !== null
    this.setState({ visible: visibleBar })
  }

  static Input_Name = (({popupData, visibleElemBar}) =>
    <div className='form-group'>
      <input type='text' className='form-control' onClick={visibleElemBar.bind(this, true)}
        placeholder={popupData.name_field.placeholder} />
    </div>
  )

  static Input_Email = (({popupData, visibleElemBar}) =>
    <div className='form-group'>
      <input type='text' className='form-control' onClick={visibleElemBar.bind(this, true)}
        placeholder={popupData.email_field.placeholder} />
    </div>
  )

  static Button_Next = (({popupData, visibleElemBar}) =>
    <button className='btn btn-success btn-block' onClick={visibleElemBar.bind(this, true)}>
      {popupData.next_btn.text}
    </button>
  )

  static Button_Submit = (({popupData, visibleElemBar}) =>
    <button className='btn btn-success btn-block' onClick={visibleElemBar.bind(this, true)}>
      {popupData.submit_btn.text}
    </button>
  )

  static Button_Finish = (({popupData, visibleElemBar}) =>
    <button className='btn btn-success btn-block' onClick={visibleElemBar.bind(this, true)}>
      {popupData.finish_btn.text}
    </button>
  )

  static Link_Close = (({popupData}) =>
    <div className='text-center'>
      <hr />
      <a href='#'>
        {popupData.close_link.text}
      </a>
    </div>
  )

  static Link_Back = (({popupData}) =>
    <div className='text-right'>
      <hr />
      <a href='#'>
        {popupData.back_link.text}
      </a>
    </div>
  )

  static Title = (({popupData, visibleElemBar, handleToggleToolbar, onChange, state}) =>
    <ReactQuill theme='snow'
      value={popupData.title.text}
      onChange={onChange}
      toolbar={state.visible.title ? ReactQuill.Toolbar.defaultItems : false}
      onChangeSelection={(selected) => { handleToggleToolbar(selected, 'title') }}
    />
  )

  static Description = (({popupData, visibleElemBar, handleToggleToolbar, onChange, state}) =>
    <ReactQuill theme='snow'
      value={popupData.description.text}
      onChange={onChange}
      toolbar={state.visible.description ? ReactQuill.Toolbar.defaultItems : false}
      onChangeSelection={(selected) => { handleToggleToolbar(selected, 'description') }}
    />
  )

  render () {
    const { popup, onChange, visibleElemBar, selectedPage, popupElements, templateStyles } = this.props
    const popupData = popup.data[selectedPage]
    const createPopup = popupElements.map((item, key) => {
      const elements = {
        title: <Test.Title popupData={popupData} visibleElemBar={visibleElemBar}
          handleToggleToolbar={::this.handleToggleToolbar} onChange={onChange} state={this.state} key={key} />,
        description: <Test.Description popupData={popupData} visibleElemBar={visibleElemBar}
          handleToggleToolbar={::this.handleToggleToolbar} onChange={onChange} state={this.state} key={key} />,
        name_field: <Test.Input_Name popupData={popupData} visibleElemBar={visibleElemBar} key={key} />,
        email_field: <Test.Input_Email popupData={popupData} visibleElemBar={visibleElemBar} key={key} />,
        next_btn: <Test.Button_Next popupData={popupData} visibleElemBar={visibleElemBar} key={key} />,
        submit_btn: <Test.Button_Submit popupData={popupData} visibleElemBar={visibleElemBar} key={key} />,
        finish_btn: <Test.Button_Finish popupData={popupData} visibleElemBar={visibleElemBar} key={key} />,
        close_link: <Test.Link_Close popupData={popupData} key={key} />,
        back_link: <Test.Link_Back popupData={popupData} key={key} />
      }
      return elements[_.keys(item).join()]
    })

    return (
      <div className={styles['template-wrapper']}>
        <div className={cx('template-wrapper-inner', `animated ${popup.settings.appear_animation}`)}>
          <style>{templateStyles}</style>
          <div>
            {popupElements.length > 0 && createPopup}
          </div>
        </div>
      </div>
    )
  }
}
