export const mailServices = [
  {label: 'ActiveCampaign', value: 'ActiveCampaignIntegration'},
  {label: 'Aweber', value: 'AweberIntegration'},
  {label: 'CampaignMonitor', value: 'CampaignMonitorIntegration'},
  {label: 'ConstantContact', value: 'ConstantContactIntegration'},
  {label: 'Customerio', value: 'CustomerioIntegration'},
  {label: 'EmailOctopus', value: 'EmailOctopusIntegration'},
  {label: 'GetResponse', value: 'GetResponseIntegration'},
  {label: 'Hubspot', value: 'HubspotIntegration'},
  {label: 'Icontact', value: 'IcontactIntegration'},
  {label: 'Infusionsoft', value: 'InfusionsoftIntegration'},
  {label: 'Klaviyo', value: 'KlaviyoIntegration'},
  {label: 'MadMimi', value: 'MadMimiIntegration'},
  {label: 'MailChimp', value: 'MailChimpIntegration'},
  {label: 'MailPoet', value: 'MailPoetIntegration'},
  {label: 'MailerLite', value: 'MailerLiteIntegration'}
]

export const integrationTypes = {
  ActiveCampaignIntegration: ['api_url', 'api_key', 'list_id'],
  AweberIntegration: ['list_id'],
  CampaignMonitorIntegration: ['api_key', 'list_id'],
  ConstantContactIntegration: ['list_id'],
  CustomerioIntegration: ['site_id', 'secret_key'],
  EmailOctopusIntegration: ['api_key', 'list_id'],
  GetResponseIntegration: ['api_key', 'token'],
  HubspotIntegration: ['api_key'],
  IcontactIntegration: ['username', 'app_identifier', 'app_pass', 'api_url', 'list_id'],
  InfusionsoftIntegration: ['infusion_id', 'api_key'],
  KlaviyoIntegration: ['api_key', 'list_id'],
  MadMimiIntegration: ['user_email', 'api_key', 'list_id'],
  MailChimpIntegration: ['api_key', 'list_id'],
  MailPoetIntegration: ['admin_url', 'list_id'],
  MailerLiteIntegration: ['api_key', 'list_id']
}
