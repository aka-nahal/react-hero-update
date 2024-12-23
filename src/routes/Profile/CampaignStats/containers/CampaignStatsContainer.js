import Campaign from '../components/CampaignStats'
import { getCampaign, updateCampaign, removeCampaign } from 'store/modules/campaigns'
import { getCampaignStats } from 'store/modules/stats'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions,
  campaign: store.campaigns.resource.data,
  campaignStats: store.stats.campaign.data
})

const mapActionCreators = {
  getCampaign,
  updateCampaign,
  removeCampaign,
  getCampaignStats
}

export default connect(mapStateToProps, mapActionCreators)(Campaign)
