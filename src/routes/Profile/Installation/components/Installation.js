import React from 'react'
// components
import InstallationCode from 'components/InstallationCode/InstallationCode'
import {Tab, Nav, NavItem} from 'react-bootstrap'

export default class Installation extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render () {
    const {router} = this.context
    return (
      <div className='content-wrapper'>
        <div className='page-header page-header-default'>
          <div className='page-header-content'>
            <div className='page-title text-center'>
              <h3>
                Installation
              </h3>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-10 col-sm-offset-1'>
              <div className='panel panel-flat'>
                <div className='panel-body'>
                  <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
                    <div className='installation-content-wrapper'>
                      <div className='platform-nav-wrapper'>
                        <h3>Platform</h3>
                        <Nav bsStyle='pills' stacked className='tab-pills-nav'>
                          <NavItem eventKey='first'>
                            Custom
                          </NavItem>
                          <NavItem eventKey='second'>
                            Wordpress
                          </NavItem>
                          <NavItem eventKey='third'>
                            Magento
                          </NavItem>
                          <NavItem eventKey='fourth'>
                            Joomla
                          </NavItem>
                          <NavItem eventKey='fifth'>
                            Shopify
                          </NavItem>
                          <NavItem eventKey='sixth'>
                            Weebly
                          </NavItem>
                          <NavItem eventKey='seventh'>
                            Wix
                          </NavItem>
                          <NavItem eventKey='eighth'>
                            Tumblr
                          </NavItem>
                          <NavItem eventKey='ninth'>
                            Drupal
                          </NavItem>
                        </Nav>
                      </div>
                      <div className='platform-content'>
                        <Tab.Content animation>
                          <Tab.Pane eventKey='first'>
                            <div className='pl-15 pr-15'>
                              <p>
                                To install ConvertHero, put this code on every page of your website just before the
                                closing <code>{'</body>'}</code> tag. You only need to include the code shown below once.
                              </p>
                              <p>
                                If you don't feel comfortable changing the code on your site, simply copy and
                                paste the code below and send it in an email to your system administrator or web
                                developer and they will know what to do!
                              </p>
                              <InstallationCode />
                            </div>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='second'>
                            <p>The easiest way to install ConvertHero on a Wordpress website is to use our plugin. Follow these steps to get
                              set up.</p>
                            <p><strong>1. Download the Wordpress plugin here:</strong>&nbsp;<a
                              href='http://converthero.com/blog/ConvertHeroWP.zip'>ConvertHero WP Plugin</a></p>
                            <p><strong>2. In your Wordpress admin dashboard, navigate to the Plugins page</strong></p>
                            <p><strong>3. Choose 'Add New'</strong></p>
                            <p><img className='img-responsive'
                              src='https://s3.amazonaws.com/groovehq/uploaded/atatzqbbeu76qaz98gq09g6hz97z8jwhnfw9c3czmnphsdee2e?1466483675'
                              alt='' /></p>
                            <p><strong>4. Click 'Upload Plugin'</strong></p>
                            <p><strong>5. Choose the ConvertHeroWP.zip that you downloaded in Step 1.</strong></p>
                            <p><strong>6. Activate your plugin. That's all, you're ready to go and can begin creating optin forms from
                              within the ConvertHero dashboard.</strong></p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='third'>
                            <p>This is the installation code for use within this tutorial. You can copy it to your clipboard it now.</p>
                            <InstallationCode />
                            <p><span>Follow these steps to install ConvertHero on your Magento website.</span></p>
                            <p><strong>1. Go to the Admin section of your Magento website.</strong></p>
                            <p><strong>2. Click 'System' in the top navigation menu</strong></p>
                            <p><strong>3. Click 'Configuration'</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/8H5HWVi.png' alt='' /></p>
                            <p><strong>4. Click 'Design' under the General menu</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/rEXkJHh.png' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>5. Scroll down until you get to the 'Miscellaneous HTML' section under Footer.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/zhn5NLY.png' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>6. Paste the ConvertHero code in this section. You will find the code at the top of this
                              guide.</strong></p>
                            <p><strong>7. Save your changes</strong></p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='fourth'>
                            <p>This is the installation code for use within this tutorial. You can copy it to your clipboard it now.</p>
                            <InstallationCode />
                            <p>In this guide we will take you through the steps to install ConvertHero on your Joomla website.</p>
                            <p><strong>NOTE: Before you are able to add the ConvertHero code, we need to modify our Tiny MCE Plugin's
                              settings.</strong></p>
                            <p><strong>1. Navigate to the Plugins page as shown.</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/YVwzZ5b.jpg' alt='' /></p>
                            <p><strong>2. Find the Editor - TinyMCE plugin. Click the title.</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/p48Biij.jpg' alt='' /></p>
                            <p><strong>3. In the 'Prohibited Elements' field, we need to remove 'script', as shown:</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/2SrWmUk.jpg' alt='' /></p>
                            <p><strong><br /></strong></p>
                            <p><strong>4. Great work. Now hit Save &amp; Close and we will add the ConvertHero code.</strong></p>
                            <p><strong><br /></strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/TQhXexR.jpg' alt='' /></p>
                            <p><strong><br /></strong></p>
                            <p><strong>5. Navigate to the Modules page</strong></p>
                            <p><strong><br /></strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/qajxQe7.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong><br /></strong></p>
                            <p><strong>6. Click 'New' to add a new module. This will store our ConvertHero code.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/Df0MoNk.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>7. Choose 'Custom' from the list.</strong></p>
                            <p>&nbsp;</p>
                            <p>&nbsp;<img className='img-responsive' src='http://i.imgur.com/sVsPQni.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>8. Select Tools &gt; Source Code</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/gpPZfV4.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>9. In the field paste the ConvertHero code. You can copy the code from the top of this
                              guide.</strong></p>
                            <p><strong>10. Press 'OK'</strong></p>
                            <p><strong><br /></strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/YtjmxZT.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>11. In the right hand side options, change 'Show Title' to 'Hide'.</strong></p>
                            <p><strong>12. Under the 'Position' dropdown box, choose (any) of the options beginning with Footer.</strong>
                            </p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/1BLP1pF.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>13. Enter a Title and then click Save &amp; Close. You're done!</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/SVLVmbi.jpg' alt='' /></p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='fifth'>
                            <p>This is the installation code for use within this tutorial. You can copy it to your clipboard it now.</p>
                            <InstallationCode />
                            <p>Here are the steps to install ConvertHero on your Shopify webstore.</p>
                            <p><strong>1. Login to your Shopify Dashboard</strong></p>
                            <p><strong>2. In the left side navigation menu click Online Store.</strong></p>
                            <p><strong>3. Click Themes</strong></p>
                            <p><strong>4. Click 'Customize Theme'</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/rjVgnu6.png' alt='' /></p>
                            <p><strong>5. Click 'Theme Options' button at the top.&nbsp;</strong></p>
                            <p><strong>6. Choose 'Edit HTML/CSS'</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/XjgCEEM.png' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>7. Select the 'theme.liquid' file from the Layout folder.</strong></p>
                            <p><strong>8. Scroll to the bottom of the editor.</strong></p>
                            <p><strong>9. Copy your ConvertHero code snipped from the top of this guide.</strong></p>
                            <p><strong>8. Paste your code snippet right before the closing <code>/body</code> tag.</strong></p>
                            <p><strong>9. Save your changes by clicking the 'Save' button. You're done!</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/8zDXjlU.png' alt='' /></p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='sixth'>
                            <p>This is the installation code for use within this tutorial. You can copy it to your clipboard it now.</p>
                            <InstallationCode />
                            <p><span>In this guide we will show you how to install ConvertHero on your Weebly website.</span></p>
                            <p><strong>1. Log in to your Weebly account and click 'Edit Site'</strong></p>
                            <p><strong><br /></strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/aJlcgCx.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>2. Click the THEME tab at the top of your screen. You will see a THEMES sidebar show up on the
                              left.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/7SIozM9.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>3. Select the 'Edit HTML/CSS' button at the bottom.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/TyQYADo.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>4. Navigate to the page template(s) where you want to show ConvertHero.</strong></p>
                            <p><strong>5. Scroll down to the bottom of the code editor.</strong></p>
                            <p><strong>6. Copy your ConvertHero code from the top of this guide.</strong></p>
                            <p><strong>7. Paste it before the &lt;/body&gt; tag as shown:</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/qFX57iq.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>8. Lastly, select the SAVE button to save your changes.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/rAnUc16.jpg' alt='' /></p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='seventh'>
                            <p>This is the installation code for use within this tutorial. You can copy it to your clipboard it now.</p>
                            <InstallationCode />
                            <p>In this guide we will take you through the steps required to install ConvertHero on your Wix website.</p>
                            <p><strong>1. Log in to your Wix dashboard.</strong></p>
                            <p><strong>2. Click the Add ('+' symbol) on the left sidebar.&nbsp;</strong></p>
                            <p><strong>3. Click More in the popup menu.</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/hinxC6Y.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>4. Choose HTML Code</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/udRQnKN.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>5. A new box will appear. Click the Enter Code button.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/W0ZnnLI.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>6. Select 'Code' and paste your ConvertHero code from the top of this guide.</strong></p>
                            <p><strong>7. After pasting the code make sure to click Update to save your changes.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/tpUC6Gs.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>7. Click Publish at the top right. You're done!</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/Xokza3y.jpg' alt='' /></p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='eighth'>
                            <p>This is the installation code for use within this tutorial. You can copy it to your clipboard it now.</p>
                            <InstallationCode />
                            <p>In this guide we will show you how to install ConvertHero on your Tumblr website.</p>
                            <p><strong>1. Login to your Tumblr dashboard and go to 'Edit Appearance'</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/4h5PNyd.jpg' alt='' /></p>
                            <p><strong><br /></strong></p>
                            <p><strong>2. Click 'Edit theme'</strong></p>
                            <p><strong><br /></strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/lefyRR7.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>3. Click 'Edit HTML'</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/dUKaEvU.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>4. Scroll right to the bottom of the editor on the left.&nbsp;</strong></p>
                            <p><strong>5. Copy your ConvertHero code from the top of this guide.</strong></p>
                            <p><strong>6. Paste the code right before the &lt;/body&gt; tag.</strong></p>
                            <p><img className='img-responsive' src='http://i.imgur.com/2z3AMCj.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>7. Click 'Update Preview' and then 'Save'. You're done!</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/tuMIPGG.jpg' alt='' /></p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey='ninth'>
                            <p>This is the installation code for use within this tutorial. You can copy it to your clipboard it now.</p>
                            <InstallationCode />
                            <p><span>In this guide we will take you through the steps to install ConvertHero on your Drupal website.</span>
                            </p>
                            <p>&nbsp;</p>
                            <p><strong>1. Log in to your Drupal admin panel.</strong></p>
                            <p><strong>2. Select 'Structure' from the top menu.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/0ZHk5qZ.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>3. Select 'Blocks' under the Structure list.</strong></p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/Nogsk8H.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>4. Click 'Add Block'</strong></p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p><img className='img-responsive' src='http://i.imgur.com/Zel9t5O.jpg' alt='' /></p>
                            <p>&nbsp;</p>
                            <p><strong>5. On the next page you need to complete the following steps:</strong></p>
                            <p>- Enter a <strong>Block Description</strong> to identify from the Admin panel.</p>
                            <p>- Copy the ConvertHero code from the top of this guide.</p>
                            <p>- Paste the ConvertHero code into the <strong>body</strong>&nbsp;field</p>
                            <p>- Select <strong>Full HTML </strong>from the text format dropdown list</p>
                            <p>- Under the Region Settings options, you will want to add your block to the <strong>Footer.</strong></p>
                            <p><strong>- </strong>Finally, select the <strong>Save Block</strong>&nbsp;button. You're done!</p>
                            <div className='text-center mt-20 mb-5'>
                              <button onClick={() => router.push('/home')} type='button' className='btn bg-green btn-xlg'>
                                I'm done. Take me to the dashboard.
                              </button>
                            </div>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
