import Home from '../components/Home'
import { getCampaigns, updateCampaign, removeCampaign } from 'store/modules/campaigns'
import { getChartStats, getSummaryStats } from 'store/modules/stats'
import { connect } from 'react-redux'

const mapStateToProps = (store) => ({
  location: store.router.locationBeforeTransitions,
  campaigns: store.campaigns.resources.data,
  summaryStats: store.stats.summary.data,
  chartStats: store.stats.chart.data
})

const mapActionCreators = {
  getCampaigns,
  updateCampaign,
  removeCampaign,
  getChartStats,
  getSummaryStats
}

export default connect(mapStateToProps, mapActionCreators)(Home)
