/*****
 License
 --------------
 Copyright © 2017 Bill & Melinda Gates Foundation
 The Mojaloop files are made available by the Bill & Melinda Gates Foundation under the Apache License, Version 2.0 (the "License") and you may not use these files except in compliance with the License. You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, the Mojaloop files are distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 Contributors
 --------------
 This is the official list of the Mojaloop project contributors for this file.
 Names of the original copyright holders (individuals or organizations)
 should be listed with a '*' in the first column. People who have
 contributed from an organization can be listed under the organization
 that actually holds the copyright for their contributions (see the
 Gates Foundation organization for an example). Those individuals should have
 their names indented and be marked with a '-'. Email address can be added
 optionally within square brackets <email>.
 * Gates Foundation

 * ModusBox
 * Vijaya Kumar Guthi <vijaya.guthi@modusbox.com> (Original Author)
 --------------
 ******/
import axios from 'axios';

var cache_userConfig = {}

export const getConfig = () => {
  const { protocol, hostname } = window.location
  // Using the same protocol as we've been loaded from to avoid Mixed Content error.
  let apiBaseUrl = 'TTK_API_BASE_URL'
  if (!apiBaseUrl.startsWith('http')) {
    apiBaseUrl = `${protocol}//${hostname}:5050`
  }
  const AUTH_ENABLED = 'TTK_AUTH_ENABLED'
  // const AUTH_ENABLED = 'TRUE'
  const isAuthEnabled = AUTH_ENABLED ? AUTH_ENABLED.toUpperCase() === 'TRUE' : false

  // Payee Sim Branding
  const payeeAppSimulatorBrandConfig = {
    icon: 'data:image/jpeg;base64,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'
  }
  const PAYEE_SIM_BRAND_ICON = 'TTK_PAYEE_SIM_BRAND_ICON'
  if (!PAYEE_SIM_BRAND_ICON.startsWith('TTK')) {
    payeeAppSimulatorBrandConfig.icon = PAYEE_SIM_BRAND_ICON
  }

  return { apiBaseUrl, isAuthEnabled, payeeAppSimulatorBrandConfig }
}

export const getServerConfig = async () => {
  const { apiBaseUrl } = getConfig()
  const response = await axios.get(apiBaseUrl + "/api/config/user")
  const userConfigRuntime = response.data.runtime
  const userConfigStored = response.data.stored

  return { userConfigRuntime, userConfigStored }
}

export const fetchServerConfig = async () => {
  const { apiBaseUrl } = getConfig()
  const response = await axios.get(apiBaseUrl + "/api/config/user")
  cache_userConfig = response.data.runtime
}

export const getUserConfig = () => {
  return cache_userConfig
}
