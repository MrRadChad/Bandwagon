import React from 'react'
import {Grid, GridColumn} from 'semantic-ui-react'
import SettingsNav from './SettingsNav';
import {Switch, Route, Redirect} from 'react-router-dom'
import BasicPage from './BasicPage'
import AboutPage from './AboutPage'
import PhotosPage from './PhotosPage'
import AccountPage from './AccountPage'

export default function SettingsDashboard() {
  return (
    <Grid>
      <GridColumn width={12}>
        <Switch>
          <Redirect exact from='/settings' to='settings/basic' />
          <Route path='/settings/basic' componenent={BasicPage} />
          <Route path='/settings/about' componenent={AboutPage} />
          <Route path='/settings/Photos' componenent={PhotosPage} />
          <Route path='/settings/accountpage' componenent={AccountPage} />
        </Switch>
      </GridColumn>
      <GridColumn width={4}>
        <SettingsNav />
      </GridColumn>
    </Grid>
  )
}
