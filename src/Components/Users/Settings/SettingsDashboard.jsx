import React from 'react'
import {connect} from 'react-redux'
import {Grid, GridColumn} from 'semantic-ui-react'
import SettingsNav from './SettingsNav';
import {Switch, Route, Redirect} from 'react-router-dom'
import BasicPage from './BasicPage'
import AboutPage from './AboutPage'
import PhotosPage from './PhotosPage'
import AccountPage from './AccountPage'
import {updatePassword} from '../../../Auth/AuthActions'
import {updateProfile} from '../UserDetails/UserActions'

const actions ={
  updatePassword,
  updateProfile
}

const mapState = (state) => ({
  providerId: state.firebase.auth.providerData[0].providerId,
  user: state.firebase.profile
})

function SettingsDashboard({updatePassword, providerId, user, updateProfile}) {
  return (
    <Grid>
      <GridColumn width={12}>
        <Switch>
          <Redirect exact from='/settings' to='settings/basic' />
          <Route path='/settings/basic' render={()=> <BasicPage updateProfile={updateProfile} initialValues={user} /> } />
          <Route path='/settings/about' render={()=> <AboutPage updateProfile={updateProfile} initialValues={user} /> } />
          <Route path='/settings/Photos' component={PhotosPage} />
          <Route path='/settings/accountpage' render={()=> <AccountPage updatePassword={updatePassword} providerId={providerId} />} />
        </Switch>
      </GridColumn>
      <GridColumn width={4}>
        <SettingsNav />
      </GridColumn>
    </Grid>
  )
}

export default connect(mapState, actions)(SettingsDashboard)
